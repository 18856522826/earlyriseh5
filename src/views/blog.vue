<template>
    <div>
      <el-menu :default-active="activeIndex" @select="select" class="left">
            <el-menu-item index="1">最新</el-menu-item>
            <el-menu-item index="2">质量</el-menu-item>
            <el-menu-item index="3">关注</el-menu-item>
         </el-menu>
         <div class="main">
           <el-card v-for="(b,index) in blog" :key="b.bid" class="block">
             <el-link class="title" @click="enter(user[index].uid,b.bid)">{{b.bname}}</el-link>
             <br><br>
             <div style="width:70%;float:left">
               {{b.bshort}}
            </div>
            <div style="">
              <img v-bind:src='user[index].uimg' style="width:80px;height:80px;margin-left:10%"></img>
            </div>
               <el-divider >{{b.btime}}</el-divider>
           </el-card>
         </div>
    </div>
</template>
<script>
import router from "@/router/index"
import axios from "axios"
export default {
  data(){
    return{
        activeIndex: '1',
        blog:[],
        user:[],
        count:0,
        bool:true,
        sort:1
    }
  },
  methods:{
    select(key,keypath){
                var d=key;
                switch(d){
                   case '1':{
                     console.log(1);
                     this.getnewblog();break;
                   };
                   case '2':{
                     console.log(2);
                     this.getmaxblog();break;
                   };
                   case '3':{
                     console.log(3);
                     this.getstarblog();break;
                   };
               }
            },
     enter(value,blog){     
       router.push({
         name:"mblog",
         query:{
           user:value,
           blog:blog
         }
         })
     },          
    getnewblog(){
      this.count=0;
      this.sort=1;
      this.bool=true;
      console.log(this.bool)
      axios({
        method:"post",
        url:"/api/blog/getnewblog",
        data:{
          count:this.count
        }
      }).then(response=>{
        this.expandL(response);
      })
    },
    getmaxblog(){
      this.sort=2;
      this.count=0;
      this.bool=true;
      
      axios({
        method:"post",
        url:"/api/blog/getmaxblog",
        data:{
          count:this.count
        }
      }).then(response=>{
        this.expandL(response);
        });
    }, 
    getstarblog(){
      this.sort=3;
      this.count=0;
      this.bool=true;
      axios({
        method:"post",
        url:"/api/blog/getstarblog",
        data:{
          count:this.count,
          user:sessionStorage.getItem("username")
        }
      }).then(response=>{
        this.expandL(response);
      })
    } ,
    getitblog(){
      axios({
        method:"post",
        url:"/api/blog/getitblog",
      }).then(response=>{
        this.blog=response.data
        
      })
    },
    getotblog(){
      axios({
        method:"post",
        url:"/api/blog/getotblog",
      }).then(response=>{
        this.blog=response.data
        
      })
    },
    expand(response,self){
              if(response.data.blog[0]!=null){
              self.count++;
              self.bool=true;
              for(var i=0;i<response.data.blog.length;i++){
                    self.blog.push(response.data.blog[i]);
              }
               for(var j=0;j<response.data.user.length;j++){
                   self.user.push(response.data.user[j]);
                }
              }
    },
    expandL(response){
      var bl=this.blog.length;
        var ul=this.user.length;
       for(var s=0;s<bl;s++){
         this.blog.pop();
       }
       for(var z=0;z<ul;z++){
          this.user.pop();
       }
        var b=response.data.blog.length//获得新博客数组的长度
        var u=response.data.user.length //获得新用户数组的长度
          for(var i=0;i<b;i++){
            this.blog.push(response.data.blog[i]);
          }
          for(var j=0;j<u;j++){
            this.user.push(response.data.user[j]);
          }
          this.count++;
    }     
  },
  mounted(){
    var self=this;
    window.setInterval(function(){
          var abs=document.body.clientHeight-document.documentElement.clientHeight;
          if(window.scrollY+50>abs&&self.bool==true){
            self.bool=false;
            if(self.sort==1){//判断
            axios({
                method:"post",
                url:"/api/blog/getnewblog",
                data:{
                  count:self.count
                }
            }).then(response=>{
              self.expand(response,self);
            })
            }
            else if(self.sort==2){
              axios({
                method:"post",
                url:"/api/blog/getmaxblog",
                data:{
                  count:self.count
                }
            }).then(response=>{
              self.expand(response,self);
            })
            }else if(self.sort==3){
                axios({
                method:"post",
                url:"/api/blog/getstarblog",
                data:{
                  count:self.count,
                  user:sessionStorage.getItem("username")
                }
            }).then(response=>{
              self.expand(response,self);
            })
            }
          }
    },1000);
    axios({
      method:"post",
      url:"/api/blog/getnewblog",
      data:{
        count:this.count
      }
      }).then(response=>{
        this.blog=response.data.blog
        this.user=response.data.user
        this.count++;
      })
  }
}
</script>
<style scoped>
.left{
  
  width: 10%;
  float: left;
}
.main{
  float: left;
  width: 70%;
  margin-left: 10px;
  min-height: 700px;
}
.title{
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.block{
  margin-bottom: 10px;
}
</style>