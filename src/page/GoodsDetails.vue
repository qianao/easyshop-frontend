<!--商品详情-->
<template>
<div>
  <mall-header v-on:initscroll="scrollTop"></mall-header>
  <mall-bread>
  <span>商品列表</span>
  </mall-bread>
  <div class="w store-content" >
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul v-for = "Img in productImg">
              <li :class="{on:big===Img.sort}" @click="big=Img.sort">
                <img v-lazy="`../../static/${Img.url}`" :alt="goodsList.productName">
              </li>
<!--              <li :class="{on:big===2}" @click="big=2">-->
<!--                <img v-lazy="`static/${item.productImg}`" :alt="item.productName">-->
<!--              </li>-->
<!--              <li :class="{on:big===3}" @click="big=3">-->
<!--                <img v-lazy="`static/${item.productImg}`" :alt="item.productName">-->
<!--              </li>-->
<!--              <li :class="{on:big===4}" @click="big=4">-->
<!--                <img v-lazy="`static/${item.productImg}`" :alt="item.productName">-->
<!--              </li>-->
<!--              <li :class="{on:big===5}" @click="big=5">-->
<!--                <img v-lazy="`static/${item.productImg}`" :alt="item.productName">-->
<!--              </li>-->
              <!-- <li>
                <img src="../assets/img/1.png" alt="">
              </li> -->
            </ul>
          </div>
          <div class="thumb"v-for="(item1,index) in productImg" :key="index">
            <div class="big" v-if="index===big-1">
              <img v-lazy="`../../static/${item1.url}`" :alt="goodsList.productName">
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{goodsList.productName}}</h4>
          <h6>
            <span>商品描述：{{goodsList.content}}</span>

          </h6>
        </div>
        <div >
          <el-radio-group v-model="radio" size ="large" v-for="(item2,index2) in productParams" :key="index2" >
            <div>
              <el-radio :label=item2.paramId>{{ item2.weight }}</el-radio>
              <el-divider direction="vertical"></el-divider>
              <el-divider direction="vertical"></el-divider>
            </div>
            <div>
              <span class="price">
              <em>¥</em><i>{{item2.productPrice}}</i></span>
            </div>
          </el-radio-group>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="50" label="描述文字"></el-input-number>
        </div>
        <div class="buy">
          <y-button text="加入购物车"
                    @btnClick="addCart()"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px"></y-button>
          <!--<y-button text="现在购买"-->
                    <!--@btnClick="checkout(product.productId)"-->
                    <!--style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>-->
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <y-shelf title="商品评价">
        <div slot="content">
            <el-table
              :data="comment"
              style="width: 100%">
              <el-table-column
                prop="productComments.sepcName"
                label="评论时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="users.username"
                label="姓名"
                width="150">
              </el-table-column>
              <el-table-column
                prop='productComments'
                label="评论图片"
                width="150">
                <template slot-scope="scope">
                  <img v-lazy="`../../static/${scope.row.productComments.commImgs}`" style="height: 60px;"/>
                </template>
<!--                <img v-lazy="`static/${productComments.commImgs}`" :alt="goodsList.productName">-->
              </el-table-column>
              <el-table-column
                prop="productComments.commContent"
                label="评论"
                width="300">
              </el-table-column>

              <el-table-column
                prop="productComments.commLevel"
                label="评价等级"
                width="150":formatter="stateFormat">
              </el-table-column>
            </el-table>
        </div>
      </y-shelf>
    </div>
  </div>
  <modal :mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">{{showText}}</p>
          <div slot="btnGroup">
            <a href="javascript:;" class="btn btn--m" @click="mdShow=false" v-if="!ifCart">关闭</a>
            <a href="javascript:;" class="btn btn--m" @click="mdShow=false" v-if="ifCart">继续购物</a>
            <router-link to="/cart" class="btn btn--m" @click="mdShow=false" v-if="ifCart">去购物车</router-link>
          </div>
        </modal>
  <mall-footer></mall-footer>
