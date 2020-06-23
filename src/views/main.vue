<template>
 <el-container>
     <el-dialog center :visible.sync="mesdialog" :before-close="mclose" top="10px">
         <div slot="title" class="mest">
             {{friendname}}
              <el-divider></el-divider>
         </div>
         <div class="chatmain">
         <div v-for="(s,index) in sum" :key="index">
             <div >
                <div style="background-color:#f6f6f6;border-radis:2">
                    <el-row>
                        <el-col :span="15" :offset="1">{{ctext(s)}}</el-col>
                        <el-col :span="7" :offset="1">{{ifmy(s)}}</el-col>
                    </el-row>
                </div>
             </div>
             <br>
         </div>
         </div>
         <el-divider></el-divider>
         <div class="chatinput">
             <el-input type="textarea" v-model="chat"></el-input>
             <br><br>
            <el-button tyoe="primary" size="small" style="margin-left:90%" @click="send(friendname)">发送</el-button>
         </div>
     </el-dialog>
<el-dialog :visible.sync="dialogVisible" class="ddd" :before-close="handleClose"
     title="登录">
     
  <div class=bod>
    <div class="tt">用户名</div>
    <br/>
    <el-input v-model="input" size="small" placeholder="请输入内容" class="in" ></el-input>
    <div class="tt">密码</div><br/>
    <el-input v-model="pas" size="small" placeholder="请输入密码" class="in" show-password ></el-input><br/>
    <el-button type="success" class="bb1" @click="login">登录</el-button><br/>
    <el-button type="primary" plain class="bb2" @click="regit">注册新账号</el-button>
  </div>
</el-dialog>
<regs ref="reg"></regs><!--注册组件 -->
<el-dialog :visible.sync="bardialog"  :before-close="handleClose" title="创建贴吧">
<div>
<div class="avt">
    <img :src="barimageUrl" v-if="barimageUrl" class="avtim"></img>
    <i v-if="!barimageUrl" class="el-icon-plus"></i>
</div>
<input type="file" @change="upload()" ref="up" style="display:none" name="upload"></input>
<el-button @click="uploadimg()">上传图片</el-button>
    <el-input placeholder="请输入贴吧名" class=bari-n v-model="barname"></el-input>
    <el-input v-model="barcontent" placeholder="请输入贴吧简介" class=bari type="textarea" :rows="5"></el-input>
    <el-button@click="barsubmit()">确定</el-button>
</div>
</el-dialog>
     <el-header class="h1">
         <el-row >
         <el-col :span="4">
             <div>
                 <el-image :src="url" class="logo"></el-image>
             </div>
              </el-col>
              <el-col :span="6">
                <div> 
                 <el-link class="lin" @click="index(1)" :underline="false">首页</el-link>
                 <el-link class="lin" @click="index(2)"  :underline="false">博客</el-link>
                 <el-link class="lin" @click="index(3)"  :underline="false">贴吧</el-link>
                 <el-link class="lin" @click="index(4)" :underline="false">问答</el-link>
                 <el-link class="lin" @click="index(5)" :underline="false">工具</el-link>
                 </div>
              </el-col>
              <el-col :span="6">
                <el-input size="small" placeholder="搜索问题或关键字" class="search" 
                suffix-icon="el-icon-search"></el-input>
              </el-col>
              <el-col :span="6" :offset="2">
                  <div  v-if="islogin">
                <el-dropdown @command="bardialog_m">
                <el-button class="creat" >
                     创建<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="qwrite" >提问题</el-dropdown-item>
                    <el-dropdown-item command="wblog">写博客</el-dropdown-item>
                    <el-dropdown-item>记笔记</el-dropdown-item>
                    <el-dropdown-item command="ctb">创贴吧</el-dropdown-item>
            </el-dropdown-menu>
                </el-dropdown>
                <el-popover
                    placement="bottom"
                    width="400"
                    trigger="click"
                    title="我的私信"
                    >
                    <el-button @click="mdia(user.username)" v-for="(user,index) in users" :key="user.uid" style="width:100%;margin: 0 auto">
                        <el-row>
                            <el-col :span="4">
                                <img v-bind:src="user.uimg" style="width:40px;height:40px">
                            </el-col>
                            <el-col :span="4">
                                {{user.username}}
                            </el-col>
                        </el-row>
                    </el-button>
                <el-button slot="reference" icon="el-icon-message" ></el-button>
                </el-popover>
                <el-dropdown class="uu" @command="lgout">
                <el-button class="user" @click="mycenter"><el-image :src="imageUrl" class="userimg"/></el-button>
                <el-dropdown-menu slot="dropdown"> 
                    <el-dropdown-item command="q" :disabled="ifsign">{{sign}}</el-dropdown-item>
                    <el-dropdown-item command="a">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                </div>
                <div class="using" v-if="!islogin">
                  <el-button plain class="log" @click="dialog">立即登录</el-button>
                  <el-button type="primary"  class="reg" @click="regit">立即注册</el-button>
                    </div>
              </el-col>
         </el-row>
     </el-header>
     <el-main style="margin-top:80px">
         <router-view></router-view>
     </el-main>
 </el-container>
