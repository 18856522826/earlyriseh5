<template>
<div>
<div v-infinite-scroll="load" style="height:500px;overflow:auto">
  <el-table :data="bars" style="width: 100%" stripe>
      <el-table-column prop="barid" label="贴吧id" width="180">
      </el-table-column>
      <el-table-column prop="barname" label="贴吧标题" width="180">
      </el-table-column>
      <el-table-column prop="barbrief" label="贴吧简介">
      </el-table-column>
      <el-table-column prop="baruser" label="贴吧赞数">
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
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            bars:[],
            count:0
        }
    },
    methods:{
        load(){
            axios({
                method:"post",
                url:"/api/bar/getabar",
                data:{
                    count:this.count
                }
            }).then(response=>{
                this.count++;
               var a= response.data.bars.length;
               for(var i=0;i<a;i++){
                   this.bars.push(response.data.bars[i])
               }
            })
        },
        del(index,scope){
           console.log(scope.barid) 
            axios({
                method:"post",
                url:"/api/bar/delbarid",
                data:{
                    id:scope.barid
                }
            }).then(response=>{
                this.$message({
                 message: '删除成功',
                 type: 'success'
                    });
                this.bars.splice(index,1);
            })
        }
    },
    mounted(){
        axios({
            method:"post",
            url:"/api/bar/getabar",
            data:{
                count:this.count
            }
        }).then(response=>{
            this.bars=response.data.bars
            console.log(response.data)
            this.count++;
        })
    }
}
</script>
<style scoped>

</style>