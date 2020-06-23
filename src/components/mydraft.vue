<template>
<div>
    <el-card v-for="(dra,index) in drafts" :key="index">
        <el-row>
            <el-col :span="18" :offset="2"><el-link :underline="false" @click="draa(dra)">{{dra.dratit}}</el-link></el-col>
            <el-col :span="4"><el-button @click="del(dra.draid,index)" plain size="mini">删除</el-button></el-col>
        </el-row>
    </el-card>
</div>
</template>
<script>
import axios from "axios"
import router from "@/router/index"
export default {
    data(){
        return{
            drafts:[],
            users:[]
        }
    },
    methods:{
        draa(a){
            router.push({
                name:"wblog",
                params:{
                    data:a
                }
            })
        },
        del(id,index){
            axios({
                method:"post",
                url:"/api/blog/deldra",
                data:{
                    draid:id
                }
            }).then(response=>{
                if(response.data==1){
                    this.drafts.splice(index,1);
                this.$message({
                message: '删除成功',
                type: 'success' 
                });
                }
            })
        }
    },
    mounted(){
        axios({
            method:"post",
            url:"/api/blog/getnewdra",
            data:{
                username:sessionStorage.getItem("username")
            }
        }).then(response=>{
            this.drafts=response.data.draft;
            this.user=response.data.user;
        })
    }
}
</script>
<style scoped>

</style>