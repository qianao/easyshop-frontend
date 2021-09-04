<!--<template>-->
  <!--<div v-html="html"></div>-->
<!--</template>-->
<!--&lt;!&ndash;<script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"></script>&ndash;&gt;-->
<!--<script>-->
  <!--ap.chooseImage()-->
    <!--.then(function(result){-->
      <!--return new Promise(function(resolve, reject) {-->
        <!--yourImageDom.onload = resolve;-->
        <!--yourImageDom.onerror = reject;-->
        <!--yourImageDom.src = result.apFilePaths[0];-->
      <!--})-->
    <!--})-->
    <!--.then(function(){-->
      <!--return ap.alert('图片加载成功');-->
    <!--})-->
    <!--.catch(function(){-->
      <!--ap.showToast('图片加载失败');-->
    <!--});-->
  <!--// import AlipaySdk from 'alipay-sdk';-->

  <!--// const alipaySdk = new AlipaySdk({-->
  <!--//   appId: '2021000117673783'-->
  <!--//   // privateKey: fs.readFileSync('./private-key.pem', 'ascii'),-->
  <!--// });-->
  <!--export default {-->
    <!--data(){-->
      <!--return{-->
        <!--html:''-->
      <!--}-->
    <!--},-->
    <!--methods:{-->
      <!--fetchVideoPay(){-->
        <!--let param={-->
          <!--orderId: this.$route.query.orderId-->
        <!--};-->
        <!--this.$api.orderpage.videoAliPay(param).then( res => {-->
          <!--this.html = res.data;-->
          <!--this.$nextTick(() => {-->
            <!--document.forms[0].submit()   //渲染支付宝支付页面-->
          <!--})-->
        <!--})-->
      <!--}-->
    <!--},-->
    <!--mounted(){-->
      <!--this.fetchVideoPay()-->
    <!--}-->
  <!--}-->
<!--</script>-->
