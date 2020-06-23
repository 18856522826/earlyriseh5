<template>
    <div>
        <el-carousel :interval="4000" type="card" height="200px">
                 <el-carousel-item>
                 <img src="https://pic.images.ac.cn/image/5e9ff44113516.html">
                 </img>
                </el-carousel-item>
                <el-carousel-item>
                <img src="https://pic.images.ac.cn/image/5e9ff443b09c4.html">
                </img>
                </el-carousel-item>
                <el-carousel-item>
                <img src="https://pic.images.ac.cn/image/5e9ff445086a9.html">
                </img>
                </el-carousel-item>
        </el-carousel>
    <div style="width:70%;float:left">
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
    <div style="width:25%;float:left;margin-left:2%">
      <el-card>
        <div slot="header" class="clearfix">
          <span>作者榜</span>
        </div>
        <div v-for="(a,index) in authors" :key="index">
          <el-row>
            <el-col :span="5">
          <img v-bind:src="a.uimg" style="width:40px;height:40px;">
            </el-col>
            <el-col :span="4">
                  <div style="margin-top:10px">{{a.nickname}}</div>
            </el-col>
            <el-col :span="4" :offset="8"><el-button @click="sub(a.username)">私信</el-button></el-col>
          </el-row>
           <el-divider ></el-divider>
        </div>
    </el-card>
    <el-card>
          <div slot="header" class="clearfix">
          <span>常用网站</span>
        </div>
        <div v-for="(web,index) in websites" :key="index">
        <el-link :href="web.href" type="primary" target="_blank">{{web.title}}</el-link>
        <el-divider ></el-divider>
        </div>
      </el-card>
    </div>
    </div>
</template>
<script>
import axios from "axios"
import router from '@/router/index'
import Util from "@/js/util.js"
export default {
    data(){
        return{
            blog:[],
            user:[],
            count:0,
            authors:[],
            websites:[
              {
                href:"https://juejin.im/",
                title:"掘金"
              },{
                href:"https://segmentfault.com/",
                title:"思否"
              },{
                href:"https://www.csdn.net/",
                title:"csdn"
              },
              ]
        }
    },
    methods:{
      sub(mes){
        Util.$emit("mdia",mes)
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
      axios({
        method:"post",
        url:"/api/user/gettopuser",
        data:{}
      }).then(response=>{
        console.log(response.data.user)
        this.authors=response.data.user;
      })
     axios({
      method:"post",
      url:"/api/blog/getnewblog",
      data:{
        count:this.count
      }
      }).then(response=>{
        this.blog=response.data.blog
        this.user=response.data.user
        
      })
    }
}
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>