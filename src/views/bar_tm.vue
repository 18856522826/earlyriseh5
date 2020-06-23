<template>
    <div>
    <el-drawer 
      title="发帖"
      :visible.sync="drawer"
       direction="ttb"
      :before-close="handleClose"
      size="100%">
      <el-input placeholder="标题" style="width:70%" v-model="postname"></el-input>
      <br><br>
      <div style="height:400px; overflow:auto">
      <mavon-editor v-model="value" :toolbars="toolbars" @change="tet"/>
      </div>
      <div style="margin-left:80%;margin-top:5%;">
      <el-button>取消发布</el-button>
      <el-button type="success" @click="submit">发布帖子</el-button>
      </div>
    </el-drawer>

    <div class="header1">
        <el-row>
          <el-col :span="1">
            <img v-bind:src="bar.barimg" class="barimg"></img>
            </el-col>
            <el-col :span="2">
            <p class="tit">{{bar.barname}}</p>
            </el-col>
            <el-col :span="2"><el-button type="success" @click="batt">{{batten}}</el-button></el-col>
        </el-row>
        <el-row class="con">
            <el-col :span="6">{{bar.barbrief}}</el-col>
        </el-row>
        </div>
        <div class="main">
            <el-row>
                <span class="tz">最近的帖子</span>
                <el-button @click="drawer=true">发帖</el-button>
            </el-row>
            <el-row style="margin-top:10px;">
                <el-divider></el-divider>
            </el-row>
            <div v-for="(post,index) in posts" :key="post.pid" class="post">
                 <el-link type="success">{{post.postname}}</el-link> 
                 <p>{{name[index]}}</p>
                <el-divider></el-divider>
                </div> 
            </div>
        </div>
    </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from "axios"
export default {
    data(){
        return{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            postname:"",
            postcontent:"",
            drawer: false,
            barimg:require("../assets/a.png"),
            value:"",
            toolbars:{
                bold: true, // 粗体
                italic: true,// 斜体
                header: true,// 标题
                code: true,
                preview: true,
                imagelink: true,
                quote: true,
                ol: true, // 有序列表
                ul: true, // 无序列表
                trash: true,
            },
            posts:[],
            name:[],
            bar:{},
            ifbar:0,
            batten:""
        }
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    methods:{
        ex(){
            axios({
            method:"post",
            url:"/api/bar/getbattention",
            data:{
                uid:sessionStorage.getItem("username"),
                barid:this.bar.barid
            }
        }).then(response=>{
            if(response.data==1){
                this.batten="取消关注";
                this.ifbar=1
            }else{
                this.batten="关注贴吧";
                this.ifbar=0
            }
        })
        },
        batt(){
            if(this.ifbar==0){
                axios({
                method:"post",
                url:"/api/bar/setbattention",
                data:{
                    uid:sessionStorage.getItem("username"),
                    barid:this.bar.barid
                }
            }).then(response=>{
                this.ex();
            })
            }else{
                axios({
                method:"post",
                url:"/api/bar/delbattention",
                data:{
                    uid:sessionStorage.getItem("username"),
                    barid:this.bar.barid
                }
            }).then(response=>{
                this.ex();
            })
            } 
        },
        handleClose(){
            this.drawer=false;
        },
        tet(value,render){
            this.postcontent=render;
        },
        submit(){
            axios({
                method:"post",
                url:"/api/post/addpost",
                data:{
                    pname:this.postname,
                    content:this.postcontent,
                    barid:this.bar.barid,
                    username:sessionStorage.getItem("username")
                }
            }).then(response=>{
                console.log(response.data);
                axios({
                method:"post",
                url:'/api/post/getbarpost',
                data:{
                   id:this.bar.barid
                }
            }).then(response=>{
              var pol= this.posts.length;
              var npol=response.data.post.length;
              for(var i=0;i<npol-pol;i++){
                  this.posts.push(response.data.post[i+pol])
              }
               var nal=this.name.length;
               var nnal=response.data.name.length;
               for(var j=0;j<nnal-nal;j++){
                   this.name.push(response.data.name[j+nal]);
               }
            })
                this.handleClose();
            })
        },
      
    },
     components:{
            mavonEditor
        },
    mounted(){
        var result=JSON.parse(this.$route.query.data);
        this.bar=result;
        axios({
            method:"post",
            url:"/api/bar/getbattention",
            data:{
                uid:sessionStorage.getItem("username"),
                barid:this.bar.barid
            }
        }).then(response=>{
            if(response.data==1){
                this.batten="取消关注";
                this.ifbar=1
            }else{
                this.batten="关注贴吧";
                this.ifbar=0
            }
        })
           axios({
                method:"post",
                url:'/api/post/getbarpost',
                data:{
                   id:this.bar.barid
                }
            }).then(response=>{
               this.posts=response.data.post;
               this.name=response.data.name;
            })
        }
}
</script>
<style scoped>
.post{
    width: 100%;
    height:50px;
    margin-top:10px;
}
.con{
    margin-top:10px;
}
.el-col{
    margin-left:10px;
}
.tz{
    font-size: 20px;
}
.main{
    margin-top: 10px;
}
.header1{
    width: 100%;
    height: 200px;
    background-color: #f6f6f6;
}
*{
    margin: 0;
}
.barimg{
    width: 40px;
    height: 40px;
    vertical-align:text-top;
}
.tit{
    margin-top: 10px;
    font-size: 20px;
}
</style>