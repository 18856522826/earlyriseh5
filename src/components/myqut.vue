<template>
    <div>
        <el-card v-for="(q,index) in quts" :key="q.qid" class="block">
            <el-row>
                <el-col :span="4"><el-link class="title" @click="enter(users[index].uid,q.qid)">{{q.qname}}
                    </el-link></el-col>
                    <el-col :span="2"><el-tag size="mini">{{q.qtype}}</el-tag></el-col>
            </el-row>
             <el-row>
                 <el-col :span="2" :offset="18">
                     <el-button type="danger" size="mini" plain @click="del(q.qid,index)">删除</el-button>
                 </el-col>
                 <el-col :span="4" >
                 <div style="color:gray;font-size:10px">{{q.qtime}}</div>
                 </el-col>
             </el-row>
           </el-card>
    </div>
</template>
<script>
import axios from "axios"
import router from '@/router/index'
export default {
    data(){
        return{
            quts:[],
            users:[],
            count:0,
            bool:true
        }
    },
    methods:{
        enter(uid,qid){
            router.push({
                name:"qut_data",
                query:{
                    qid:qid,
                    uid:uid
                }
            })
        },
        del(qid,index){
            axios({
                method:"post",
                url:"/api/question/delqut",
                data:{
                    qid:qid
                }
            }).then(response=>{
                this.quts.splice(index,1);
                this.users.splice(index,1);
            })
        }
    },
    mounted(){
        axios({
            method:"post",
            url:"/api/question/getmyqut",
            data:{
                username:sessionStorage.getItem("username"),
                count:this.count
            }
        }).then(response=>{
            console.log(response.data)
            this.quts=response.data.qut,
            this.users=response.data.user,
            this.count++;
        })
    }
}
</script>
<style scoped>
.title{
    color:black
}
</style>