</template>
<script>
import axios from "axios"
import router from "@/router/index"
import store from "@/store.js"
import reg from "@/components/register"
import {messort} from "@/js/messort"
import Util from "@/js/util.js"
export default {
    data(){
        return {
            barname:'',
            barcontent:'',
            imageUrl:'',
            bardialog:false,
            url:require("../assets/earlyrise.png"),
            dialogVisible: false,
            input:'',
            pas:'',
            islogin:false,
            barimageUrl: "",
            sign:"",
            ifsign:false,
            socket:null,
            users:[],
            myname:sessionStorage.getItem("username"),
            friendname:"",
            mesdialog:false,
            sum:[],
            chat:""
        }
    },
    components:{
        regs:reg
    },
    methods:{
        ctext(str){
          return str.substring(0,str.length-1)
        },
        ifmy(str){
            //console.log("str"+str)
            if(str.charAt(str.length-1)=='0'){
                
                return this.myname
                
            }else{
               
                return this.friendname
                
            }
        },
        mdia(name){
            this.friendname=name;
            this.mesdialog=true
            var a=this.sum.length;
              for(var i=0;i<a;i++){
                  this.sum.pop()
              }
              console.log(this.sum)
            if(this.sum.length==0){
                axios({
                method:"post",
                url:"/api/mes/getmes",
                data:{
                    username:sessionStorage.getItem("username"),
                    ruser:name
                }
            }).then(response=>{
                //console.log(response.data.myleft+'__'+response.data.yourig)
               var ss=messort(response.data.myleft,response.data.yourig)
               //console.log(ss)
               for(var j=0;j<ss.length;j++){
                this.sum.push(ss[j])
               }
               //console.log(this.sum)
            })
            }
            
        },
        mclose(){
            this.mesdialog=false
        },
        send(ruser){
                if (this.socket.readyState === 1){
                   axios({
                       method:"post",
                       url:"/api/mes/send",
                       data:{
                           username:sessionStorage.getItem("username"),
                           ruser:ruser,
                           content:this.chat
                       }
                   }).then(response=>{
                       this.sum.push(this.chat+"0")
                       this.chat=""
                   })
                }
                else{
                        alert("尚未建立websocket连接");
                }      
        },
        barsubmit(){
            var data={
                img:this.barimageUrl,
                name:this.barname,
                content:this.barcontent,
                user:sessionStorage.getItem("username")
            }
            axios.post("/api/bar/barreg",data)
            .then(response=>{
                if(response.data==1){
                        this.$message({
                            message: '创建贴吧成功',
                            type: 'success'
                         });
                         this.handleClose();
                }else{
                this.$message({
                    message: '创建失败',
                    type: 'warning'
                 });
                }
            })
        } ,  
        regit(){
            this.$refs.reg.show();
             this.dialogVisible=false;
        },
        uploadimg(){
            this.$refs.up.click();
        },
        upload(){
            var up=new FormData();
            up.append("name",this.$refs.up.files[0]);
           axios.post("/api/bar/upload",up).then(response=>{
              this.barimageUrl='/api/'+response.data;
              console.log(this.barimageUrl)
           })
        },
        index(z){
            if(z==1){
                    router.push("/main/earlyrise");
            }else if(z==2){
                router.push("/main/blog");
            }else if(z==3){
                    router.push("/main/bar/fristbar")
            }else if(z==4){
                    router.push("/main/question");
            }else if(z==5){
                
            }
        },
         dialog(){
             this.dialogVisible=true;
        },
        bardialog_m(command){
            if(command=="ctb"){
            console.log("创建贴吧")
            this.bardialog=true;
            }else if(command=="wblog"){
                console.log("写博客");
            router.push("/wblog")
            }else if(command="qwrite"){
                console.log("提问题");
                router.push("/qwrite");

            }   
        },
         handleClose() {
           this.dialogVisible=false;
           this.bardialog=false;

         },
         //发出登录请求的函数
          login(){
          if(this.input==null||this.pas==null){
              this.$message.error('用户名或密码不可为空');
          }else{
            axios({
              method :'post',
              url:"/api/user/login",
              data:{
              username:this.input,
              password:this.pas
          }
          }).then(response=>{
              if(response.data==1){
                sessionStorage.setItem("username",this.input);
                this.handleClose();
                router.go(0);
              }else if(response.data==0){
                  this.$message.error('用户名或密码错误');
              }else if(response.data==3){
                  this.$message.error('用户名没有注册');
              }
          })
          }
      },
      //用户下拉菜单的函数
      lgout(command){
          if(command=="a"){
            sessionStorage.removeItem("username");
          router.go(0);
          }else if(command=="q"){
              axios({
                  method:"post",
                  url:"/api/user/addscore",
                  data:{
                      username:sessionStorage.getItem("username"),
                  }
              }).then(response=>{
                  axios({
                      method:"post",
                      url:"/api/user/ifsign",
                      data:{
                           username:sessionStorage.getItem("username"),
                      }
                  }).then(response=>{
                      if(response.data==1){
                          this.sign="已签到"
                          this.ifsign=true;
                      }else{
                          this.sign="未签到"
                          this.ifsign=false;
                      }
                  })
              })
          }
      },
      mycenter(){
          router.push("/main/mycenter");
      }
    },
    mounted(){
        var self=this;
        store.dispatch('Aincrease',sessionStorage.getItem("username"));
        this.islogin=store.getters.getdata;
        if (this.islogin){
            //this.socket = new WebSocket("ws://101.132.33.35:9090/websocket?"+sessionStorage.getItem("username"));
            this.socket=new WebSocket("ws://127.0.0.1:9090/websocket?"+sessionStorage.getItem("username"));
            this.socket.onerror = err => {
                console.log(err);
            };
            this.socket.onopen = event => {
                console.log(event);
            };
            this.socket.onmessage = mess => {
                console.log(mess.data);
                this.sum.push(mess.data+"1")
            };
            this.socket.onclose = () => {
                console.log("连接关闭");
            };
            axios({
                method:"post",
                url:"/api/mes/getmeslist",
                data:{
                    username:sessionStorage.getItem("username")
                }
            }).then(response=>{
                this.users=response.data.users
            })
        }
        var data={
                 name:sessionStorage.getItem("username")
                 }
                axios.post("/api/user/getuserimg",data).then(response=>{
                this.imageUrl=response.data;
             });
             axios({
                      method:"post",
                      url:"/api/user/ifsign",
                      data:{
                           username:sessionStorage.getItem("username"),
                      }
                  }).then(response=>{
                      console.log(response.data)
                      if(response.data==1){
                          this.sign="已签到"
                          this.ifsign=true;
                      }else{
                          this.sign="签到"
                          this.ifsign=false;
                      }
                  })
         //router.push("/main/earlyrise");
         Util.$on("mdia",function(mes){
            self.mdia(mes)
            })
         Util.$on("im",function(mes){
            console.log("aa")
                self.imageUrl=mes
            })
    },
}
</script>
<style scoped>
.avtim{
    width: 50px;
    height:50px;
}
.avt{
    width: 50px;
    height:50px;
    border-style: dashed;
    border-width: 1px;
    text-align:center; 
    
}
.el-icon-plus{
    margin-top:40%;
}
.bari-n{
    width: 300px;
}
.bari{
    width: 500px;
}
.line{
    margin-top:0;
}
.uu{
    float: left;
}
.user{
    width: 40px;
    height: 40px;
    padding:0%; 
    margin-right: 10px;
    margin-top:10px;
}
.userimg{
    width: 40px;
    height:40px;
}
.creat{
    margin-top:10px;
    width: 80px;
}
.ddd{
    padding: 0%;
}
.log{
margin-top: 10px;
}
.reg{
margin-top: 10px;
}
.search{
    width: 300px;
    margin-top:12px
}
.logo{
    width: 220px;
    height: 60px;
    margin-left:50px;
    margin-top:-10px;
}
.lin{
    width: 40px;
    height: 20px;
    font-size: 17px;
    font-weight: 500;
    margin-top: 15px;
    margin-left: 17px;
    color:#8590a6;
}
.bod{
    text-align: center;
}
.in{
    margin-top:-5px;
    width: 300px;
    }
.tt{
    margin-left: -255px;
    font-weight: bold;
    font-size: 15px;
    margin-top: 5px;
}
.he{
    width: 100%;
    height: 60px;
    margin-top: -20px;
   
    margin-bottom: 30px;
    background-color: #FAFAFA;
    text-align: center;
}
.bb1{
    margin-top: 30px;
    width: 300px;
    background-color: black;
    border-color:black; 
}
.bb2{
    margin-top: 30px;
    width: 300px;
}
.mest{
    font: bold;
    font-size: 25px;
}
.chatmain{
    height: 300px;
    overflow:auto;
}
.chatinput{
    height: 100px;
}
.h1{
    border-bottom-style: solid;
    border-width: 1px;
    border-color: #dcdfe6;
    position:fixed;
    width:100%;
    background-color:white;
    z-index: 1;
}

</style>