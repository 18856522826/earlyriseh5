<template>
    <div >
        <el-card style="width:70%;background-color:#fbfbfd">
            <div slot="header" class="post">
            <div class="u" style="margin-top:-10px">
                <img :src="user.uimg" style="width:40px;height:40px;"></img>
                {{user.username}}
            </div>
                <span>{{post.postname}}</span>
            </div>
            <div v-html="post.postcontent"></div>
            <el-divider></el-divider>
        </el-card>
        <div>
        <el-card v-for="(com,index) in comments" :key="com.ccount" style="width:70%;background-color:#fbfbfd ">
            <div slot="header" >
                <span>{{com.username}}</span>
            </div>
            <el-container><el-aside style="width:10%;"><img v-bind:src="cuser[index].uimg" style="width:40px;height:40px"></el-aside>
                <el-main><div v-html="com.ccontent" style="font-size:14px"></div></el-main></el-container>
                <el-divider></el-divider>
                <!--以上为帖子评论-->

                <!--以下为帖子里评论-->
            <el-row>
                <el-col :span="6" :offset="15">
                <div style="margin-top:-5px;color:gray">{{com.pctime}}</div>
                </el-col>
                <el-col :span="1">
                <el-link @click='del(com.ccid)' style="margin-top:-15px;" v-show="com.username==user.username" type="danger">删除</el-link>
                </el-col>
                <el-col :span="2">
                <el-link @click='cdian(bool[index],index)' style="margin-top:-15px;">回复</el-link>
                </el-col>            
            </el-row>
            <div class="ccom" v-show="bool[index]" style="margin-top:10px;">
            <div>
                <div v-for="(cc,index) in gett(com.ccid,0)" :key="cc.comid">
                    <div>
                     <img v-bind:src='gett(com.ccid,1)[index]' style="width:30px;height:30px;"></img>
                    {{cc.comuname}}:
                    </div>
                    <div style="float:left;margin-left:100px;margin-top:-20px">
                    {{cc.comcontent}}
                    </div>
                    <el-divider></el-divider>
                    </div>
            <el-input style="width:90%" v-model="pcom" ref="scom"></el-input>
            <el-link @click="subcom(com.ccid)" style="margin-left:2%">发表</el-link>
            </div>
            </div>
        </el-card>
        <br><br>
        <p>评论</p>
        <mavon-editor :toolbars="toolbar" ref="md" @change="zz" class="size"/>
        <br><br>
        <el-button plain class="com" @click="scomment">发表</el-button>
        </div>
    </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from "axios"
import router from "@/router/index"
export default {
    data(){
        return{
            pcom:"",
            post:{},
            user:{},
            comment:"",
            comments:[],
            cuser:[],
            dian:false,
            bool:[],
            com_t:{},
            img:{},
            p:this.$route.query.zid,
            toolbar:{
                 imagelink: true,
                 subfield: false,
            }
        }
    },
    components:{
        mavonEditor
    },
    computed:{
        gett(){
            return function(a,num){
                var b=[];
                var c=[];
                var self=this;
                for(var i=0;i<self.com_t.length;i++){
                    if(self.com_t[i].pcommentid==a)
                    b.push(self.com_t[i]);
                    c.push(self.img[i]);
                }
                if(num==0){
                    return b;
                }else{
                    return c;
                }
            }
        },
    },
    methods:{
        del(ccid){
            axios({
                method:"post",
                url:"/api/post/del",
                data:{
                    ccid:ccid
                }
            }).then(response=>{
                if(response.data==1){
                    router.go(0)
                }
            })
        },
        zz(value,render){//文本编辑器的内容
            this.comment=render
        },
        subcom(a){
            console.log(this.post.postid);
            axios({
                method:'post',
                url:"/api/post/setcomment_t",
                data:{
                    pcom:this.pcom,
                    name:sessionStorage.getItem("username"),
                    pid:a,
                    postid:this.post.postid
                }
            }).then(response=>{
                console.log(response.data)
                if(response.data==1){
                     this.$message({
                message: '发布成功',
                type: 'success' 
                });
           axios({
            method:"post",
            url:"/api/post/getcomment_t",
            data:{
                id:this.p
            }
            }).then(response=>{
            var com_tt=response.data.com;
            var ttl=com_tt.length;
            var comt=this.com_t.length;
            console.log(com_tt[comt])
            for(var i=0;i<ttl-comt;i++){
                this.com_t.push(com_tt[i+comt]);
            }
            var img_t=response.data.img;
            var it=img_t.length;
            var iit=this.img.length;
             
             for(var j=0;j<=it-iit;j++){
                 this.img.push(img_t[j+iit]);
             }
              })
                this.$refs.scom
                }
            })
        },
        cdian(a,n){//设置点击显示
            if(a){
               this.$set(this.bool,n,false) 
            }else{
                this.$set(this.bool,n,true) 
            }
            console.log(this.bool[n]);
        },
        scomment(){
            axios({
                method:"post",
                url:"/api/post/comment",
                data:{
                content:this.comment,
                pid:this.post.postid,
                name:sessionStorage.getItem("username")    
                }
            }).then(response=>{
                if(response.data==1){
                    this.$message({
                message: '发布成功',
                type: 'success' 
               });
            axios({//更新评论列表
                method:"post",
                url:"/api/post/getcomment",
                data:{
                    pid:this.p
                }
            }).then(response=>{
               var cc=this.comments.length;
               var ncc=response.data.cc.length;
               for(var i=0;i<ncc-cc;i++){
                   this.comments.push(response.data.cc[i+cc]);
               }
               var cu=this.cuser.length;
               var ncu=response.data.u.length;
               for(var j=0;j<ncu-cu;j++){
                   this.cuser.push(response.data.u[j+cu])
               }
                for(var x=0;x<ncc-cc;x++){
                this.bool.push(false);  
                }
                })
                }
            })
        }
    },
    beforeMount(){
        var p=this.$route.query.zid;
        axios({
                method:"post",
                url:"/api/post/getpost",
                data:{
                    pid:p
                }
            }).then(response=>{
                this.post=response.data
            })
            axios({
                method:"post",
                url:"/api/post/getcomment",
                data:{
                    pid:p
                }
            }).then(response=>{
                this.comments=response.data.cc
                this.cuser=response.data.u
                for(var i=0;i<this.comments.length;i++){
                this.bool.push(false);  
                }
                console.log(response.data.cc)
                })
        axios({
            method:"post",
            url:"/api/post/getcomment_t",
            data:{
                id:p
            }
        }).then(response=>{
            this.com_t=response.data.com;
            this.img=response.data.img
        })
    },
    mounted(){
        var u=this.$route.query.uid;
        axios({
                method:"post",
                url:"/api/user/getuserbyid",
                data:{
                    id:u
                }
            }).then(response=>{
                this.user=response.data
            })
    }
    
}
</script>
<style scoped>
.size{
height: 300px;
width:70%
}
.ccom{
    background-color: #f7f8fa;
}
.com{
    margin-left:90%;
}
.userfoucs{
    float: left;
}
.post{
    text-align: center;
    font-weight: bold;
}
.u{
    float: left;
    width: 100px;
    height: 50px;
}
</style>