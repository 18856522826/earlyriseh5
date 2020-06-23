<template>
    <el-card style="width:70%;margin-left:15%">
        <div slot="header" class="clearfix">
    <span>登录系统</span>
  </div>
    <div style="text-align:center">
       用户名<el-input v-model="user"></el-input><br><br>
       密码<el-input v-model="password" type="password"></el-input>
       <br><br>
       <el-button type="success" style="margin:0 auto;width:200px;" @click="submit" >登录</el-button>
    </div>
    </el-card>
</template>
<script>
import axios from "axios"
import router from "@/router/index"
export default {
    data(){
        return{
            user:"",
            password:""
        }
    },
    methods:{
        submit(){
            axios({
                method:"post",
                url:"/api/user/adminlogin",
                data:{
                    username:this.user,
                    password:this.password
                }
            }).then(response=>{
                if(response.data.if==0){
                    this.$message.error('用户名或密码错误');
                }else{
                    sessionStorage.setItem("admin",response.data.aid)
                    router.push("/admain")
                }
            })
        }
    }
}
</script>
<style scoped>

</style>