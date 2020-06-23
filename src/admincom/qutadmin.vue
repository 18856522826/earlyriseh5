<template>
    <div id="dd">
        <el-dialog :visible.sync="qutdia" :before-close="handleClose" title="修改问答信息">
        <el-row>
        <el-col :span="3" :offset="4">
            问答标题
        </el-col>
        <el-col :span="9">
            <el-input placeholder="请输入标题" size="small" v-model="newtit"></el-input>
        </el-col>
        </el-row><br>
        <el-row>
        <el-col :span="3" :offset="4">
            问答简介
        </el-col>
        <el-col :span="9">
            <el-input placeholder="请输入简介" size="small" v-model="newshort"></el-input>
        </el-col>
        </el-row><br>
        <el-row>
        <el-col :span="3" :offset="4">
            问答赞数
        </el-col>
        <el-col :span="9">
            <el-input placeholder="请输入赞数" size="small" v-model="newstar"></el-input>
        </el-col>
        </el-row>
        <el-row><br>
        <el-col :span="3" :offset="4">
            问答访问量
        </el-col>
        <el-col :span="9">
            <el-input placeholder="请输入访问量" size="small" v-model="newaccess"></el-input>
        </el-col>
        </el-row><br>
        <el-row><br>
        <el-col :span="3" :offset="4">
            问答积分
        </el-col>
        <el-col :span="9">
            <el-input placeholder="请输入积分" size="small" v-model="newscore"></el-input>
        </el-col>
        </el-row><br>
        <el-row>
            <el-col :offset="8"><el-button type="success" style="width:100px" @click="qub">提交</el-button></el-col>
        </el-row>
    </el-dialog>
        <el-input placeholder="问答标题" style="width:30%" v-model="title"></el-input><el-button @click="titsub">查询</el-button>
    <el-input placeholder="问答id" style="width:30%"  v-model="qid"></el-input ><el-button @click="qsub">查询</el-button>
    <br>
    <el-divider ></el-divider>
        <div v-infinite-scroll="load" style="height:500px;overflow:auto">
            <el-table :data="questions" style="width: 100%" stripe>
                    <el-table-column prop="qid" label="问答id" width="180">
                    </el-table-column>
                    <el-table-column prop="qname" label="问答标题" width="180">
                    </el-table-column>
                    <el-table-column prop="qsample" label="问答简介">
                    </el-table-column>
                    <el-table-column prop="qtype" label="问答类型">
                    </el-table-column>
                    <el-table-column prop="qstar" label="问答赞数">
                    </el-table-column>
                    <el-table-column prop="qaccess" label="问答访问量">
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
            questions:[],
            count:0,
            title:"",
            qid:null,
            newtit:null,
            newstar:null,
            newaccess:null,
            newshort:null,
            newscore:null,
            qutdia:false,
            scope:{}

        }
    },
    methods:{
        handleClose(){
            this.qutdia=false
        },
        qub(){
            axios({
                method:"post",
                url:"/api/question/upqut",
                data:{
                    qid:this.scope.qid,
                    newtit:this.newtit,
                    newshort:this.newshort,
                    newstar:this.newstar,
                    newaccess:this.newaccess,
                    newscore:this.newscore
                }
            }).then(response=>{
                     this.$message({
                        message: '修改成功',
                        type: 'success'
        });
        this.handleClose()
            })
        },
        load(){

        },
        del(index,scope){
            axios({
                method:"post",
                url:"/api/question/delqut",
                data:{
                    qid:scope.qid
                }
            }).then(response=>{
                this.questions.splice(index,1)
            })
        },
        edit(scope){
            this.qutdia=true,
            this.scope=scope
        },
        titsub(){
            axios({
                method:"post",
                url:"/api/question/gettit",
                data:{
                    title:this.title
                }
            }).then(response=>{
                var s= this.questions.length;
                for(var i=0;i<s;i++){
                    this.questions.pop()
                }
               var length=response.data.qut.length;
               for(var t=0;t<length;t++){
                   this.questions.push(response.data.qut[t])
               }
            })
        },
        qsub(){
            axios({
                method:"post",
                url:"/api/question/getquestion",
                data:{
                    qid:this.qid
                }
            }).then(response=>{
                 var s= this.questions.length;
                for(var i=0;i<s;i++){
                    this.questions.pop()
                }
                   this.questions.push(response.data) 
               }
            )
        },
    },
    mounted(){
        axios({
            method:"post",
            url:"/api/question/getnewqut",
            data:{
                count:this.count
            }
        }).then(response=>{
            this.questions=response.data.qut
            this.count++;
        })
    }
}
</script>
<style>

</style>