<template>
<div>
  <el-menu :default-active="activeIndex" mode="horizontal" @select="select" style="width:70%">
            <el-menu-item index="1">全部</el-menu-item>
            <el-menu-item index="2">我关注的</el-menu-item>
         </el-menu>
         <div  class="posts">
         <br>
         <div  v-for="(post,index) in posts" :key="post.postid" style="width:70%">
             <img v-bind:src="names[index].uimg" style="width:50px;height:50px;float:left;margin-right:30px">
             <router-link type="success" :to="{path:'/main/bar/post',query:{zid:post.postid,uid:post.uid}}" style="color:black; text-decoration: none;font-size:20px;font-weight:bold;
             ">{{post.postname}}</router-link>
             <p style="color:gray">{{names[index].username}} {{post.cTime}}</p>
             <el-button @click="bar(barnames[index])" size="mini" type="info" plain style="position:absolute;margin-left:45%;margin-top:-5%">{{barnames[index].barname}}</el-button>
             <el-divider></el-divider>
         </div>
         </div>
         </div>
</template>
<script>
import axios from "axios"
import router from "@/router/index"
export default {
    data(){
        return{
            activeIndex: '1',
            posts:[],
            names:[],
            barnames:[],
            count:0,
            sort:1,
            bool:true
        }
    },
    methods:{
        bar(bb){
            router.push({
                 name:"bartm",
                 query:{
                     data:JSON.stringify(bb)
                 }
            })
        },
            select(key,keypath){
                var d=key;
                switch(d){
                   case '1':{
                        this.getallpost();
                        break;
                   }
                   case '2':{
                       this.getattpost();
                        break;
                   }
                      
               }
            },
            getattpost(){
                this.count=0;
                this.sort=2;
                this.bool=true;
                axios({
                    method:"post",
                    url:"/api/post/getattpost",
                    data:{
                        count:this.count,
                        username:sessionStorage.getItem("username")
                       }
                }).then(response=>{
                    this.expand(response);
                })
            },
            getallpost(){
                this.count=0;
                this.sort=1;
                this.bool=true;
                axios({
                    method:"post",
                    url:"/api/post/getallpost",
                    data:{
                        count:this.count
                       }
                }).then(response=>{
                    this.expand(response);
                })
            },
            expand(response){
                var pl=this.posts.length;
                    var nl=this.names.length;
                    for(var i=0;i<pl;i++){
                        this.posts.pop();
                        this.names.pop();
                        this.barnames.pop()
                    }
                    for(var j=0;j<response.data.post.length;j++){
                            this.posts.push(response.data.post[j]);
                            this.names.push(response.data.name[j]);
                            this.barnames.push(response.data.barname[j])
                    } 
                    this.count++;
            },
            expandL(response,self){
            if(response.data.post[0]!=null){
              self.count++;
              self.bool=true;
              for(var i=0;i<response.data.post.length;i++){
                    self.posts.push(response.data.post[i]);
              }
               for(var j=0;j<response.data.name.length;j++){
                   self.names.push(response.data.name[j]);
                   self.barnames.push(response.data.barname[j])
                }
              }
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
                    url:"/api/post/getallpost",
                    data:{
                        count:self.count
                    }
                }).then(response=>{
                    self.expandL(response,self);
                })
            }else if(self.sort==2){
                axios({
                    method:"post",
                    url:"/api/post/getattpost",
                    data:{
                        count:self.count,
                        username:sessionStorage.getItem("username")
                    }
                }).then(response=>{
                    self.expandL(response,self);
                })
            }
          }
         },1000)
        axios({
            method:"post",
            url:"/api/post/getallpost",
            data:{
                count:this.count
            }
        }).then(response=>{
            this.count++;
            this.posts=response.data.post,
            this.names=response.data.name,
            this.barnames=response.data.barname
        })
    }
}
</script>
<style>
.posts{
    width: 100%;
}
</style>