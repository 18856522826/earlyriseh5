<template>
    <div>
        <el-container>
        <el-aside>
        <el-menu :default-active="activeIndex" @select="select" class="left">
            <el-menu-item index="1">个人资料</el-menu-item>
            <el-menu-item index="2">我的收藏</el-menu-item>
            <el-menu-item index="3">我的关注</el-menu-item>
            <el-menu-item index="4">我的问答</el-menu-item>
            <el-menu-item index="5">我的帖子</el-menu-item>
            <el-menu-item index="6">我的博客</el-menu-item>
            <el-menu-item index="7">我的草稿</el-menu-item>
         </el-menu>
        </el-aside>
        <el-main class="main">
                <router-view></router-view>
        </el-main>
        </el-container>
    </div>
</template>
<script>
import router from "@/router/index" 
export default {
    data(){
        return{
           activeIndex:'1',
        }
    },
    methods:{
        select(key,keypath){
            switch(key){
                case '1':{
                    router.push("/main/mycenter/mydata");
                    break;
                }
                case '2':{
                    router.push("/main/mycenter/mystar");
                    break;
                }
                case '3':{
                    router.push("/main/mycenter/myatt");
                    break;
                }
                case '4':{
                    router.push("/main/mycenter/myqut");
                    break;
                }
                case '5':{
                    router.push("/main/mycenter/mypost");
                    break;
                }
                case '6':{
                    router.push("/main/mycenter/myblog");
                    break;
                }
                 case '7':{
                    router.push("/main/mycenter/mydraft");
                    break;
                }
                
            }
        }
    },
    mounted(){
        router.push("/main/mycenter/mydata");
    }
}
</script>
<style scoped>
.left{
    width: 50%;
}
.main{
    margin-left:-10%;
}
</style>