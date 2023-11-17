<template>
    <div>
        <div class="di1">
            <el-button @click="kai">变颜色</el-button>
            <el-tree
                :data="title_list"
                :props="defaultProps"
                accordion
                @node-click="handleNodeClick">
            </el-tree>
        </div>
        <div class="di2" v-for="i in this.content_list" :key="i">
            <h4><samp style="color: rgb(196, 205, 255);"></samp></h4>
            <center>
                <h2>{{ i.title }}</h2>
                <img :src="i.data_img" alt="还未添加图片" style="height: 400px;width: 800px;">
            </center><br><br>
            <div class="commendContent" v-html="i.content">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title_list :[],
            content_list:[],
            flag :0

        }  
    },
    methods:{
        kai:function (){
            var bt = document.querySelector('button');
            var beijingse = document.body;
            if(this.flag === 0){
                beijingse.style.backgroundColor = 'black'; // 点击按钮后背景颜色改变
                bt.innerHTML = '开灯';                     // 点击按钮后按钮文本改变
                this.flag = 1;
            }
            else {
                beijingse.style.backgroundColor = 'white'; // 点击按钮后背景颜色改变
                bt.innerHTML = '关灯';                     // 点击按钮后按钮文本改变
                this.flag = 0;
            }
        },
        commendContent () {
            // this.commend.content 是后端传回来的文本数据，就是要对这个数据进行处理  
            let arr = this.commend.content.split("");  
            return arr.map((item) => {  
                if (item === "&nbsp;") {  
                    // 这里可以替换为你想要的空格效果，比如空格转为 "&nbsp;"  
                    return "&nbsp;";  
                } else if (item === "\n") {  
                    return "<br>";  
                } else {  
                    return item;  
                }  
            }).join(""); 
        },
        handleNodeClick:function(v){
            this.$axios.get('ydAta/',{params:{'id':v.id}})
            .then(resp=>{
                if (resp.data.code == 200) {
                    this.content_list = resp.data.data
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        get_title:function(id){
            this.$axios.get('titleData/',{params:{'kind_id':id}})
            .then(resp=>{
                if(resp.data.code == 200) {
                    // this.decodwe_data = atob(resp.data.data)
                    // // 将密文转换为字符串
                    // const json_data = JSON.stringify(this.decodwe_data)
                    // console.log(json_data)
                    // // 将字符串转换为对象进行展示

                    this.title_list = resp.data.data
                }
            }).catch(err=>{
                console.log(err)
            })
        },

    },
    mounted(){
        this.get_title();
    }
}
</script>

<style>
    .di1{
        width: 20%;
        height: 1000px;
        /* background-color: aqua; */
        float: left;
        overflow:auto;
        /* border-right: 3px dotted  rgb(41, 7, 233); 设置右边框为1像素的黑色实线   */
    }  
    .di2{
        width: 80%;
        height: 1000px;
        /* background-color: antiquewhite; */
        float: right;
    }
    .commendContent{
        width: 50%;
        height: 100%;
        /* background: #e4bebe; */
        overflow:auto;
        left: 0px;
        font-size: 20px;
        margin-left: 500px;
    }
</style>