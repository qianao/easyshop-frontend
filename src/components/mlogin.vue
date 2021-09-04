<template>
  <div>
    用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
    <br><br>
    密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
    <br><br>
    <button v-on:click="login">登录</button>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        this.$axios.get('/login', {
          params: {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
        }).then(res => {
          if (res.data.code === 200) {
            console.info('yes')
          } else {
            console.info('no')
          }
        })
      }
    }
  }
</script>
