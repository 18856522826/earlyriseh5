<template>
    <div>
<el-dialog :visible.sync="postdia" :before-close="handleClose" title="修改博客信息">
        <el-row>
        <el-col :span="3" :offset="4">
            博客标题
        </el-col>
        <el-col :span="9">
            <el-input placeholder="请输入标题" size="small" v-model="newtit"></el-input>
        </el-col>
        </el-row><br>
        <el-row>
        <el-col :span="3" :offset="4">
            博客简介
        </el-col>
        <el-col :span="9">
            <el-input placeholder="请输入简介" size="small" v-model="newshort"></el-input>
        </el-col>
        </el-row><br>
        <el-row>
        <el-col :span="3" :offset="4">
            博客赞数
        </el-col>
        <el-col :span="9">
            <el-input placeholder="请输入赞数" size="small" v-model="newstar"></el-input>
        </el-col>
        </el-row>
        <el-row><br>
        <el-col :span="3" :offset="4">
            博客访问量
        </el-col>
        <el-col :span="9">
            <el-input placeholder="请输入访问量" size="small" v-model="newaccess"></el-input>
        </el-col>
        </el-row><br>
        <el-row>
            <el-col :offset="8"><el-button type="success" style="width:100px" @click="sub">提交</el-button></el-col>
        </el-row>
    </el-dialog>
    <div v-infinite-scroll="load" style="height:500px;overflow:auto">
  <el-table :data="posts" style="width: 100%" stripe>
      <el-table-column prop="postid" label="帖子id" width="180">
      </el-table-column>
      <el-table-column prop="postname" label="帖子标题" width="180">
      </el-table-column>
      <el-table-column prop="uid" label="用户id">
      </el-table-column>
      <el-table-column prop="poststar" label="帖子赞数">
      </el-table-column>
      <el-table-column prop="bid" label="贴吧id">
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
import axios from"axios"
export default {
    data(){
        return{
            posts:[],
            count:0,
            postdia:false,
            scope:null
            
        }
    },
    methods:{
        handleClose(){
            this.postdia=false
        },
        edit(scope){
            this.blogdia=true;
            this.scope=scope;
        },
        load(){
            axios({
            method:"post",
            url:"/api/post/getallpost",
            data:{
                count:this.count
            }
        }).then(response=>{
            var a=response.data.post.length;
            for(var i=0;i<a;i++){
                this.posts.push(response.data.post[i])
            }
            this.count++;
        })
        },
        del(index,scope){
            axios({
                method:"post",
                url:"/api/post/delpost",
                data:{
                    pid:scope.postid
                }
            }).then(response=>{
                this.$message({
                 message: '删除成功',
                 type: 'success'
                    });
                this.posts.splice(index,1);
            })
        },
    },
    mounted(){
        axios({
            method:"post",
            url:"/api/post/getallpost",
            data:{
                count:this.count
            }
        }).then(response=>{
            this.posts=response.data.post;
            this.count++;
        })
    }
}
</script>
<style scoped>

</style>