<template>
    <div>
         <el-card class="box-card">
            <div slot="header">
                <span>帖子</span>
            </div>
            <div  v-for="(post,index) in posts" :key="post.postid" style="width:70%">
             <img v-bind:src="names[index].uimg" style="width:50px;height:50px;float:left;margin-right:30px">
             <router-link type="success" :to="{path:'/main/bar/post',query:{zid:post.postid,uid:post.uid}}" style="color:green; text-decoration: none;font-size:20px;font-weight:bold;
             ">{{post.postname}}</router-link>
             <p style="color:gray">{{names[index].username}} {{post.cTime}}</p>
                  <el-divider></el-divider>
            </div>
            <div v-show="posts[0]==null" class="null">
                没有搜索到你要的帖子
            </div>
          </el-card>
    </div>
</template>
<script>
import Axios from 'axios'
import router from '@/router/index' 
export default {
    data(){
        return{
            posts:[],
            names:[],
            input:this.$route.query.input,
            url:''
        }
    },
    beforeRouteEnter(to,from,next){
            var a =to.query.input;
           Axios({
                method:'post',
                url:"/api/post/getpostbyInput",
                data:{
                    input:a
                }
            }).then(response=>{
                console.log(response.data)
                 next(vm=>{
                        vm.input=a;
                        vm.posts=response.data.posts
                        vm.names=response.data.name
                 });
                
            })
    },
    beforeRouteUpdate (to,from,next){
           this.input=to.query.input;
           Axios({
                method:'post',
                url:"/api/post/getpostbyInput",
                data:{
                    input:this.input
                }
            }).then(response=>{
                this.posts=response.data.posts;
                this.names=response.data.name
            })
            console.log("组件被复用")
            next();
    },
}
</script>
<style scoped>
.null{
    margin-left:40%; 
}
.postname{
    font-size: 20px;
}
.name{
    color: gray;
}
</style>