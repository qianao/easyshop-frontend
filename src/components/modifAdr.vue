<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" id="showModalw" v-bind:class="{'md-show':modifShow}">
          <div class="md-modal-inner">
            <div class="md-top">
              <button class="md-close" @click="closeModal">关闭</button>
            </div>
            <span><i style="color:#ee7a23;">*</i>为必填项</span>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    收货人<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="modifItem.receiverName">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    省<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="this.modifItem.province">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    市<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="modifItem.city">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    区县<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="modifItem.area">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    所在地址<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="modifItem.addr" placeholder="建议您如实填写收货信息:例如省/市/区/街道地址/门牌号" title="建议您如实填写收货信息:例如省/市/区/街道地址/门牌号">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    电话号码<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="modifItem.receiverMobile">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    邮政编码<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="modifItem.postCode">
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-wrap col-2">
                <button class="btn btn--s" id="btnModalConfirms" @click="saveVue">保存</button>
                <button class="btn btn--s btn--red" id="btnModalCancels" @click="closeModal">取消</button>
              </div>
              <slot></slot>
            </div>
          </div>
        </div>
        <div :class="{'md-overlay':modifShow}" id="showOverLay" @click="closeModal"></div>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .md-show
    display:block
</style>
<script>
import "../assets/css/modal.css"
import {_getAddrById} from "../api/address.js"
    export default{
      props: {
        modifShow: Boolean,//这样可以指定传入的类型，如果类型不对，会警告
        modifItem : {
          receiverName: String,
          addr:String,
          postCode:String,
          receiverMobile:String,
          status:String,
          province :String,
          city:String,
          area:String,
          commonAddr:Number,
          userId : BigInt,
          gmtCreate :Object
        }
        // modifItem :JSON
      },
        data(){
            return{
                msg:'hello vue',
              newName:'',
              newProvince:'',
              newCity:'',
              newArea:'',
              newAddress:'',
              newTel:'',
              newPostCode:''
            }
        },
        methods:{
          closeModal(){
            this.$emit("close");
          },
          getAdrInf(id){

          },
          saveVue() {
            console.log(this.modifItem)
            var flag = this.checkForm(this.modifItem);
            console.log(typeof (this.modifItem))
            this.$emit("modifAdr",this.modifItem);
            if (flag) {
              this.$emit("close")
              // for
              this.$emit("modifAdr",this.modifItem);
            }else {
              // alert("请完整输入");
            }

          },
          checkForm: function (myJson) {// console.log(data())
            for (const val in myJson) {
              if(myJson[val]=='') return false
            }
            return true

          }
        }
    }
</script>
