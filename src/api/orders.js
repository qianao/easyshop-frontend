import http from './public'
// 获取订单列表
export const _insertOrders  = (params) =>  http.fetchPut('/orders/creat',JSON.parse(JSON.stringify(params)))

export const _finishOrdersPayment  = (params) =>  http.fetchGet('/orders/paid/'+params)

export const _aliPay  = (params) =>  http.fetchGet('/payment/pay'+params)

export const _deleteCartItem  = (id) =>  http.fetchGet('/shoppingCart/delCart',{params : {cartId : id} })

export const _generateOrderItem  = (orderId,productId,url,productPrice,num) =>  http.fetchPost('/orderItem',{orderId:orderId,productId:productId,
  productPrice:productPrice,productImg:url,buyCounts:num})


