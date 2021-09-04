<template>
  <div>
    <div class="index-wrapper">
      <mall-header v-on:initscroll="scrollTop"></mall-header>
      <mall-bread>
        <span>商品列表</span>
      </mall-bread>
      <div class="guide-content">
        <!-- <div class="left-content"></div> -->
        <div class="right-content">
          <slide-show :slides="slides" :inv="invTime"></slide-show>
        </div>
      </div>
      <div class="accessory-result-page accessory-page">
        <div class="container" ref="accHock">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" class="default" :class="{'cur':isDefault}" @click="sortDefault">默认</a>
<!--            <a href="javascript:void(0)" class="price" @click="sortGoods" :class="{'cur':!isDefault}">价格 <i :class="sortFlag===true?'icon-arrow-up2':'icon-arrow-down2'"></i></a>-->
            <a href="javascript:void(0)" class="filterby stopPop" @click="filterByPop">过滤价格</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>价格:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':clickflag==='all'}" @click.stop="setClickAll">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" :class="{'cur':clickflag===index?true:false}" @click="setClickFlag(index)">{{price.startPrice}}-{{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4" v-if="checkGoodsLen">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="`../../static/${item.productImg.url}`" alt="" @click="goDetail(item)"></a> <!--v-lazy图片懒加载-->
                    </div>
                    <div class="main">
                      <div class="name">{{item.product.productName}}</div>
                      <div class="details"><a href="javascript:;" :title="`${item.productDetails}`" @click="goDetail(item)">{{item.productDetails}}</a></div>
                      <div class="price">{{item.productParams.productPrice | formatMoney('元')}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="goDetail(item)">查看详情</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <div class="loading" style="text-align: center" v-show="!busy">
                    <img src="../../static/loading-svg/loading-spinning-bubbles.svg" alt="">
                  </div>
                  <!--  <p style="text-align: center" v-show="!busy">loading...</p>	 -->
                </div>
              </div>
              <div v-if="!checkGoodsLen" style="width:100%; height:100%; background:url(../../static/404.png) no-repeat center;">
                <!-- <img src="../../static/404.jpg" alt=""> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
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
    <header ref="header" hidden></header>
  </div>
</template>
<script>
import "../assets/css/base.css"
import "../assets/css/login.css"
import "../assets/css/product.css"
import "../assets/css/checkout.css"
import "../assets/css/icomoon/style.css"
import "../assets/css/goods.css"
import mallHeader from '../components/header.vue'
import mallFooter from '../components/footer.vue'
import mallBread from '../components/navbread.vue'
import modal from '../components/modal.vue'
import slideShow from '../components/slideShow.vue'
// import BScroll from 'better-scroll'
import axios from 'axios'
import { mapState } from 'vuex'
import $ from 'jquery'
import Header from "../components/header.vue";
import PubSub from "pubsub-js"
export default{
  data() {
    return {
      goodsList:[],
      priceFilter:[
        {
          startPrice: 0,
          endPrice: 500
        },
        {
          startPrice: 500,
          endPrice: 1000
        },
        {
          startPrice: 1000,
          endPrice: 2000
        },
        {
          startPrice: 2000,
          endPrice: 5000
        },
        {
          startPrice: 5000,
          endPrice: 10000
        }
      ],
      clickflag: 'all',
      filterBy: false,
      overLayFlag: false,
      sortFlag: false,
      page:1,
      pageSize:8,
      busy: true,
      priceLevel:'all',
      productId:'',
      productNum:1,
      isDefault:true,
      mdShow:false,
      showText:'',
      ifCart:false,
      invTime: 2000,
      slides: [
        {
          src: require('../../static/slide-img/14766931740570.jpg'),
          title: '',
          href: 'detail/analysis'
        },
        {
          src: require('../../static/slide-img/15144381201181.jpg'),
          title: '',
          href: 'detail/count'
        },
        {
          src: require('../../static/slide-img/15144443267556.jpg'),
          title: '',
          href: 'http://xxx.xxx.com'
        },
        {
          src: require('../../static/slide-img/15144482787248.jpg'),
          title: '',
          href: 'detail/forecast'
        }
      ],

    }
  },
  created() {
    this.getGoodList();
  },
  mounted() {
    this.getGoodList();
  },
  filters:{
    formatMoney: function(value,type) {
      return "¥" + value.toFixed(2) + type;
    }
  },
  computed:{
    ...mapState(['goodsList','checkGoodsLen'])
    //goodsList() {
    //   return this.$store.state.myName;
    // },
  },
  methods: {
    getGoodList() {
      PubSub.subscribe("goodList",(msg,data)=>{
        console.log(msg,data)
        this.goodsList = data
      })
      axios.get('/product/list', {
        // params:param // 将参数传递给后端
      }).then((response) => {
        if(this.goodsList.length == 0){
          this.goodsList=response.data.data
        }
        var temList=[]
        if(this.clickflag == 0){
          for(var i=0;i<this.goodsList.length;i++){
            if(this.goodsList[i].productParams.productPrice>=0 && this.goodsList[i].productParams.productPrice<500){
              temList.push(this.goodsList[i])
            }
          }
          this.goodsList=temList
        }
        else if(this.clickflag==1){
          for(var i=0;i<this.goodsList.length;i++){
            if(this.goodsList[i].productParams.productPrice>=500 && this.goodsList[i].productParams.productPrice<1000){
              temList.push(this.goodsList[i])
            }
          }
          this.goodsList=temList
        }
        else if(this.clickflag==2){
          for(var i=0;i<this.goodsList.length;i++){
            if(this.goodsList[i].productParams.productPrice>=1000 && this.goodsList[i].productParams.productPrice<2000){
              temList.push(this.goodsList[i])
            }
          }
          this.goodsList=temList
        }
        else if(this.clickflag==3){
          for(var i=0;i<this.goodsList.length;i++){
            if(this.goodsList[i].productParams.productPrice>=2000 && this.goodsList[i].productParams.productPrice<5000){
              temList.push(this.goodsList[i])
            }
          }
          this.goodsList=temList
        }
        else if(this.clickflag==4){
          for(var i=0;i<this.goodsList.length;i++){
            if(this.goodsList[i].productParams.productPrice>=5000){
              temList.push(this.goodsList[i])
            }
          }
          this.goodsList=temList
        }
      }).catch((error) => {
        console.log('error');
      });
    },
    goDetail(item) {
      this.$router.push({
        path:`/goodsdetails`,
        query: {
          productId:item.product.productId
        }
      });
    },
    addCart(value) {
      this.productId = value.productId;
      var param = {
        productId:this.productId,
        productNum:'1'
      };
      axios.get('/addCart', {
        params:param //将productId传给后台
      }).then((res) => {
        res = res.data;
        // console.log(res.status);
        if(res.status === '1'){
          // console.log('success!');
          //alert(`${res.msg}`);
          //value.push(this.productNum);
          var setData = ({
            productId: value.productId,
            productPrice: value.productPrice,
            checked:1,
            productName: value.productName,
            productImg: value.productImg,
            productNum: this.productNum
          });
          // value.forEach((item) => {
          // 	if(item.productId === productId)
          // });
          this.$store.commit('updateCartList', setData);
          this.$store.commit('updateCartCount', 1);
          this.$store.commit('updateHaveProduct', true);
          this.showText = res.msg;
          this.mdShow = true;
          this.ifCart = true;
          //this.isFull = true;
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
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.isDefault = false;
      this.page = 1;
      this.getGoodList();
    },
    sortDefault() {
      this.sortFlag = true;
      this.isDefault = true;
      this.page = 1;
      this.getGoodList();
    },
    setClickAll() {
      this.clickflag = 'all';
      this.page = 1;
      this.getGoodList();
      this.closePop();
    },
    setClickFlag(index) {
      this.clickflag = index;
      this.page = 1;
      this.getGoodList();
      this.closePop();
    },
    filterByPop() {
      let clientWidth = document.body.clientWidth;
      if(clientWidth<=767){
        this.overLayFlag = true;
        this.filterBy = true;
      }
    },
    closePop() {
      this.overLayFlag = false;
      this.filterBy = false;
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodList(true);
      }, 1000);
    },
    closeModal() {
      this.mdShow = false;
    },
    scrollTop() {
      //document.body.scrollTop = 480;
      //console.log(this.$route.query);
      $('html,body').animate({scrollTop:480},500);
    }
  },
  components: {
    Header,
    mallHeader,
    mallFooter,
    mallBread,
    modal,
    slideShow
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.guide-content
  width:100%
  display:flex
  background:url('../../static/slide-img/15115169565977.jpg') no-repeat center top;
  padding-bottom:30px
  .right-content
    flex:1
    margin-top:60px
.accessory-list-wrap
  .main
    .name
      height:3em!important
    .details
      height:18px
      overflow:hidden
      // white-space:nowrap
      text-overflow:ellipsis




</style>
