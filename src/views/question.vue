<template>
<div>
    <div style="width:70%; margin-left:15%">
    <el-link style="text-decoration:none" href="https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3"
    target="_blank"><img src="https://pic2.zhimg.com/v2-6e8fccc8a30e8cf15a90e7a894011579_r.jpg"
       style="width:100%">
    </el-link>
    </div>
    <div style="width:70%;margin-left:15%">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="select" style="width:100%">
            <el-menu-item index="1">最新</el-menu-item>
            <el-menu-item index="2">关注</el-menu-item>
            <el-menu-item index="3">热门</el-menu-item>
         </el-menu>
         <el-card v-for="(qut,index) in questions" :key="qut.qid">
             <el-row>
                 <el-col :span="1">
                    <div style="color:gray">
                         {{qut.qstar}}<br>
                     <small>点赞</small>
                    </div>
                 </el-col>
                 <el-col :span="2">
                    <div style="color:gray">
                         {{qut.qaccess}}<br>
                      <small>浏览</small>
                    </div>
                 </el-col>
                 <el-col :span="7">
                    <small style="color:gray">{{qut.qtime}} 发布</small><br>
                    <el-link style="font-size:15px;color:black" @click="enter(qut.qid,users[index].uid)">{{qut.qname}}</el-link>
                    <el-tag type="primary" size="mini" plain style="margin-left:20px">{{qut.qtype}}</el-tag>
                 </el-col>
                 <el-col :span="4" style="color:green" :offset="10">
                     积分：{{qut.score}}
                 </el-col>
             </el-row>
         </el-card>
    </div>
</div>
</template>
<script>
import axios from "axios"
import router from "@/router/index"
export default {
    data(){
        return{
            activeIndex:'1',
            count:0,
            questions:[],
            users:[],
            bool:true,
            sort:1,
            access:new Map()
        }
    },
    methods:{
        enter(qid,uid){
            router.push({
                name:"qut_data",
                query:{
                    qid:qid,
                    uid:uid
                }
            })
        },
        status(){

        },
        select(key,keypath){
               var d=key;
                switch(d){
                   case '1':{
                     console.log(1);
                     this.getnewqut();break;
                   };
                   case '2':{
                     console.log(2);
                     this.getstarqut();break;
                   };
                   case '3':{
                     console.log(3);
                     this.getmaxqut();break;
                   };
               }
            },
            gg(a){
                console.log(this.access.get(a));
            },
         getaccess(a){
               axios({
                method:"post",
                url:"/api/question/getqaccess",
                data:{
                    qid:a
                },
            }).then(response=>{
               this.access.set(a,response.data)
            })
            },
        getnewqut(){
                this.count=0;
                this.sort=1;
                this.bool=true;
                axios({
                    method:"post",
                    url:"/api/question/getnewqut",
                data:{
                    count:this.count
                    }
                }).then(response=>{
                    this.expandL(response);
                })
            },
            getstarqut(){
                this.count=0;
                this.sort=2;
                this.bool=true;
                axios({
                    method:"post",
                    url:"/api/question/getstarqut",
                    data:{
                    count:this.count,
                    uid:sessionStorage.getItem("username")
                    }
                }).then(response=>{
                    this.expandL(response);
                })
            },
            getmaxqut(){
                this.count=0;
                this.sort=3;
                this.bool=true;
                axios({
                    method:"post",
                    url:"/api/question/getmaxqut",
                    data:{
                    count:this.count,
                    uid:sessionStorage.getItem("username")
                    }
                }).then(response=>{
                    this.expandL(response);
                })
            },
        expand(response,self){
              if(response.data.qut[0]!=null){    
              self.count++;
              self.bool=true;
              for(var i=0;i<response.data.qut.length;i++){
                  console.log("zzz")
                    self.questions.push(response.data.qut[i]);
              }
               for(var j=0;j<response.data.user.length;j++){
                   self.users.push(response.data.user[j]);
                }
              }
    },
    expandL(response){
                    var pl=this.questions.length;
                    var nl=this.users.length;
                    for(var i=0;i<pl;i++){
                        this.questions.pop();
                        this.users.pop();
                    }
                    for(var j=0;j<response.data.qut.length;j++){
                            this.questions.push(response.data.qut[j]);
                            this.users.push(response.data.user[j]);
                    } 
                    this.count++;
    },
    acc(){

    }
    },
    mounted(){
    var self=this;
    window.setInterval(function(){
          var abs=document.body.clientHeight-document.documentElement.clientHeight;
          if(window.scrollY+50>abs&&self.bool==true){
            self.bool=false;
            if(self.sort==1){
                axios({
                method:"post",
                url:"/api/question/getnewqut",
                data:{
                  count:self.count
                }
            }).then(response=>{
              self.expand(response,self);
            })
            }else if(self.sort==2){
                axios({
                method:"post",
                url:"/api/question/getstarqut",
                data:{
                  count:self.count,
                  uid:sessionStorage.getItem("username")
                }
            }).then(response=>{
              self.expand(response,self);
            })
            }else if(self.sort==2){
                axios({
                method:"post",
                url:"/api/question/getmaxqut",
                data:{
                  count:self.count,
                  uid:sessionStorage.getItem("username")
                }
            }).then(response=>{
              self.expand(response,self);
            })
            }
          }
    },1000);
            axios({
                method:"post",
                url:"/api/question/getnewqut",
                data:{
                    count:this.count
                }
            }).then(response=>{
                this.questions=response.data.qut,
                this.users=response.data.user,
                this.count++;
            })
            
    }
}
</script>
<style>
.text{
    text-align: center;
}
</style>