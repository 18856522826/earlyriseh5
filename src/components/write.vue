<template>
<div>
    <el-input placeholder="标题" v-model="title"></el-input>
    <mavon-editor  ref="md" @change="zz" class="size" v-model="a"/>
    <el-button @click="submit" >发布</el-button>
    <el-button  @click="draft">存为草稿</el-button>
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
            content:null,
            title:null,
            sampletext:"",
            a:""
        }
    },
    components:{
        mavonEditor
    },
    methods:{
        draft(){
            if(this.content==null||this.title==null){
                this.$message({
                message: '内容不可为空',
                type: 'error' 
                });
            }else{
            axios({
                method:"post",
                url:"/api/blog/draft",
                data:{
                    title:this.title,
                    draft:this.a,
                    short:this.sampletext,
                    user:sessionStorage.getItem("username")
                }
            }).then(response=>{
                console.log(response.data)
                router.push("/main/blog")
            })
            }
        },
        zz(value,render){//文本编辑器的内容
            this.content=render
            var a= render.slice(0,40);
            var s= a.replace(/<.*?>/g,"");
            var str=s.split("");
            var left;
            var rig;
            for(var i=0;i<str.length;i++){//消除图片代码，做出博客的简介
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
            this.sampletext=str.join("");
        },
        submit(){//提交
            if(this.content==null||this.title==null){
                this.$message({
                message: '内容不可为空',
                type: 'success' 
                });
            }else{
            axios({
                method:"post",
                url:"/api/blog/setblog",
                data:{
                    title:this.title,
                    sampletext:this.sampletext,
                    content:this.content,
                    username:sessionStorage.getItem("username")
                }
            }).then(response=>{
               console.log(response.data);
              router.push("/main/blog")
            })
             }
            }
    },
    mounted(){
        var s=this.$route.params.data
        if(s!=null){
            this.a=this.$route.params.data.dracontent;
            this.title=this.$route.params.data.dratit
        }
    }
}
</script>
<style>
.size{
    height: 560px;
}
</style>