</div>
</template>
<script>
  import { productDet, addCart } from '../api/goods.js'
  import { mapMutations, mapState } from 'vuex'
  import YShelf from '../components/shelf'
  import BuyNum from '../components/buynum'
  import YButton from '../components/YButton'
  import mallHeader from '../components/header.vue'
  import mallFooter from '../components/footer.vue'
  import mallBread from '../components/navbread.vue'
  import modal from '../components/modal.vue'
  // import { getStore } from '/utils/storage'
  import axios from 'axios'
  import $ from 'jquery'

  export default {
    data () {
      return {

        comment:[],
        num : 1,
        radio : '' ,
        productMsg: {},
        small: [],
        goodsList:{},
        productImg:[],
        productParams:[],
        big: 1,
        product: {},
        productNum: 1,
        userId: '',
        mdShow:false,
        showText:'',
        ifCart:false,
        productId:''
      }
    },
    computed: {
      // ...mapState(['login', 'showMoveImg', 'showCart'])
    },

    created: function () {
      this.productId = this.$route.query.productId
    },
    mounted() {
      this.userId = sessionStorage.getItem("user_id");
      console.log(this.userId)
      this.getdata();
      this.getImg();
      this.getParams();
      this.getComment();
    },
    methods: {
      stateFormat(row, column) {
        if (row.productComments.commLevel === 1) {
          return '好评'
        } else if(row.productComments.commLevel === 2)  {
          return '中评'
        } else if(row.productComments.commLevel === 3) {
          return '差评'
        }
      },
      handleChange(value) {
        this.num = value;
      },
      getdata(){
        var param = ({
          id : this.productId
        });
        axios.get('/product/getDetails', {
          params:param
        }).then((res) => {
          res = res.data;
          console.log(res)
          if(res.code === 0) {
            this.goodsList = res.data;
          }
        });
      },
      getImg(){
        var param = ({
          id : this.productId
        });
        axios.get('/productImg/getImg', {
          params:param
        }).then((res) => {
          res = res.data;
          console.log(res)
          if(res.code === 0) {
            this.productImg = res.data;
          }
        });
      },
      getParams(){
        var param = ({
          id : this.productId
        });
        axios.get('/productParams/getParams', {
          params:param
        }).then((res) => {
          res = res.data;
          console.log(res)
          if(res.code === 0) {
            this.productParams = res.data;
            this.radio = res.data[0].paramId;
          }
        });
      },
      getComment(){
        var param = ({
          productId : this.productId
        });
        axios.get('/productComments/getComment', {
          params:param
        }).then((res) => {
          res = res.data;
          console.log(res)
          if(res.code === 0) {
            this.comment = res.data;
            for(let i = 0; i　< this.comment.length; i++) {
              if(this.comment[i].productComments.isAnonymous == 1){
                this.comment[i].users.username = '匿名'
              }
            }
          }
        });
      },
      editNum (num) {
        this.productNum = num
        //console.log(this.productNum);
      },
      addCart() {
          var param = {
            productId:this.goodsList.productId,
            cartNum:this.num,
            userId:this.userId,
            paramId:this.radio
          };
          if(this.userId == null){
            this.$notify.error({
              title: '错误',
              message: '请先登陆用户'
            });
          }else{
            axios.get('/shoppingCart/addCart', {
              params:param
            }).then((res) => {
              res = res.data;
              console.log(res);
              if(res.status === true){
                this.$router.push({
                  path:`/cart`,
                });
              }else if(res.status === '10001'){
                //alert(`${res.msg}`);
                this.showText = res.msg;
                this.mdShow = true;
              }else{
                console.log('faile!');
              }
            }).catch((error) => {
              console.log('error');
            });
          }
        },
        closeModal() {
          this.mdShow = false;
        },
      checkout (productId) {
        axios.get('/users/checkLogin').then((res) => {
            res = res.data;
            if(res.status === '1') {
             this.$router.push({
                    path: '/checkout', query: {productId, num: this.productNum}
                  });
            } else if(res.status === '10001'){
                    //alert(`${res.msg}`);
                    this.showText = res.msg;
                    this.mdShow = true;
           }
          });
      },
      scrollTop() {
          var promise = new Promise(()=>{
            this.$router.push({
                path:`/`
            });
          }).then($('html,body').animate({scrollTop:480},500));
      }
    },
    components: {
      YShelf,
      BuyNum,
      YButton,
      mallHeader,
      mallFooter,
      mallBread,
      modal
    },
    //created () {
      //let id = this.$route.query.productId
      //this._productDet(id)
      //this.userId = getStore('userId')
    //}
  }
</script>
<style lang="scss" scoped>
  @import '../assets/style/mixin.scss';
  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }

  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;
    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
          }
          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }
    // 右边
    .banner {
      width: 580px;
      margin-left: 10px;
      h4 {
        font-size: 16px;
        font-weight:700;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .num {
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }

  .item-info {

    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      width: 1220px;
      // padding: 1vw;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: left;
    i {
      padding-left: 2px;
      font-size: 15px;
    }
  }
</style>
