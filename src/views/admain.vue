<template>
<div>
      <el-card class="hea">
        欢迎来到Earlyrise的管理系统
      </el-card>
    <el-card style="width:15%;float:left;">
        <el-menu :default-active="activeIndex" @select="select">
            <el-menu-item index="1">博客管理</el-menu-item>
            <el-menu-item index="2">贴吧管理</el-menu-item>
            <el-menu-item index="3">帖子管理</el-menu-item>
            <el-menu-item index="4">用户管理</el-menu-item>
            <el-menu-item index="5">问答管理</el-menu-item>
         </el-menu></el-card>
    <el-card style="width:80%;margin-left:3%;float:left">
        <router-view></router-view>
    </el-card>
</div>

</template>
<script>
import router from "@/router/index"
export default {
    data(){
        return{
            activeIndex:'1'
        }
    },
    methods:{
        select(key,keypath){
                var d=key;
                switch(d){
                   case '1':{                   
                     router.push("/admain/blogadmin");break;
                   };
                   case '2':{
                     router.push("/admain/baradmin");break;
                   };
                   case '3':{                     
                     router.push("/admain/postadmin");break;
                   };
                   case '4':{                     
                     router.push("/admain/useradmin");break;
                   };
                   case '5':{                     
                     router.push("/admain/qutadmin");break;
                   };
               }
            },
    }
}
</script>
<style>
.hea{
text-align:center;
font-size:20px;
font-weight:blod;
}
</style>