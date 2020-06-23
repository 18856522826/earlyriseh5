<template>
    <div>
        <el-card v-for="(post,index) in posts" :key="post.pid">
                    <el-row>
                        <el-col :span="4">
                            <el-link @click="enter(post.postid,post.uid)" class="title">{{post.postname}}</el-link>
                        </el-col>
                        <el-col :span="2">
                            <el-tag size="mini">{{bars[index].barname}}</el-tag>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="2" :offset="18">
                            <el-link style="margin-top:-5px" type="danger" size="mini" plain @click="del(post.postid,index)">删除</el-link>
                        </el-col>
                        <el-col :span="4" >
                            <div style="color:gray;font-size:10px">{{post.cTime}}</div>
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
            posts:[],
            bars:[],
            count:0,
            bool:true
        }
    },
    methods:{
        enter(zid,uid){
            router.push({
                name:"post",
                query:{
                    zid:zid,
                    uid:uid
                }
            })
        },
        del(pid,index){
            axios({
                method:"post",
                url:"/api/post/delpost",
                data:{
                    pid:pid
                }
            }).then(response=>{
                this.posts.splice(index,1);
                this.bars.splice(index,1);
            })
        }
    },
    mounted(){
        axios({
            method:"post",
            url:"/api/post/getmypost",
            data:{
                username:sessionStorage.getItem("username"),
                count:this.count
            }
        }).then(response=>{
            console.log(response)
            this.posts=response.data.post,
            this.bars=response.data.bar,
            this.count++;
        })
    }
}
</script>
<style scoped>
.title{
    color:black
}
</style>