<template>
    <div>
        <el-dialog  :visible.sync="userdia" :before-close="handleClose" title="修改个人信息">
            <el-row>
                <el-col :span="3" :offset="3">用户名</el-col>
                <el-col :span="2" :offset="4">{{user.username}}</el-col>
                </el-row>
                <br>
                <el-row>
                <el-col :span="3" :offset="3">昵称</el-col>
                <el-col :span="10" :offset="3"><el-input placeholder="请输入新昵称" size="small" v-model="nickname"></el-input></el-col>
                </el-row>
                <br>
                <el-row>
                <el-col :span="3" :offset="3">性别</el-col>
                <el-col :span="10" :offset="3">
                    <el-radio v-model="sex" label="1">男</el-radio>
                    <el-radio v-model="sex" label="2">女</el-radio>
                </el-col>
                </el-row>
                <br>
                <el-row>
                <el-col :span="3" :offset="3">毕业院校</el-col>
                <el-col :span="10" :offset="3"><el-input placeholder="请输入新学校" size="small" v-model="school"></el-input></el-col>
                </el-row>
                <br>
                <el-row>
                <el-col :offset="6">
                    <el-button style="width:40%" type="success" @click="submit">提交</el-button>
                </el-col>
                </el-row>
        </el-dialog>
        <div class="userimg">
            <img :src="imageUrl" v-if="imageUrl" class="im"></img>
            <input type="file" @change="upload()" ref="up" style="display:none" name="upload"></input>
            <el-button @click="uploadimg" class="d" v-if="!imageUrl"><i class="el-icon-plus"></i></img></el-button>
            <el-button @click="uploadimg" v-if="imageUrl">修改图片</el-button>
        </div>
        <div class="m">
            个人资料
           <el-divider></el-divider>
           <el-row>
               <el-col :span="2" class="mes">
                   用户名
               </el-col>
               <el-col :span="2" :offset="4">
                   {{user.username}}
               </el-col>    
               <el-col :span="2" :offset="10">
                   <el-link type="success" @click="cc">编辑</el-link>
               </el-col>
           </el-row>
           <br>
           <el-row>
               <el-col :span="2" class="mes">
                昵称：
               </el-col>
               <el-col :span="2" :offset="4">
                   {{user.nickname}}
               </el-col>    
               <el-col :span="2" :offset="10">
                   <el-link type="success" @click="cc">编辑</el-link>
               </el-col>
           </el-row>
           <br>
           <el-row>
               <el-col :span="2" class="mes">
                单身：
               </el-col>
               <el-col :span="2" :offset="4">
                   {{bach(user)}}
               </el-col>    
               <el-col :span="2" :offset="10">
                   <el-link type="success" @click="cc">编辑</el-link>
               </el-col>
           </el-row>
           <br>
           <el-row>
               <el-col :span="2" class="mes">
                毕业院校
               </el-col>
               <el-col :span="2" :offset="4">
                   {{user.school}} 
               </el-col>    
               <el-col :span="2" :offset="10">
                   <el-link type="success" @click="cc">编辑</el-link>
               </el-col>
           </el-row>
           <br>
           <el-row>
               <el-col :span="2" class="mes">
                积分
               </el-col>
               <el-col :span="2" :offset="4">
                   {{user.score}} 
               </el-col>    
               <el-col :span="2" :offset="10">
                   <el-link type="success" @click="cc">编辑</el-link>
               </el-col>
           </el-row>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import Util from "@/js/util.js"
export default {
    data(){
            return{
                imageUrl:'',
                user:{},
                userdia:false,
                nickname:"",
                sex:0,
                school:"",              
            }
    },
    methods:{
        submit(){
            axios({
                method:"post",
                url:"/api/user/upuser",
                data:{
                    username:sessionStorage.getItem("username"),
                    nickname:this.nickname,
                    sex:this.sex,
                    school:this.school
                }
            }).then(response=>{
                this.handleClose();
            })
        },
        handleClose(){
                this.userdia=false;     
                   },
        cc(){
            this.userdia=true;
        },
        uploadimg(){
           this.$refs.up.click();
        },
        upload(){
            var up=new FormData();
            up.append("name",this.$refs.up.files[0]);
           axios.post("/api/user/upload",up).then(response=>{
              this.imageUrl='/api/'+response.data;
              var data={
               img:this.imageUrl,
               name:sessionStorage.getItem("username")
              }
              Util.$emit("im",this.imageUrl);
              axios.post("/api/user/updateimg",data)
           })
        }
    },
    computed:{
     bach(){
            return function(a){
            if(a.bach=="3"){
                return '未知'
            }else if(a.bach==1){
                return '男';
            }
            else{
                return '女';
            };
        }
        }
    },
    mounted(){
        var data={
            name:sessionStorage.getItem("username")
        }
         axios.post("/api/user/getuserimg",data).then(response=>{
           this.imageUrl=response.data;
         })
         axios.post("/api/user/getuser",data).then(response=>{
             this.user=response.data
         })
         document.body.style.overflow="auto"
    }
}
</script>
<style scoped>
.m{
    width: 70%;
    float: left;
    margin-left:20%;
    margin-top:-100px;
}
.im{
    width: 110px;
    height: 110px;
}
.d{
    margin-left:25%;
    margin-top:27%;
    border-style: none;
}
.userimg{ 
    width: 10%;
    padding-bottom:10%;
    height: 0;
    border-style: dashed;
    border-width: 1px;
    border-color: gray;
}
</style>