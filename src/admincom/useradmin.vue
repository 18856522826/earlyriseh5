<template>
    <div id="dd">
        <div v-infinite-scroll="load" style="height:500px;overflow:auto">
            <el-table :data="users" style="width: 100%" stripe>
                    <el-table-column prop="uid" label="用户id" width="180">
                    </el-table-column>
                    <el-table-column prop="username" label="用户标题" width="180">
                    </el-table-column>
                    <el-table-column prop="nickname" label="用户昵称">
                    </el-table-column>
                    <el-table-column prop="score" label="用户积分">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="del(scope.$index,scope.row)">删除</el-button>
                    </template>
    </el-table-column>
    </el-table>
    </div>
    </div>
</template>>
<script>
import axios from "axios"
export default {
    data(){
        return{
            users:[],
            count:0,
        }
    },
    methods:{
        load(){
            axios({
                method:"post",
                url:"/api/user/getalluser",
                data:{
                    count:this.count
                }
            }).then(response=>{
                var a=response.data.users.length;
                for(var i=0;i<a;i++){
                    this.users.push(response.data.users[i])
                }
                this.count++;
            })
        },
        del(index,scope){
            axios({
                method:"post",
                url:"/api/user/deluserid",
                data:{
                    id:scope.uid
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
            url:"/api/user/getalluser",
            data:{
                count:this.count
            }
        }).then(response=>{
            this.users=response.data.users
            this.count++;
        })
    }
}
</script>
<style>

</style>