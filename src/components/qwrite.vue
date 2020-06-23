<template>
    <div>
    <el-input placeholder="标题" v-model="title" style="width:60%"></el-input>
    <el-select v-model="type" placeholder="请选择"><!--选择类型-->
    <el-option label="Java" value="Java">Java</el-option>
    <el-option label="Html" value="Html">Html</el-option>
    <el-option label="Javascript" value="Javascript">Javascript</el-option>
    <el-option label="Redis" value="Redis">Redis</el-option>
    <el-option label="Spring" value="Spring">Spring</el-option>
    <el-option label="SQL" value="SQL">SQL</el-option>
    <el-option label="Mybatis" value="Mybatis">Mybatis</el-option>
    <el-option label="C/C++" value="C/C++">C/C++</el-option>
    <el-option label="算法" value="算法">算法</el-option>
  </el-select>
    <el-input v-model="score" placeholder="请输入你的积分" style="width:20%"></el-input>
    <br><br>
             <mavon-editor  ref="md" @change="zz" class="size"/>
             <br>
    <el-button @click="submit" type="success" style="width:10%;margin-left:80%">发布</el-button>
        <div class="mar">
   </div>
    </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from "axios"
import router from "@/router/index"
export default {
    data(){
        return{
            title:null,
            type:null,
            value:"",
            score:null,
            sampletext:""
        }
    },
    components:{
        mavonEditor
    },
    methods:{
        zz(value,rander){
            this.value=rander,
            this.sampletext=value;
        },
        submit(){ 
            var value=this.sampletext;
            if(this.title!=null){
                if(this.type!=null){
                    if(this.score!=null&&this.score>0.01&&this.score<2147483647){
                            var a= value.slice(0,30);
                            var str=a.split("");
                            var left;
                            var rig;
                            for(var i=0;i<str.length;i++){//消除图片代码，做出简介
                                if(str[i]=="!"){
                                    if(str[i+1]=="["){
                                            left=i;
                                            }
                                         }
                                if(left!=null){
                                    if(str[i]=="]"){
                                        rig=i+4;
                                            }
                                        }
                                if(left!=null&&rig!=null){
                                    str.splice(left,rig-left);
                                            }
                                        }
                                var end=str.join("");
                         axios({
                            method:"post",
                            url:"/api/question/setquestion",
                            data:{
                                   title:this.title,
                                   type:this.type,
                                   score:this.score,
                                   username:sessionStorage.getItem("username"),
                                   samplecontent:end,
                                   content:this.value

                                 }
                            }).then(response=>{
                                if(response.data==1){
                                this.$message({
                                    message: '发布成功',
                                    type: 'success'
                                    });
                                router.push("/main/earlyrise")
                                }else{
                                    this.$message.error('您的积分不足');
                                }
                                
                            })       
                    }else{
                        this.$message.error('请输入你的回答积分');
                    }
                }else{
                    this.$message.error('请输入你的问题类别');
                }
            }else{
                this.$message.error('请输入标题');
            }
        }
    }
}
</script>
<style scoped>
.size{
    height: 500px;
}
</style>