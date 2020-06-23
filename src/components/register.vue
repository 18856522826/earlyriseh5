<template>
    <el-dialog :visible.sync="dialogVisible" class="dia" :before-close="close" title="注册 ">
    <div class="dd">   
     <el-row>
           <el-col :span="2" :offset="6" class="fon">用户名</el-col>
           <el-col :span="9"><el-input v-model="input"  size="small" placeholder="请输入邮箱"></el-input></el-col>
        </el-row><br>
        <el-row>
           <el-col :span="2" class="fon" :offset="6">密码</el-col>
           <el-col :span="9"><el-input v-model="pas1" show-password size="small" placeholder="请输入密码"></el-input></el-col>
        </el-row><br>
         <el-row>
           <el-col :span="2" class="fon" :offset="6">重复密码</el-col>
           <el-col :span="9"><el-input v-model="pas2" show-password size="small" placeholder="请输入密码"></el-input></el-col>
        </el-row><br>
        <el-row>
            <el-col :span="3":offset="6" class="fon">邮箱验证</el-col>
           <el-col :span="5" ><el-input v-model="PIN" style="width:100px" size="small" placeholder="验证码"></el-input></el-col>
           <el-col :span="4"><el-button type="primary" plain size="small" @click="send" :disabled="ss" ref="fs">{{Pmail}}</el-button></el-col>
        </el-row><br>
        <el-row>
            <el-col :offset="6"><el-button plain type="primary" @click="regs" style="width:300px">注册</el-button></el-col>
        </el-row>
    </div>   
    </el-dialog>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
            dialogVisible:false,
            input:"",
            PIN:"",
            pas1:"",
            pas2:"",
            ss:false,
            Pmail:"发送验证码"
        }
    },
    methods:{
        show(){
            this.dialogVisible=true;
        },
        close(){
            this.dialogVisible=false;
            console.log("zzzz")
        },
        send(){
            this.ss=true;
            var data={
                email:this.input
            }
            axios.post("/api/user/mail",data)
           var count=60
            var self=this;
           var time= setInterval(function(){
                self.Pmail="请等待:"+count
                count--;
                if(count==0){
                    clearInterval(time);
                    self.ss=false;
                    self.Pmail="发送验证码"
                    count=60;
                }
            },1000)
        },
        regs(){
            var a=/^\w+@\w*(.com)$/
            if(!this.input.match(a)){
                this.$message({
                 message: '请输入正确的邮箱地址',
                 type: 'warning'
                });
            }else{
            if(this.pas1!=this.pas2){
                this.$message({
                 message: '请输入相同的密码',
                 type: 'warning'
                });
            }else{
                axios({
                    method:"post",
                    url:"/api/user/register",
                    data:{
                        name:this.input,
                        pas:this.pas1,
                        pin:this.PIN                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                    }
                }).then(response=>{
                    var a=response.data;
                    if(a==1){
                        this.close();
                        this.$message({
                        message: '注册成功',
                        type: 'success'
                        });
                     }else if(a==0){
                     this.$message({
                     message: '用户名已经被注册',
                     type: 'warning'
                      });
                    }else if(a==3){
                         this.$message({
                         message: '邮箱验证码不正确',
                         type: 'warning'
                      });
                    }
                })
            }
            }
        }
    }
}
</script>
<style scoped>
.dd{
    margin: 0 auto;
}
.fon{
    font-weight: bold;
    font-size: 5px;
}
</style>