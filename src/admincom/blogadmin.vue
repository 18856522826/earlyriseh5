<template>
<div id="dd">
    <el-dialog :visible.sync="blogdia" :before-close="handleClose" title="修改博客信息">
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
    <el-input placeholder="博客标题" style="width:30%" v-model="title"></el-input><el-button @click="titsub">查询</el-button>
    <el-input placeholder="博客id" style="width:30%"  v-model="bid"></el-input ><el-button @click="bsub">查询</el-button>
    <br>
    <el-divider ></el-divider>
  <div v-infinite-scroll="load" style="height:500px;overflow:auto">
  <el-table :data="blog" style="width: 100%" stripe>
      <el-table-column prop="bid" label="博客id" width="180">
      </el-table-column>
      <el-table-column prop="bname" label="博客标题" width="180">
      </el-table-column>
      <el-table-column prop="bshort" label="博客简介">
      </el-table-column>
      <el-table-column prop="bstar" label="博客赞数">
      </el-table-column>
      <el-table-column prop="baccess" label="博客访问量">
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
import axios from "axios"
export default {
    data(){
        return{
            blog:[],
            count:0,
            bool:true,
            title:"",
            bid:null,
            sort:1,
            bid:"",
            blogdia:false,
            newtit:null,
            newstar:null,
            newaccess:null,
            newshort:null,
            scope:{}
        }
    },
    methods:{
        handleClose(){
            this.blogdia=false;
        },
        bsub(){
            this.count=0;
            axios({
                method:"post",
                url:"/api/blog/getblog",
                data:{
                    id:this.bid
                }
            }).then(response=>{
                this.blog.length=0;
                this.blog.push(response.data);
                this.sort=3;
            })
        },
        titsub(){
            this.count=0;
            axios({
                method:"post",
                url:"/api/blog/getlikeblog",
                data:{
                    like:this.title,
                    count:this.count
                }
            }).then(response=>{
                this.blog.length=0;
                var l=response.data.blog.length;
                for(var i=0;i<l;i++){
                    this.blog.push(response.data.blog[i]);
                }
                this.sort=2;
                this.count++;
            })
        },
        sub(){
            axios({
                method:"post",
                url:"/api/blog/updateblog",
                data:{
                    bid:this.scope.bid,
                    newtit:this.newtit,
                    newstar:this.newstar,
                    newaccess:this.newaccess,
                    newshort:this.newshort,
                }
            }).then(response=>{
                this.blogdia=false
            })
        },
        edit(scope){
            this.blogdia=true;
            this.scope=scope;       
        },
        del(index,scope){
            axios({
                method:"post",
                url:"/api/blog/delblog",
                data:{
                    bid:scope.bid
                }
            }).then(response=>{
                 this.$message({
                 message: '删除成功',
                 type: 'success'
                    });
                this.blog.splice(index,1);
            })
        },
            expand(response){
                    var a=response.data.blog.length;
                    for(var i=0;i<a;i++){
                            this.blog.push(response.data.blog[i]);
                        }
                        this.count++;
                        },        
            load(){
                    if(this.sort==1){
                            axios({
                                 method:"post",
                                url:"/api/blog/getnewblog",
                                data:{
                                    count:this.count
                                    }
                                 }).then(response=>{
                                        this.expand(response)
                                    })
                    }else if(this.sort==2){
                        axios({
                                 method:"post",
                                url:"/api/blog/getlikeblog",
                                data:{
                                    count:this.count,
                                    like:this.title,
                                    }
                                 }).then(response=>{
                                        this.expand(response)
                                    })
                    }            
        }
    },
    mounted(){
    
        axios({
            method:"post",
            url:"/api/blog/getnewblog",
            data:{
                count:this.count
            }
        }).then(response=>{
            this.blog=response.data.blog
            this.count++;
        })
    }
    
}
</script>
<style scoped>
</style>