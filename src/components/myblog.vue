<template>
<div>
    <el-card v-for="(b,index) in blog" :key="b.bid" class="block">
         <el-row>
                <el-col :span="4"><el-link class="title" @click="enter(user[index].uid,b.bid)">{{b.bname}}
                    </el-link></el-col>
         </el-row>
         <el-row>
                 <el-col :span="2" :offset="18">
                     <el-button type="danger" size="mini" plain @click="del(b.bid,index)">删除</el-button>
                 </el-col>
                 <el-col :span="4" >
                 <div style="color:gray;font-size:10px">{{b.btime}}</div>
                 </el-col>
             </el-row>
           </el-card>
</div>    
</template>
<script>
import axios from "axios"
import router from '@/router/index'
export default {
     data(){
         return{
            count:0,
            blog:[],
            user:[],
            bool:true
         }
     },
     methods:{
         del(bid,index){
             axios({
                 method:"post",
                 url:"/api/blog/delblog",
                 data:{
                     bid:bid
                 }
             }).then(response=>{
                 this.$message({
                 message: '删除成功',
                 type: 'success'
                    });
                this.blog.splice(index,1);
             })
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
            
     },
     mounted(){
         var self=this;
        window.setInterval(function(){
          var abs=document.body.clientHeight-document.documentElement.clientHeight;
          if(window.scrollY+50>abs&&self.bool==true){
              console.log("asdasd")
            self.bool=false;
            axios({
                method:"post",
                url:"/api/blog/getmyblog",
                data:{
                    username:sessionStorage.getItem("username"),
                    count:self.count
                }
            }).then(response=>{
                
                var a=response.data.blog.length;
                if(a!=0){
                for(var i=0;i<a;i++){
                    self.blog.push(response.data.blog[i]);
                    self.user.push(response.data.user[i]);
                }
                self.count++;
                self.bool=true;
                }
                
            })
          }
        },1000)
         axios({
            method:"post",
            url:"/api/blog/getmyblog",
            data:{
                username:sessionStorage.getItem("username"),
                count:this.count
            }
         }).then(response=>{
             this.blog=response.data.blog,
             this.user=response.data.user
             this.count++
         })
     }
}
</script>
<style scoped>
.title{
    color: black;
}
</style>