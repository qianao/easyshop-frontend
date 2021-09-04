<template>
  <div>
    <mall-header></mall-header>
    <mall-bread>
      <span style="color: #D1434A;">订单详情</span>
    </mall-bread>
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-add" viewBox="0 0 32 32">
          <title>add2</title>
          <path class="path1" d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
        </symbol>
        <symbol id="icon-ok" viewBox="0 0 39 32">
          <title>ok</title>
          <path class="path1" d="M14.084 20.656l-7.845-9.282c-1.288-1.482-3.534-1.639-5.016-0.351s-1.639 3.534-0.351 5.016l10.697 12.306c1.451 1.669 4.057 1.623 5.448-0.096l18.168-22.456c1.235-1.527 0.999-3.765-0.528-5.001s-3.765-0.999-5.001 0.528l-15.573 19.337z"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path class="path1" d="M25.599 11.292l-4.892-4.892 3.825-3.825 4.892 4.892-3.825 3.825zM4.732 23.308l3.959 3.959-5.939 1.98 1.98-5.939zM10.666 26.225l-4.892-4.892 13.425-13.425 4.892 4.892-13.425 13.425zM31.687 6.713l-6.4-6.4c-0.417-0.417-1.091-0.417-1.508 0l-20.267 20.267c-0.114 0.115-0.191 0.25-0.242 0.393-0.003 0.009-0.012 0.015-0.015 0.025l-3.2 9.6c-0.128 0.383-0.029 0.806 0.257 1.091 0.203 0.204 0.476 0.313 0.754 0.313 0.112 0 0.227-0.017 0.337-0.054l9.6-3.2c0.011-0.003 0.017-0.013 0.027-0.016 0.142-0.052 0.276-0.128 0.39-0.242l20.267-20.267c0.417-0.416 0.417-1.091 0-1.508v0z"></path>
        </symbol>
        <symbol id="icon-delete" viewBox="0 0 26 32">
          <title>delete</title>
          <path class="path1" d="M17.723 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM7.877 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM12.8 28c0.543 0 0.985-0.448 0.985-1v-12c0-0.552-0.441-1-0.985-1s-0.984 0.448-0.984 1v12c0 0.552 0.441 1 0.984 1v0zM23.631 4h-5.908v-2c0-1.104-0.882-2-1.969-2h-5.908c-1.087 0-1.969 0.896-1.969 2v2h-5.908c-1.087 0-1.969 0.896-1.969 2v2c0 1.104 0.882 2 1.969 2v18c0 2.208 1.765 4 3.939 4h13.784c2.174 0 3.938-1.792 3.938-4v-18c1.087 0 1.969-0.896 1.969-2v-2c0-1.104-0.882-2-1.969-2v0zM9.846 3c0-0.552 0.441-1 0.984-1h3.938c0.544 0 0.985 0.448 0.985 1v1h-5.908v-1zM21.662 28c0 1.104-0.882 2-1.969 2h-13.784c-1.087 0-1.97-0.896-1.97-2v-18h17.723v18zM22.646 8h-19.692c-0.543 0-0.985-0.448-0.985-1s0.441-1 0.985-1h19.692c0.543 0 0.984 0.448 0.984 1s-0.441 1-0.984 1v0z"></path>
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 32 32">
          <title>clock</title>
          <path class="path1" d="M29.333 16c0-7.364-5.97-13.333-13.333-13.333s-13.333 5.97-13.333 13.333c0 7.364 5.97 13.333 13.333 13.333s13.333-5.97 13.333-13.333v0 0 0 0 0 0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16zM14.667 14.667v1.333h2.667v-10.667h-2.667v9.333zM24 18.667h1.333v-2.667h-10.667v2.667h9.333z"></path>
        </symbol>
      </defs>
    </svg>
    <div class="container">
      <div style="margin-bottom: 20px; margin-top: 30px; align: center">
        <el-card class="box-card" style="display: inline-block" shadow="always">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px;">订单信息</span>
          </div>
          <div id="订单号">
            <div class="text item">订单号</div>
            <span class="text-later">{{order.orderId}}</span>
          </div>
          <div id="物流单号">
            <div class="text item">物流单号</div>
            <span class="text-later">{{order.deliveryFlowId}}</span>
          </div>
          <div id="配送方式">
            <div class="text item">配送方式</div>
            <span class="text-later">{{order.deliveryType}}</span>
          </div>
          <div id="支付方式">
            <div class="text item">支付方式</div>
            <span class="text-later">
              <span v-if="order.payType==1">微信</span>
              <span v-if="order.payType==2">支付宝</span>
            </span>
          </div>
          <div id="备注">
            <div class="text item">备注</div>
            <span class="text-later">{{order.orderRemark}}</span>
          </div>
          <div id="付款时间">
            <div class="text item">付款时间</div>
            <span class="text-later">{{order.payTime}}</span>
          </div>
        </el-card>
        <el-card class="box-card" style="display: inline-block; margin-left: 10%" shadow="always">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px;">收货人地址信息</span>
          </div>
          <div id="收货人姓名">
            <div class="text item">收货人姓名</div>
            <div class="text-later">{{adress.receiverName}}</div>
          </div>
          <div id="手机号">
            <div class="text item">手机号</div>
            <div class="text-later">{{adress.receiverMobile}}</div>
          </div>
          <div id="城市">
            <div class="text item">城市</div>
            <div class="text-later">{{adress.province}}省{{adress.city}}市</div>
          </div>
          <div id="区县">
            <div class="text item">区县</div>
            <div class="text-later">{{adress.area}}</div>
          </div>
          <div id="详细地址">
            <div class="text item">详细地址</div>
            <div class="text-later">{{adress.addr}}</div>
          </div>
          <div id="邮政编码">
            <div class="text item">邮政编码</div>
            <div class="text-later">{{adress.postCode}}</div>
          </div>
        </el-card>
      </div>

      <div class="checkout-order">

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>订单内容</span></h2>
        </div>

        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>Order contents</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in orderItemCommentsList">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img :src="`../../static/${item.orderItem.productImg}`" alt="XX">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.orderItem.productName}}</div>

                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.orderItem.productPrice | formatMoney('')}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">x{{item.orderItem.buyCounts}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.orderItem.productPrice*item.orderItem.buyCounts | formatMoney('')}}</div>
                  <div v-if="commentButtonShow">
                    <el-button type="success" plain disabled style="margin-top: 15px; margin-bottom: 15px" v-if="item.orderItem.isComment==1">已评论</el-button>
                    <el-button type="info" plain style="margin-top: 15px; margin-bottom: 15px"
                               v-if="item.orderItem.isComment==0"
                               @click="openFormDialog(item.orderItem.itemId)">添加评论</el-button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li>
                <span>商品价格:</span>
                <span>{{itemPrice | formatMoney('')}}</span>
              </li>
              <li>
                <span>配送费用:</span>
                <span>{{this.shipPrice | formatMoney('')}}</span>
              </li>
              <li>
                <span>商城开业优惠:</span>
                <span>{{this.discount | formatMoney('')}}</span>
              </li>
              <li>
                <span>运费险:</span>
                <span>{{this.freightRisk | formatMoney('')}}</span>
              </li>
              <li class="order-total-price">
                <span>合计:</span>
                <span>{{totalPrice | formatMoney('')}}</span>
              </li>
            </ul>
          </div>
        </div>

          <el-table
            :data="orderItemCommentsList"
            stripe
            style="width: 70%;margin: 0 auto;"
            v-if="commentShow">
            <el-table-column
              prop="productComments.sepcName"
              label="评论时间"
              width="250">
            </el-table-column>
            <el-table-column
              prop="productComments.productName"
              label="商品名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="productComments.commImgs"
              label="商品图片"
              width="200">
              <template slot-scope="scope">
                <img v-lazy="`../../static/${scope.row.productComments.commImgs}`" style="height: 60px;"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="productComments.commContent"
              label="评论"
              width="440">
            </el-table-column>
            <el-table-column
              prop="productComments.commLevel"
              label="评价等级"
              width="200":formatter="stateFormat">
            </el-table-column>
          </el-table>


        </div>



        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
            <router-link class="btn btn--m" :to="{path:'orderlist'}">返回订单列表</router-link>
          </div>
          <div class="next-btn-wrap" v-if="payButtonShow">
            <button class="btn btn--m btn--red" @click="goAlipay">付款</button>
          </div>
        </div>


      <el-dialog title="添加评论" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="是否匿名" :label-width="formLabelWidth">
            <el-switch v-model="form.isAnonymous"></el-switch>
          </el-form-item>
          <el-form-item label="评价等级" :label-width="formLabelWidth">
            <el-radio-group v-model="form.commLevel">
              <el-radio label="1">好评</el-radio>
              <el-radio label="2">中评</el-radio>
              <el-radio label="3">差评</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="评价内容" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.commContent" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmFormDialog">确 定</el-button>
        </div>
      </el-dialog>

      </div>


    <mall-footer></mall-footer>
  </div>
