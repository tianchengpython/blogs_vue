<template>
    <div v-if="this.role_id == 1">

        <el-dialog
            title="修改"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-input v-model="title_data" placeholder="请输入标题"></el-input><br><br>
            
            <!-- "http://123.249.3.67:8001/contentImg/" -->
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
              v-model="textarea" style="font-size: 30px;">
            </el-input><br><br>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="tijiao">提 交</el-button>
        </el-dialog>

        <div v-for="i in this.resp_list" :key="i" class="di">
            <h3><center>{{ i.title }}&emsp;
            <el-button type="text" @click="del_content(i.id)">删除</el-button>
                &emsp;<el-button type="text" @click="xiu(i.id,i.title,i.content)">修改</el-button>
            </center></h3>
            <center><h5><font style="color: rgb(158, 145, 128);">创建时间:{{ i.start_datatime }} || 更新时间:{{ i.update_datatime }}</font></h5></center>
            <img :src="i.data_img" alt="未添加图片" style="width: 60px;height: 60px;"><br>

            <center><div v-html="i.content">
            </div></center>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            role_id : localStorage.getItem('role_id'),
            resp_list : [],
            kind_id:0,
            dialogVisible:false,
            title_data:'',
            textarea:'',
            update_id : 0,
            path_url:'',
            headers:{'token':localStorage.getItem('token')}
        }
    },
    methods:{
        handlesuccess(file) {
        this.path_url = file.path_url
      },
        get_content:function(){
            this.$axios.get('bookData/',{params:{'kind_id':this.kind_id},headers:{'token':localStorage.getItem('token')}})
            .then(resp=>{
                if (resp.data.code == 200) {
                    this.$message.success(resp.data.msg)
                    this.resp_list = resp.data.data
                } else {
                    this.$message.error(resp.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        xiu:function(id,title,content){
            // console.log(title,content)
            this.dialogVisible = true
            this.update_id = id
            this.title_data = title
            this.textarea =  content.replace(/<br\s*\/?>/g, '\n').replace(/&nbsp;/g, ' ');;
        },
        tijiao:function(){
            this.dialogVisible = false
            var des = this.textarea.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
            this.$axios.put('bookData/',{'id':this.update_id,'title':this.title_data,'content':des,'path_url':this.path_url},{headers:{'token':localStorage.getItem('token')}})
            .then(resp=>{
                if(resp.data.code == 200) {
                    this.$message.success(resp.data.msg)
                    this.get_content();
                } else {
                    this.$message.error(resp.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        del_content:function(id){
            this.$axios.delete('bookData/',{params:{'id':id},headers:{'token':localStorage.getItem('token')}})
            .then(resp=>{
                if (resp.data.code == 200) {
                    this.$message.success(resp.data.msg)
                    this.get_content()
                } else {
                    this.$message.error(resp.data.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        get_index:function(){
            let geturl = window.location.href 
            let getqyinfo = geturl.split('?')[1]
            let getqys = new URLSearchParams('?'+getqyinfo)  //将参数放在URLSearchParams函数中
            let getqycode = getqys.get('index')
            this.kind_id = getqycode
            // console.log(this.kind_id)
        }
    },
    mounted(){
        this.get_index();
        this.get_content();
    }
}
</script>

<style>
    .di{
        width: 400px;
        height: 400px;
        /* background: #000; */
        float: left;
        margin-left:10px;
        margin-top: 10px;
        border: 1px solid;
        overflow:auto;
        border-radius: 5%
    }
</style>