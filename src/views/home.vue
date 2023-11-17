<template>
    <div>
       <div ref="vantaRef" style="width:100%;height:100vh">
        <div class="my_title">个人博客</div>
        <div class="bei">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="注册" name="first">
              <el-input v-model="username" placeholder="请输入用户名"></el-input><br><br><br><br>
              <el-input v-model="password" placeholder="请输入密码" show-password></el-input><br><br><br><br>
              <el-button type="primary" round style="width: 400px;" @click="regi">注册</el-button>
            </el-tab-pane>
            <el-tab-pane label="登陆" name="second">
              <el-input v-model="usernamel" placeholder="请输入用户名"></el-input><br><br><br><br>
              <el-input v-model="passwordl" placeholder="请输入密码" show-password></el-input><br><br><br><br>
              <el-button type="primary" round style="width: 400px;" @click="logi">登陆</el-button>

            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>
    
    </template>
    
    <script>
    import * as THREE from 'three'
    import Net from 'vanta/src/vanta.net'

    export default {   
      name: "hello",
      data() {
        return {
          username:'',
          password:'',
          usernamel:'',
          passwordl:''
        };
      },
      mounted() {
        this.vantaEffect = Net({
          el: this.$refs.vantaRef,
          THREE: THREE
        })
      },
      beforeDestroy() {
        if (this.vantaEffect) {
          this.vantaEffect.destroy()
        }
      },
      methods: {
        regi:function(){
          this.$axios.post("registerlogin/",{'username':this.username,"password":this.password})
          .then(resp=>{
                if(resp.data.code == 200) {
                    this.$message.success(resp.data.msg)
                    this.username = ''
                    this.password = ''
                } else {
                    this.$message.error(resp.data.msg)
                    this.username = ''
                    this.password = ''
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        logi:function(){
          this.$axios.get('registerlogin/',{params:{'username':this.usernamel,'password':this.passwordl}})
          .then(resp=>{
                if(resp.data.code == 200) {
                    this.usernamel = ''
                    this.passwordl = ''
                    localStorage.setItem('token',resp.data.token)
                    localStorage.setItem('id',resp.data.id)
                    localStorage.setItem('username',resp.data.username)
                    localStorage.setItem('role_id',resp.data.role_id)
                    this.$message.success(resp.data.msg)
                    this.$router.push('/write')
                } else {
                    this.$message.error(resp.data.msg)
                    this.username = ''
                    this.password = ''
                }
            }).catch(err=>{
                console.log(err)
            })
        }
      }
    };
    </script>
    
    <style>
    .my_title{
      z-index: 999;
      position: fixed;
      top: 40%;
      left: 10%;
      color: aquamarine;
      font-size: 200%;
      font-weight: bolder;
    }
    .bei{
      width: 20%;
      height: 30%;
      background:white;
      margin-left: 60%;
      top: 50%;
      /* border-radius: 20%; */
      border: 5px solid rgb(154, 230, 32);
      background-image: url(E:\Django_project\fu_vue\src\assets\1.png);
      background-repeat: no-repeat, repeat; 
      background-size:100% 100%;
      /* background-position: right bottom, left top;  */
    }
    </style>
    