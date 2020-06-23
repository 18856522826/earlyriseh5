<template>
        <el-container>
                <el-aside>
                    <el-card style="text-align:center;margin-top:20px">
                    <img v-bind:src='this.name.uimg' class="img" ></img>
                    <p style="font-weight:bold;font-size:20px">{{name.username}}</p>
                    <el-button type="primary"  @click="att(bx)" >{{attention}}</el-button>
                    <el-button plain @click="mess">私信</el-button>
                    <el-divider ></el-divider>
                    <div>
                        <el-row>
                            <el-col :span="4" :offset="7">博客</el-col>
                            <el-col :span="4" :offset="1">4</el-col>    
                        </el-row>
                        <el-row>
                            <el-col :span="4" :offset="7">帖子</el-col>
                            <el-col :span="4" :offset="1">5</el-col>    
                        </el-row>
                        <el-row>
                            <el-col :span="4" :offset="7">问答</el-col>
                            <el-col :span="4" :offset="1">7</el-col>    
                        </el-row>
                        <el-row>
                            <el-col :span="4" :offset="7">获赞</el-col>
                            <el-col :span="4" :offset="1">10</el-col>    
                        </el-row>
                        <el-row>
                            <el-col :span="4" :offset="7">评论</el-col>
                            <el-col :span="4" :offset="1">7</el-col>    
                        </el-row>
                        <el-row>
                            <el-col :span="4" :offset="7">访问</el-col>
                            <el-col :span="4" :offset="1">7</el-col>    
                        </el-row>
                    </div>
                    </el-card>
                </el-aside>
                <el-main>
                    <el-card>
                        <div slot="header" style="text-align:center">
                            <span>{{blog.bname}}</span>
                        </div>
                        <div v-html='blog.bcontent' style="align:center" class="markdown-body">
                        </div>
                        <div>
                            <el-button icon="el-icon-apple" @click="good" ref="pra">点赞 &#32;{{sgood}}</el-button>
                            <el-button icon="el-icon-star-off" @click="star">{{collect}}</el-button>
                            <el-button icon="el-icon-paperclip" @click="share">分享</el-button>
                            <p style="margin-left:10px;color:gray;font-size:10px">访问量:{{acesss}}</p>
                        </div>
                    </el-card>
                    <el-card v-for="(bcom,index) in bcoms" :key="bcom.bcomid">
                        <div style="float:left;font-weight:blod"><img v-bind:src='users[index].uimg' style="width:40px;height:40px"></img>
                            <br>{{users[index].username}}</div>
                        <div style="margin-top:10px;margin-left:100px; color:gray">{{bcom.bcontent}}</div>
                        <br>
                        <el-divider content-position="right" >{{bcom.bctime}}</el-divider>
                    </el-card>
                    <el-card>
                        <el-input v-model="comment" type="textarea" placeholder="想对作者说点什么"></el-input>
                        <br><br>
                        <el-button @click="setbcom">发表评论</el-button>
                    </el-card>
                </el-main>
        </el-container>
    </div>
