<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition md-register-modal" v-bind:class="{'md-show':registShow}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">
                <!-- <img src="../../static/logo.png" alt="" style="height:100%;"> -->
              </div>
              <button class="md-close" @click="closeModal">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="err1">{{errtips}}</span>
                  <span v-show="sccu" style="color:#40d505; font-size:16px;"><i class="el-icon-circle-check-outline"></i>注册成功,3秒后跳转至登录！</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="用户名" data-type="loginname" @focus="checkRegular">
                  </li>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userId" class="regi_login_input regi_login_input_left" placeholder="手机号" data-type="loginname" @focus="checkRegular" @blur="ifUserExist">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="密码" @focus="checkRegular" @blur="checkRegular">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="confirmPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="确认密码" @blur="checkRegular">
                  </li>

                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="3" v-model="user_email" class="regi_login_input regi_login_input_left" placeholder="邮箱" @focus="checkRegular">
                  </li>

                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="3" v-model="confirm_email" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="验证码">
                  </li>

                </ul>
                <button @click="send_code" class="certicifiy">发送验证码</button>

                <p class="agree">
                  <label class="el-checkbox">
                    <span class="el-checkbox__input">
                      <input type="checkbox">
                    </span>
                    <span class="el-checkbox__label">
                      我已阅读并同意遵守
                      <a>法律声明</a> 和
                      <a>隐私条款</a><!---->
                    </span>
                  </label>
                </p>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" :class="{'btn--dis':!ifreg}" @click="register" @keyup.enter="register">注册</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-show="registShow" @click="closeModal"></div>
    </div>
</template>
<script>
import axios from 'axios'
    export default{
      props:['registShow'],
        data(){
            return{
                msg:'hello vue',
                userName:'',
                userId:'',
                userPwd:'',
                confirmPwd:'',
                user_email:'',
                err1:false,
                errtips:'',
                sccu:false,
                ifreg:false,
                confirm_email:'',
                judge_email:'',
                judge_double:false
            }
        },
        methods:{
          closeModal(){
            this.$emit("close");
          },
          create(){
            this.sccu = false;
          },
          send_code(){
            var param = ({
              user_email: this.user_email
            });
            var reg_email =/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if(reg_email.test(this.user_email)){
              axios.get('/users/send_code',{
                params:param
              }).then((res) => {
                console.info(res);
                if(res.data.code === 0){
                  console.info("邮件发送成功");
                  this.judge_email = res.data.message;
                }
              });
            }
            else {
              this.err1=true;
              this.errtips='邮箱输入格式错误！';
            }
          },
          checkRegular() {
            var reg_email =/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            var reg_phone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if(this.userName == '' || this.userName == null) {
              this.err1 = true;
              this.errtips = '用户名不能为空！';
              return;
            } else if(this.userId == '' || this.userId == null ) {
                this.err1 = true;
                this.errtips = '用户手机号不能为空！';
                return;
            } else if(!reg_phone.test(this.userId)) {
                this.err1 = true;
                this.errtips = '请确认您输入手机号是否正确？';
                return;
            } else if(this.userPwd == '' || this.userPwd == null){
                this.err1 = true;
                this.errtips = '用户密码不能为空！';
                return;
            } else if(!/^(\w){6,20}$/.test(this.userPwd)) {
              this.err1 = true;
              this.errtips = '密码为6-20位！';
              return;
            } else if(this.userPwd != this.confirmPwd) {
              this.err1 = true;
              this.errtips = '两次密码不一致！';
              return;
            }else if(!reg_email.test(this.user_email)){
              this.err1=true;
              this.errtips='邮箱输入格式错误！';
            }else if(this.confirm_email != this.judge_email){
              this.err1=true;
              this.errtips='邮件验证码错误';
            }else{
                this.err1 = false;
                this.errtips = '';
                this.ifreg = true;
              }
          },
          ifUserExist() {
            var param = ({
                  userId: this.userId
                });
            axios.get('/users/userExist', {
              params:param
            }).then((res) => {
              console.info(res);
              if(res.data.code === 1) {
                this.err1=true;
                this.errtips = '此账号已被注册！';
                return;

              } else {
                this.judge_double = true;
                return;
              }
            });
          },
          register() {
            this.checkRegular();
            var that=this
            if(that.ifreg && that.judge_double){
              var param = ({
                  userName: this.userName,
                  userId: this.userId,
                  userPwd: this.userPwd,
                  user_email:this.user_email,
                });
                axios.get('/users/register', {
                  params:param
                }).then((res) => {
                  console.info(res)
                  if(res.data.code === 0) {
                   this.sccu = true;
                   this.userId = '';
                   this.userName = '';
                   this.userPwd = '';
                   this.confirmPwd = '';
                   this.user_email='';
                   this.confirm_email='';
                   setTimeout(() => {
                    this.$emit("showlogin");
                   },3000);
                  }
                });
              }

              else {
                this.err1 = true;
                this.errtips = '请按系统要求完成您的注册！';
              }
          }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.certicifiy
  width:100px;
  height:30px;
  border:1px solid;
  font-size:10px;
  color white;
  background-color:#333333;
  border-radius:8px;
  bottom:10px;
  margin-bottom:15px;
.md-modal
  width:480px!important
  @media (max-width:767px)
    width:85% !important
  .md-content
    .error-wrap
      @media (max-width:767px)
        position: absolute;
        top: 10px;
    ul
      width:100%
      .regi_form_input
            border-radius:6px
          .check-btn
            position:relative
            text-align: right
            .auto-login
              position: absolute
              top: 0px
              left: 2px
              color: #999
              .el-checkbox__input
                cursor: pointer
                display: inline-block
                position: relative
                white-space: nowrap
                outline: 0
                line-height: 1
              .el-checkbox__label
                font-size: 14px
                padding-left: 5px
          .acolor
            color:#d1434a
    .agree
      color: #999
      text-align:left
      margin-left:10px
      @media (max-width:767px)
        position:absolute
        bottom:50px
      .el-checkbox__input
        cursor: pointer
        outline: 0
        line-height: 1
        vertical-align: middle
        margin-top:-4px
      .el-checkbox__label
        color:#999
        a
          font-style: normal
          text-decoration: none
          color: #5079d9
          cursor: pointer
          transition: all .15s ease-out
    .login-wrap
      .btn-login
        border-radius:6px
        height: 40px
        line-height: 40px
        border: 2px solid #db0611
        background: #db0611
      .btn--dis
        border-color: #ccc
        background-color: #ccc
        color: #fff
        cursor: default

</style>
