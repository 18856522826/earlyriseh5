<template>
        <el-container class="nav">
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="Breadcrumb">
                <el-breadcrumb-item :to="{ path:'/main/bar/fristbar'}">贴吧首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(bread,key) in breads" :key="key">{{bread.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-input class="serach"  v-model="input" ></el-input>
            <el-button @click="serbar()">贴吧搜索</el-button>
            <el-button @click="serpost()">帖子搜索</el-button>
        </el-header>
        <el-main>
        <router-view></router-view>
        </el-main>
        </el-container>
</template>
<script>
import Axios from 'axios'
import router from "@/router/index"
export default {
    data(){
        return {
            input:'',
            breads:[],
            url:''
        }
    },
    methods:{
        serbar(){
             router.push({
                 name:'searchbar',
                 query:{
                    input:this.input
                 }}).catch(err => {err})
        },
        serpost(){
            router.push({
                name:'searchpost',
                query:{
                    input:this.input
                }
            }).catch(err => {err})
        }
    },
    mounted(){
        var url=this.$route.path;
    }
}
</script>
<style scoped>
.nav{
    margin-top: -20px;
    margin-left: 10%;
}
.serach{
    margin-left:10%;
    width: 400px;
}
</style>