<template>
<div>
<el-container style="float:left;width:60%;margin-left:10%;">
    <el-header >
        <el-card>
        <img v-bind:src="user.uimg" style="width:40px;height:40px">
        <span style="color:gray;font-size:20px;">{{user.username}}</span>
        </el-card>
    </el-header>
    <el-main >
        <el-card>
            <p style="font-size:30px;font-weight:bold">{{question.qname}}</p>
            <el-button  size="mini" type="primary">{{question.qtype}}</el-button>
            <el-divider ></el-divider>
            <div v-html="question.qContent">
            </div>
            <el-button icon="el-icon-apple" @click="good" ref="pra">点赞 &#32;{{goods}}</el-button>
            <el-button icon="el-icon-star-off" @click="star">{{startxt}}</el-button>
            <el-button icon="el-icon-paperclip" @click="share">分享</el-button>
            <p style="margin-left:10px;color:gray;font-size:10px">访问量:{{access}}</p>
            <p style="margin-left:10px;color:gray;font-size:10px">积分:{{question.score}}</p>
        </el-card>
        <el-card v-for="(qcom,index) in coms" :key="qcom.qcomid">
          <el-row> 
              <el-col :span="2"><img v-bind:src="users[index].uimg" style="width:40px;height:40px">
              </el-col>
              <el-col :span="4">{{users[index].username}}</el-col>
              <el-col v-show="qcom.ifsign==1" :span="2" :offset="15"><el-tag>已采纳</el-tag></el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset="4">{{qcom.qcontent}}
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="4" :offset="19" ><el-button type="primary" @click="ok(qcom.qcomid)" v-show="ifsign">采纳</el-button>
            </el-col>
            </el-row>
        </el-card>
        <p>评论</p>
        <el-card>
            <el-input placeholder="请输入你的评论" type="textarea" v-model="comment"></el-input>
            <el-button @click="comm">发表</el-button>
        </el-card>
    </el-main>
</el-container>
<el-card style="width:20%;height:300px;float:left;text-align:center">
    <img v-bind:src="user.uimg" style="width:100px;height:100px"><br>
    <p style="font-weight:bold;font-size:20px">{{user.username}}</p>
    <el-button type="primary" @click="att()">{{attention}}</el-button>
    <el-button plain @click="mess">私信</el-button>
     <el-divider ></el-divider>
    </el-card>
