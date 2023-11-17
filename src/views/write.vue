<template>
  <div class="zong" v-if="this.role_id == 1">
    <div class="left1">
      <h3><center>关于笔记&emsp;&emsp;<el-button @click="tui">退出</el-button></center></h3>

      <el-button @click="add_fang = true">添加种类</el-button>
      <router-link :to="'/read_book'">
        <el-button>查看总笔记</el-button>
      </router-link>
      <div v-if="add_fang == true">
        <el-input style="width: 300px;" v-model="add_kind_name" placeholder="请输入种类名"></el-input>
        <el-button @click="add_fang = false">关闭</el-button>
        <el-button @click="tijiao_kind">确认添加</el-button>
        <el-button @click="tijiao_kindz">确认修改</el-button>
      </div>

      <table v-for="i in this.kind_list" :key="i" align="center" style="border-spacing:10px;">
        <tr>
          <td>
            <el-button type="text" @click="del_kind(i.id)">删除</el-button>
              &emsp;<el-button type="text" @click="upd_kind(i.id,i.kind_name)">修改</el-button> &emsp;&emsp;&emsp;&emsp;
              <el-button type="text" @click="kai(i.id,i.kind_name)"><h3>{{ i.kind_name }}</h3></el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="right1" >
        <div v-if="flang == true">
          <center><h3>{{ this.title_kind_name }}</h3></center>
          <router-link :to="'/book?index=' + this.kind_id">
            <el-button>查看笔记</el-button>
          </router-link><el-button @click="flang = false">关闭</el-button>
          <div class="write1">
            <el-input v-model="title_data" placeholder="请输入标题"></el-input><br><br>

            <el-upload
              :headers="this.headers"
              action="http://127.0.0.1:8000/contentImg/"
              list-type="picture-card"
              :on-success="handlesuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
            <br><br>

            <el-input
              type="textarea"
              :rows="18"
              placeholder="请输入内容"
              v-model="textarea"
              style="font-size: 30px;">
            </el-input><br><br>
            <el-button @click="submit">提交</el-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      role_id : localStorage.getItem('role_id'),
      kind_list : [],
      isCollapse: true,
      kind_id:0,
      flang:false,
      title_kind_name:"",
      title_data:'',
      textarea:'',
      add_fang : false,
      add_kind_name:"",
      update_kind_id : 0,
      headers:{'token':localStorage.getItem('token')},
      path_url :'',
      dialogVisible :false
    }
  },
  methods:{
    handlesuccess(file) {
        // console.log(file);
        this.path_url = file.path_url
      },
    tijiao_kindz:function(){
      this.$axios.put('kindData/',{"kind_id":this.update_kind_id,"kind_name":this.add_kind_name},{headers:{'token':localStorage.getItem('token')}})
      .then(resp=>{
        if(resp.data.code == 200) {
          this.$message.success(resp.data.msg)
          this.add_fang = false
          this.add_kind_name = ''
          this.kinds_data();
        } else {
          this.$message.error(resp.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    upd_kind:function(id,kind_name){
      this.add_fang = true,
      this.update_kind_id = id
      this.add_kind_name = kind_name
    },
    del_kind:function(id){
      this.$axios.delete('kindData/',{params:{"id":id},headers:{'token':localStorage.getItem('token')}})
      .then(resp=>{
        if(resp.data.code == 200) {
          this.$message.success(resp.data.msg)
          this.kinds_data();
        } else {
          this.$message.error(resp.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    tijiao_kind:function(){
      this.$axios.post('kindData/',{"kind_name":this.add_kind_name},{headers:{'token':localStorage.getItem('token')}})
      .then(resp=>{
        if(resp.data.code == 200) {
          this.$message.success(resp.data.msg)
          this.add_fang = false
          this.add_kind_name = ''
          this.kinds_data();
        } else {
          this.$message.error(resp.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    // 提交信息：
    submit:function(){
      //关键js代码
      var des = this.textarea.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
      //将des文本内容存入数据库
      this.$axios.post('Kindsdata/',{'kind_id':this.kind_id,'title':this.title_data,'content':des,'path_url':this.path_url},{headers:{'token':localStorage.getItem('token')}})
      .then(resp=>{
        if (resp.data.code ==200) {
          this.$message.success(resp.data.msg)
          this.title_data = ''
          this.textarea = ''
        } else {
          this.$message.error(resp.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    kai:function(id,kind_name){
      this.kind_id = id
      this.title_kind_name =  kind_name
      this.flang = true
    },
    kinds_data:function(){
      this.$axios.get('Kindsdata/')
      .then(resp=>{
        if(resp.data.code == 200) {
          this.kind_list = resp.data.data
        }
      }).catch(err=>{
        this.$message.error(err)
      })
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },
    tui:function(){
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('role_id')
      this.$router.push('/blogs')
      this.$message.success("退出成功")
    }
  },
  mounted(){
    this.kinds_data();
  }
}
</script>

<style>
  .write1{
    width: 100%;
    height: 1000px;
    /* background-color: rgb(247, 242, 242); */
    border:1px solid;
    overflow:auto;
  }
  .zong{
    width: 100%;
    height: 1000px;
    /* background-color: #e7d4d4; */
  }
  .left1{
    width: 20%;
    height: 100%;
    /* background-color: #dfa6a6; */
    float: left;
  }
  .right1{
    width: 80%;
    height: 100%;
    /* background-color: aqua; */
    float: right;
  }
</style>