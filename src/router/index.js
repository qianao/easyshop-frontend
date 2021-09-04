import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../page/GoodsList'
import Cart from '../page/Cart'
import Address from '../page/Address'
import AddressList from '../page/AddressList'
import OrderConfirm from '../page/OrderConfirm'
import OrderSuccess from '../page/OrderSuccess'
import OrdersDetails from '../page/OrdersDetails'
import FakeOrderList from '../page/FakeOrderList.vue'
import OrderList from '../page/OrderList.vue'
import Login from '../components/mlogin'
import GoodsDetails from '../page/GoodsDetails'
import Test from '../page/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    // {
    //   path: '/aliPay',
    //   name: 'AliPay',
    //   component: AliPay
    // },
    {
      path: '/goodsdetails',
      name: 'GoodsDetails',
      component: GoodsDetails
    },
    {
      path: '/ordersdetails',
      name: 'OrdersDetails',
      component: OrdersDetails
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/addresslist',
      name: 'AddressList',
      component: AddressList
    },
    {
      path: '/orderconfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderinfo',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/orderlist',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/ordersdetails',
      name: 'OrdersDetails',
      component: OrdersDetails
    },
    {
      path: '/fakeorderlist',
      name: 'FakeorderList',
      component: FakeOrderList
    },
    {
      path : '/login',
      name : 'Login',
      component : Login
    }
  ]
})
