<template>
  <div>
    <mall-header v-on:initscroll="scrollTop"></mall-header>
    <mall-bread>
      <span>订单列表</span>
    </mall-bread>
    <template>
      <div>
        <el-card class="container" style="width: 70%">
          <div style="margin-bottom: 20px; align: center">
            <el-radio-group v-model="radio1" fill="#D1434A" @change="statusChange">
              <el-radio-button label="待付款"></el-radio-button>
              <el-radio-button label="待发货"></el-radio-button>
              <el-radio-button label="待收货"></el-radio-button>
              <el-radio-button label="待评价"></el-radio-button>
              <el-radio-button label="已完成"></el-radio-button>
              <el-radio-button label="已关闭"></el-radio-button>
            </el-radio-group>
          </div>
          <el-table
            :data="orderList"
            border
            stripe
            highlight-current-row
            @current-change="handleColCurrentChange"
            style="width: 100%;align: center">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="物流单号">
                    <span>{{ props.row.deliveryFlowId}}</span>
                  </el-form-item>
                  <el-form-item label="配送方式">
                    <span>{{ props.row.deliveryType }}</span>
                  </el-form-item>
                  <el-form-item label="运费">
                    <span>{{ props.row.orderFreight }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ props.row.receiverAddress }}</span>
                  </el-form-item>
                  <el-form-item label="订单价格">
                    <span>{{ props.row.totalAmount }}</span>
                  </el-form-item>
                  <el-form-item label="支付金额">
                    <span>{{ props.row.actualAmount }}</span>
                  </el-form-item>
                  <el-form-item label="支付方式">
                    <span>{{ props.row.payType }}</span>
                  </el-form-item>
                  <el-form-item label="备注">
                    <span>{{ props.row.orderRemark }}</span>
                  </el-form-item>
                  <el-form-item label="付款时间">
                    <span>{{ props.row.payTime }}</span>
                  </el-form-item>
                  <el-form-item label="发货时间">
                    <span>{{ props.row.deliveryTime }}</span>
                  </el-form-item>
                  <el-form-item label="完成时间">
                    <span>{{ props.row.flishTime }}</span>
                  </el-form-item>
                  <el-form-item label="取消时间">
                    <span>{{ props.row.cancelTime }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderId"
              label="订单号">
            </el-table-column>
            <el-table-column
              prop="receiverName"
              label="收货人姓名">
            </el-table-column>
            <el-table-column
              prop="receiverMobile"
              label="手机号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="actualAmount"
              label="支付金额">
            </el-table-column>
            <el-table-column
              prop="deliveryType"
              label="配送方式">
            </el-table-column>
            <el-table-column
              prop="status"
              label="订单状态"
              width="100"
              column-key="status"
              align='center'
              effect="dark"
              :filters="[{ text: '待付款', value: '1' }, { text: '待发货', value: '2' },
                         { text: '待收货', value: '3' }, { text: '待评价', value: '4' },
                         { text: '已完成', value: '5' }, { text: '已关闭', value: '6' }]"
              :filter-method="filterStatus"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == 1" type='danger' disable-transitions>待付款</el-tag>
                <el-tag v-else-if="scope.row.status == 2" type='warning' disable-transitions>待发货</el-tag>
                <el-tag v-else-if="scope.row.status == 3" type='success' disable-transitions>待收货</el-tag>
                <el-tag v-else-if="scope.row.status == 4"  disable-transitions>待评价</el-tag>
                <el-tag v-else-if="scope.row.status == 5" type='info' disable-transitions>已完成</el-tag>
                <el-tag v-else-if="scope.row.status == 6" class="tab-black" disable-transitions>已关闭</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <router-link :to="{path:'/ordersdetails',query:{orderId:scope.row.orderId,userId:scope.row.userId}}">
                  <el-button type="text">查看详情</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.page.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="this.page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.page.total">
          </el-pagination>
        </el-card>
        <orders-detail ref="detailsDialog"></orders-detail>
      </div>
    </template>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <mall-footer></mall-footer>
  </div>
</template>
<script>
  import mallHeader from '../components/header.vue'
  import mallFooter from '../components/footer.vue'
  import mallBread from '../components/navbread.vue'
  import axios from 'axios'
  import $ from 'jquery'
  export default {
    data () {
      return {
        orderList:[],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        orderStatus: 1,
        radio1: '待付款',
        currentRow: null,
        stripe:true,
        userId: -1,
        dialogVisible:false
      }
    },
    created() {
      this.userId = sessionStorage.getItem("user_id")
      this.getOrders()
      if(userId==-1) {this.dialogVisible=true}

    },
    methods: {
      getOrders () {
        axios.get('/orders/listPageWithStatusById',{params:{
            pageNo: this.page.currentPage,
            pageSize: this.page.pageSize,
            status:this.orderStatus,
            userId:this.userId}}).then((res) => {
          if (res.status) {
            this.orderList = res.data.data.records
            this.page = {
              currentPage: res.data.data.current,
              pageSize: res.data.data.size,
              total: res.data.data.total
            }
          }
        }).catch().finally()
      },
      handleSizeChange (curSize) {
        this.page.pageSize = curSize,
          this.page.currentPage = 1,
          this.getOrders()
      },
      handleCurrentChange (curPage) {
        console.info("芜湖")
        console.info(curPage)
        this.page.currentPage = curPage
        this.getOrders()
      },
      handleColCurrentChange(val) {
        this.currentRow = val;
      },
      filterStatus(value, row) {
        return row.status === value;
      },
      scrollTop() {
        var promise = new Promise(()=>{
          this.$router.push({
            path:`/`
          });
        }).then($('html,body').animate({scrollTop:480},500));
      },
      statusChange:function(status){
        if(status=='待付款') {
          this.orderStatus=1
          this.page.currentPage=1
          this.getOrders()
        }
        else if(status=='待发货') {
          this.orderStatus=2
          this.page.currentPage=1
          this.getOrders()
        }
        else if(status=='待收货') {
          this.orderStatus=3
          this.page.currentPage=1
          this.getOrders()
        }
        else if(status=='待评价') {
          this.orderStatus=4
          this.page.currentPage=1
          this.getOrders()
        }
        else if(status=='已完成') {
          this.orderStatus=5
          this.page.currentPage=1
          this.getOrders()
        }
        else if(status=='已关闭') {
          this.orderStatus=6
          this.page.currentPage=1
          this.getOrders()
        }
      }
    },
    components: {
      mallHeader,
      mallFooter,
      mallBread,
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/style/mixin";
  body {
    font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Microsoft Yahei, \\5FAE\8F6F\96C5\9ED1, STHeiti, \\534E\6587\7EC6\9ED1, sans-serif;
    color: #666;
    font-size: 14px;
  }
  .tab-black{
    color: whitesmoke;
    background-color: darkgray;
  }
  .demo-table-expand {
    font-size:0;
    color: #7c7c7c;
  }
  .demo-table-expand label {
    font-size: 40px;
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    margin-left: 25px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
        background:#d1434a;
        padding:2px 6px;
        border-radius:6px;
        color:#fff;
        font-size:14px;
        margin-top:-3px;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        height:24px;
        line-height: 24px;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    .total{
      flex:0 0 100px;
      text-align: center;
      color:#d1434a;
    }
    .pay-content{
      flex:1;
      .payBtn {
        background:#20a0ff;
        padding:5px 10px;
        border-radius:6px;
        color:#fff;
        font-size:14px;
        margin: 0 auto;
      }
      .alreadyPay{
        font-size:14px;
        color:#999;
        text-align:center;
      }
    }
    div:last-child {
      padding-right: 24px;
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