</template>

<script>
  import YShelf from '../components/shelf'
  import mallHeader from '../components/header.vue'
  import mallFooter from '../components/footer.vue'
  import mallBread from '../components/navbread.vue'
  import paySuc from '../components/paySuc.vue'
  import {_aliPay, _insertOrders} from '../api/orders'
  import axios from 'axios'
  export default{
    data(){
      return{
        orderItemCommentsList:[],
        commentList:[],
        order:{},
        adress:{},
        shipPrice:10,
        discount:10.2,
        freightRisk:5,
        orderId:0,
        userId:0,
        commentShow:false,  // 显示评价列表
        commentButtonShow:false, // 显示评价按钮
        noCommentsNum: 1,
        orderStatus:0,
        dialogFormVisible: false,
        payButtonShow:false,
        finalPrice:0,
        finalPrice1:0,
        form: {
          userId:0,
          item_id:0,
          commContent: '',
          isAnonymous: false,
          commLevel: 0
        },
        formLabelWidth: '120px',

      }
    },
    created() {
      this.orderId=this.$route.query.orderId
      this.userId=this.$route.query.userId
      this.getOrderData()
      this.getOrderItems()
    },
    methods:{
      getOrderItems() {
        axios.get('/orderItem/listItemsAndCommentsByOrderId',{params:{
            orderId: this.orderId}}).then((res) => {
          if(res.status){
            this.orderItemCommentsList = res.data.data
            this.noCommentsNum = res.data.otherData.noCommentsNum
            console.info(this.noCommentsNum)
            if(this.orderStatus=='4'&&this.noCommentsNum==0){
              this.updateOrderStatusTo5()
            }
            if(this.orderStatus=='1'){
              this.payButtonShow=true
            }
          }
        }).catch().finally()
      },
      getOrderData() {
        axios.get('/orders/'+this.orderId).then((res) => {
          if(res.status) {
            this.order=res.data.data
            console.info(this.order)
            this.orderStatus=this.order.status
            if(this.order.status=='4'||this.order.status=='5'){
              this.commentShow=true
              this.commentButtonShow=true
            }
            this.getOrderAddress()
          }
        }).catch().finally()
      },
      getOrderAddress() {
        axios.get('/userAddr/'+this.order.addressId).then((res) => {
          if(res.status) {
            this.adress=res.data.data
            console.info(this.adress)
          }
        }).catch().finally()
      },
      stateFormat(row, column) {
        if (row.productComments.commLevel === 1) {
          return '好评'
        } else if(row.productComments.commLevel === 2)  {
          return '中评'
        } else if(row.productComments.commLevel === 3) {
          return '差评'
        }
      },
      /**
       * 设置好对应的item_id，将form内容恢复默认
       * @param itemId
       */
      openFormDialog(itemId){
        console.info("长度")
        console.info(itemId)
        this.form.item_id=itemId
        this.form.userId=this.userId
        this.form.commLevel=1
        this.form.commContent=''
        this.form.isAnonymous=0
        this.dialogFormVisible = true
      },
      /**
       * 将form传给后端，插入一条评论
       * 成功后需要把orderitem的status更新为1
       * 然后重新加载下页面
       */
      confirmFormDialog(){
        this.dialogFormVisible = false
        console.info(this.form)
        axios.get('/productComments/insertComment',{params:{
          itemId: this.form.item_id,
            userId: this.form.userId,
            isanonymous: this.form.isAnonymous,
            commContent: this.form.commContent,
            commLevel: this.form.commLevel
        }}).then((res) => {
          if(res.status){
            // 处理下更新count和status
            this.getOrderData()
            this.getOrderItems()
          }
        }).catch().finally()
      },
      confirmFormDialog1(){
        this.dialogFormVisible = false
        console.info(this.form)
        this.orderItemParams={
            itemId: this.form.item_id,
            userId: this.form.userId,
            isanonymous: this.form.isAnonymous,
            commContent: this.form.commContent,
            commLevel: this.form.commLevel
        }
        axios({
          url: '/productComments/insertComment',
          data: this.orderItemParams,
          method: 'post'
        }).then((res) => {
          if(res.status){
            // 处理下更新count和status
            this.getOrderData()
            this.getOrderItems()
          }
        }).catch().finally()
      },
      updateOrderStatusTo5(){
        axios.get('/orders/updateStatusTo5ById',{params:{
          orderId:this.orderId}}).then((res) => {
          if(res.status){
            this.getOrderData()
            this.getOrderItems()
          }
        }).catch().finally()
      },
      pay() {
        var addressId = this.$route.query.addrId;
        // var address = {}
        //  _getById(addressId).then((res)=>{console.log(res);address=res.data});
        var param = {
          userId:this.userId,
          // address:address,
          addressId:Number(addressId),
          totalAmount:this.itemPrice,
          actualAmount:this.totalPrice,
          payType:2,
          status:1,
          deliverType:"中通"
        };
        // param=this.twoJsonMerge(param,address);
        // console.log(address)
        _insertOrders(param)
          .then((res) => {
            // res = res.data;
            console.log(res)
            if(res.status) {
              this.orderId=res.data
              this.goAlipay();
              // setTimeout(()=>{
              //   this.mdShow = false;
              //
              //   this.$router.push({
              //     path:`/orderinfo?m=${Base64.encode(res.data)}&n=${Base64.encode(this.totalPrice)}`
              // });
              // }, 60000);
            }
          });
      },
      goAlipay () {
        window.location.href=('http://localhost:8088/api/payment/pay/'+this.orderId+'/'+this.finalPrice1)
        // window.location.href = "localhost:8088/api/payment/pay/29345";
      },
    },
    computed:{
      itemPrice(){
        var money = 0;
        this.orderItemCommentsList.forEach((item)=>{
          if(item){
            money += parseFloat(item.orderItem.productPrice)*parseInt(item.orderItem.buyCounts);
          }
        })
        return money;
      },
      totalPrice() {
        this.finalPrice=this.itemPrice-this.discount+this.shipPrice+this.freightRisk
        this.finalPrice1=parseInt(this.finalPrice)
        return parseFloat(this.finalPrice);
      }
    },
    filters:{
      formatMoney: function(value,type) {
        return "¥" + value.toFixed(2) + type;
      }
    },
    components: {
      mallHeader,
      mallBread,
      mallFooter,
      paySuc
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .text {
    font-size: 20px;
    font: bold;
    color: #c0343a
    display: inline-block
    margin-left:20px
  }

  .item {
    margin-bottom: 18px;
  }

  .text-later {
    font-size: 18px;
    color: #1f2d3d
    display: inline-block
    margin-left:300px
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 44%;
    align-self:center
  }

  .pay-type
    margin: 0 auto
    width: 100%
    .p-title
      font-size: 18px
      font-weight:500
      line-height: 40px
      padding: 0 10px
      text-align:left
      position: relative
      &:before
        content: ' '
        position: absolute
        bottom: 0
        left: 0
        right: 0
        border-bottom: 1px solid #ccc
    .pay-item
      display: flex
      align-items: center
      padding:10px 0
      position:relative
      left:50%
      transform:translateX(-50%)
      div
        margin-top: 20px
        width: 140px
        height: 50px
        display: flex;
        align-items: center
        justify-content: center
        border: 1px solid #E5E5E5
        cursor: pointer
        border-radius: 6px
        margin-right: 10px
        background: #FAFAFA
        &:last-child
          margin-right:0
        @media (max-width:767px)
          width:90px
          height:40px
          margin-right:15px
          &:last-child
            margin-right:0
        img
          display: block
          height: 34px
          margin: 8px auto
          @media (max-width:767px)
            width:100%
            height:100%
      .active
        border-color: #6A8FE5
        background: #fff
    .com-btn
      width:350px
      line-height:30px
      margin:0px auto
      margin-top:50px
      @media (max-width:767px)
        width:280px
      .yes
        display:block
        height:100%
        background:rgb(209, 67, 74)
        color:#fff
        border-radius:6px
  .pay-sao
    width:100%
    .title
      text-align: center
      line-height: 24px
      font-size: 14px
      color: #999
    .money
      text-align: center
      font-size: 30px
      color: #d44d44
      font-weight: 700
    .img-box
      position: relative
      width: 180px
      height: auto
      min-height: 168px
      margin: 0 auto
      border: 1px solid #d3d3d3
      box-shadow: 1px 1px 1px #ccc
      display: inline-block
      .pic
        width:168px
        height:168px
      .explain
        display:flex
        padding:5px 10px
        img
          flex:0 0 38px
          height:38px
        .fn-right
          font-size:12px
          line-height:16px
          margin-left:30px
  .btn--pay
    background-color: #999
    border-color: #999
</style>
