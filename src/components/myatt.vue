<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>我的关注</span>
        </div>
        <div v-for="(user,index) in users">
            <el-row>
                <el-col :span="3" :offset="1"><img v-bind:src="user.uimg" style="width:40px;height:40px;"></el-col>
                <el-col :span="2" style="margin-top:10px">{{user.username}}</el-col>
                <el-col :span="4" :offset="14"><el-button @click="delattention(user.uid,index)">取消关注</el-button></el-col>
            </el-row>
            <el-divider></el-divider>
        </div>
    </el-card>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            users:[],
        }
    },
    methods:{
        delattention(uid,index){
            axios({
                    method:"post",
                    url:"/api/blog/delattention",
                    data:{
                        left:sessionStorage.getItem("username"),
                        right:uid
                    }
                }).then(response=>{
                    this.$message({
                 message: '删除成功',
                 type: 'success'
                    });
                    this.users.splice(index,1);
                })
        }
    },
    mounted(){
        axios({
            method:"post",
            url:"/api/user/getmyatt",
            data:{
                username:sessionStorage.getItem("username")
            }
        }).then(response=>{
            this.users=response.data.user
        })
    }
}
</script>
<style scoped>

</style>