</template>
<script>
import axios from "axios"
import Util from "@/js/util.js"
import 'github-markdown-css/github-markdown.css'
export default {
    data(){
        return{
            aa:true,
            attt:false,
            blog:{},
            name:{},
            comment:"",
            bcoms:[],
            users:[],
            attention:"关注",
            bx:0, //关注的参数
            sgood:0,
            ifgood:false,
            acesss:0,
            collect:"收藏",
            ifcoll:null,
        }
    },
    methods:{
        mess(){
            Util.$emit("mdia",this.name.username)
        },
        good(){
        if(this.ifgood==false){//判断是否点赞
            axios({
                method:"post",
                url:"/api/blog/ingood",
                data:{
                    bid:this.blog.bid,
                    user:sessionStorage.getItem("username")
                }
            }).then(response=>{
                axios({
                    method:"post",
                    url:"/api/blog/getgood",
                    data:{
                        bid:this.blog.bid,
                        user:sessionStorage.getItem("username")
                    }
                 }).then(response=>{
                    this.sgood=response.data.good;
                    this.ifgood=response.data.if
                    })
            })
             }else{
                 axios({
                     method:"post",
                     url:"/api/blog/degood",
                     data:{
                        bid:this.blog.bid,
                        user:sessionStorage.getItem("username")
                     }
                 }).then(response=>{
                     console.log("取消点赞成功");
                     axios({
                            method:"post",
                            url:"/api/blog/getgood",
                            data:{
                                bid:this.blog.bid,
                                user:sessionStorage.getItem("username")
                                }
                        }).then(response=>{
                                this.sgood=response.data.good;
                                this.ifgood=response.data.if
                         })
                         })
             }
        },
        star(){
            if(this.ifcoll){
                axios({
                    method:"post",
                    url:"/api/blog/delcollect",
                    data:{
                    bid:this.blog.bid,
                    uid:sessionStorage.getItem("username")
                    }
                }).then(response=>{
                     axios({ 
                method:"post",
                url:"/api/blog/getcollect",
                data:{
                    bid:this.blog.bid,
                    uid:sessionStorage.getItem("username")
                }
                }).then(response=>{
                  if(response.data==1){
                    this.collect="已收藏";
                    this.ifcoll=true;
                 }else{
                    this.collect="收藏";
                    this.ifcoll=false;
                 }
                    })
                })
            }else{
            axios({
                method:"post",
                url:"/api/blog/setcollect",
                data:{
                    bid:this.blog.bid,
                    uid:sessionStorage.getItem("username")
                }
            }).then(response=>{
            axios({
                method:"post",
                url:"/api/blog/getcollect",
                data:{
                    bid:this.blog.bid,
                    uid:sessionStorage.getItem("username")
                }
                }).then(response=>{
                  if(response.data==1){
                    this.collect="已收藏";
                    this.ifcoll=true;
                 }else{
                    this.collect="收藏";
                    this.ifcoll=fasle;
                 }
          })
            })
            }
        },
        share(){},
        gett(){
            axios({
            method:"post",
            url:"/api/blog/getattention",
            data:{
                left:sessionStorage.getItem("username"),
                right:this.blog.uid
            }
            }).then(response=>{
                if(response.data==1){
                    console.log("已关注")
                   this.attention="已关注";
                   this.bx=1;
                }else{
                   this.attention="关注";
                   this.bx=0;
                }
            })
        },
        att(a){
            if(a==0){
                axios({
                    method:"post",
                    url:"/api/blog/attention",
                    data:{
                        left:sessionStorage.getItem("username"),
                        right:this.blog.uid 
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
                        right:this.blog.uid
                    }
                }).then(response=>{
                    this.gett();
                })
            }
        },
        setbcom(){
            if(!this.comment){
                this.$message({
                message: '内容不可为空',
                type: 'success' 
                });
            }else{
            axios({
                method:"post",
                url:"/api/blog/setcom",
                data:{
                    bid:this.blog.bid,
                    username:sessionStorage.getItem("username"),
                    content:this.comment
                }
            }).then(response=>{
                this.comment=null;
                axios({
                    method:"post",
                    url:"/api/blog/getbcoms",
                    data:{
                        bid:this.blog.bid,
                        }
            }).then(response=>{
                var b=this.bcoms.length;
                var u=this.users.length;
                var nb=response.data.bcoms.length;
                var nu=response.data.users.length;
                for(var i=0;i<nb-b;i++){
                    this.bcoms.push(response.data.bcoms[i+b])
                }
                for(var j=0;j<nu-u;j++){
                    this.users.push(response.data.users[j+u])
                }
                 })
            })
        }
        }
    },
    mounted(){
        var a=this.$route.query.blog;
        var b=this.$route.query.user;
        axios({
            method:"post",
            url:"/api/blog/getcollect",
            data:{
                bid:a,
                uid:sessionStorage.getItem("username")
            }
        }).then(response=>{
            if(response.data==1){
                this.collect="已收藏"
                this.ifcoll=true;
            }else{
                this.collect="收藏"
                this.ifcoll=false;
            }
        })
        axios({   //访问量加一
            method:"post",
            url:"/api/blog/inaccess",
            data:{
                bid:a
            }
        }).then(response=>{
            axios({
            method:"post",
            url:"/api/blog/getaccess",
            data:{
                bid:a
            }
            }).then(response=>{
            this.acesss=response.data;
            })
        }),
        
        axios({
            method:"post",
            url:"/api/blog/getgood",
            data:{
                bid:a,
                user:sessionStorage.getItem("username")
            }
        }).then(response=>{
           this.sgood=response.data.good;
            this.ifgood=response.data.if
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
                    console.log("已关注")
                   this.attention="已关注"
                   this.bx=1;
                }else{
                   this.attention="关注"
                   this.bx=0;
                }
            })
        axios({
            method:"post",
            url:"/api/blog/getblog",
            data:{
                id:a
            }
        }).then(response=>{
            this.blog=response.data;
        })
        axios({
            method:"post",
            url:"/api/user/getuserbyid",
            data:{
                id:b
            }
        }).then(response=>{
            this.name=response.data;
            console.log(this.name)
        }),
        axios({
            method:"post",
            url:"/api/blog/getbcoms",
            data:{
                bid:a
            }
        }).then(response=>{
            this.bcoms=response.data.bcoms;
            this.users=response.data.users;
        })
    },
}
</script>
<style scoped>
.img{
 width:100px;
 height:100px;
 margin: 0 auto;
}
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
}
@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>