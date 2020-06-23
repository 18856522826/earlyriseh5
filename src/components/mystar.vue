<template>
    <div>
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
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
            blog:[],
            user:[]
        }
    },
    methods:{

    },
    mounted(){
        axios({
            method:"post",
            url:"/api/blog/getstarlist",
            data:{
                uid:sessionStorage.getItem("username")
            }
           }).then(response=>{
            this.blog=response.data.blog;
            this.user=response.data.user;
        })
    }
}
</script>
<style scoped>

</style>