</div>
</template>
<script>
import axios from "axios"
import router from "@/router/index"
import Util from "@/js/util.js"
export default {
    data(){
        return{
            question:{},
            user:{},
            qid:this.$route.query.qid,
            goods:0,
            ifgood:null,
            ifatt:null,
            ifcollect:null,
            attention:"",
            startxt:"",
            access:0,
            comment:"",
            coms:[],
            users:[],
            ifsign:true

        }
    },
    methods:{
        mess(){
            Util.$emit("mdia",this.user.username)
        },
        ok(a){
            axios({
                method:"post",
                url:"/api/question/ok",
                data:{
                    uid:this.user.uid,
                    qid:this.question.qid,
                    score:this.question.score,
                    qcomid:a
                }
            }).then(response=>{
                router.go(0);
            })
        },
        comm(){
            axios({
                method:"post",
                url:"/api/question/setqcomment",
                data:{
                    username:sessionStorage.getItem("username"),
                    qid:this.question.qid,
                    content:this.comment
                }
            }).then(response=>{
                if(response.data==1){
                    this.$message({
                    message: '发布成功',
                      type : 'success'
                         });
                         axios({//评论更新
                             method:"post",
                            url:"/api/question/getqcomment",
                            data:{
                                qid:this.question.qid
                                }
                            }).then(response=>{
                              var a= this.coms.length;
                              var b=response.data.qcom.length;
                                for(var i=a;i<b;i++){
                                    this.coms.push(response.data.qcom[i]);
                                    this.users.push(response.data.user[i]);
                                }
                                })
                    
                }
            })
        },
        good(){
            if(this.ifgood==false){
            axios({
                method:"post",
                url:"/api/question/ingood",
                data:{
                    qid:this.qid,
                    username:sessionStorage.getItem("username")
                }
            }).then(response=>{
                    this.getgg(response,this.qid)
                if(response.data==0){
                    this.$message.error('请不要重复点赞');
                }  
            })
            }else{
                axios({
                    method:"post",
                    url:"/api/question/delgood",
                    data:{
                    qid:this.qid,
                    username:sessionStorage.getItem("username")
                    }
                }).then(response=>{
                this.getgg(response,this.qid)
                })
            }
        },
        star(){
            if(!this.ifcollect){
                axios({
                method:"post",
                url:"/api/question/setqcollect",
                data:{
                    qid:this.question.qid,
                    uid:sessionStorage.getItem("username")
                }
            }).then(response=>{
               this.getcoll(response,this.question.qid)
            })
            }else{
                axios({
                    method:"post",
                    url:"/api/question/delqcollect",
                    data:{
                        qid:this.question.qid,
                        uid:sessionStorage.getItem("username")
                    }
                }).then(response=>{
                    this.getcoll(response,this.question.qid)
                })
            }
            

        },
        share(){

        },
        att(){
            if(!this.ifatt){
               axios({
                    method:"post",
                    url:"/api/blog/attention",
                    data:{
                        left:sessionStorage.getItem("username"),
                        right:this.user.uid 
                    }
                }).then(response=>{
                    this.gett();
                })
            }else{
                axios({
                    method:"post",
                    url:"/api/blog/delattention",
                    data:{
                        left:sessionStorage.getItem("username"),
                        right:this.user.uid
                    }
                }).then(response=>{
                    this.gett();
                })
            }

        },
        getgg(response,a){
            axios({
            method:"post",
            url:"/api/question/getgood",
            data:{
                qid:a,
                username:sessionStorage.getItem("username")
            }
        }).then(response=>{
            this.goods=response.data.good
            this.ifgood=response.data.if
        })
        },
        gett(){
            axios({
            method:"post",
            url:"/api/blog/getattention",
            data:{
                left:sessionStorage.getItem("username"),
                right:this.user.uid
            }
            }).then(response=>{
            if(response.data==1){
                   this.attention="已关注";
                   this.ifatt=true;
                }else{
                   this.attention="关注";
                   this.ifatt=false;
                }
        })
        },
        getcoll(response,a){
            axios({
            method:"post",
            url:"/api/question/getqcollect",
            data:{
                qid:a,
                uid:sessionStorage.getItem("username")
            }
        }).then(response=>{
            if(response.data==1){
                this.startxt="已收藏",
                this.ifcollect=true;
            }else{
                this.startxt="收藏",
                this.ifcollect=false;
            }
        })
        }
    },
    mounted(){
        var a=this.$route.query.qid;
        var b=this.$route.query.uid;
        console.log(a);
        axios({//评论更新
            method:"post",
            url:"/api/question/getqcomment",
            data:{
                qid:a
            }
            }).then(response=>{
                console.log(response.data.qcom)
                this.coms=response.data.qcom;
                this.users=response.data.user
            })
        axios({//访问量加一
            method:"post",
            url:"/api/question/inqaccess",
            data:{
                qid:a
            }
        }).then(response=>{
            axios({
                method:"post",
                url:"/api/question/getqaccess",
                data:{
                    qid:a
                }
            }).then(response=>{
                this.access=response.data
            })
        })
        axios({
            method:"post",
            url:"/api/question/getgood",
            data:{
                qid:a,
                username:sessionStorage.getItem("username")
            }
        }).then(response=>{
            this.goods=response.data.good
            this.ifgood=response.data.if
        })
        axios({
            method:"post",
            url:"/api/question/getquestion",
            data:{
                qid:a
            }
        }).then(response=>{
            if(response.data.bool==1){
                this.ifsign=false
            }
            this.question=response.data
        })
        axios({
            method:"post",
            url:"/api/user/getuserbyid",
            data:{
                id:b
            }
        }).then(response=>{
            this.user=response.data
        })
        axios({
            method:"post",
            url:"/api/blog/getattention",
            data:{
                left:sessionStorage.getItem("username"),
                right:b 
            }
        }).then(response=>{
            if(response.data==1){
                   this.attention="已关注";
                   this.ifatt=true;
                }else{
                   this.attention="关注";
                   this.ifatt=false;
                }
        })
        axios({
            method:"post",
            url:"/api/question/getqcollect",
            data:{
                qid:a,
                uid:sessionStorage.getItem("username")
            }
        }).then(response=>{
            if(response.data==1){
                this.startxt="已收藏",
                this.ifcollect=true;
            }else{
                this.startxt="收藏",
                this.ifcollect=false;
            }
        })
    }
}
</script>
<style>
</style>