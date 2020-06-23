<template>
    <div>
    <el-card class="box-card">
  <div slot="header">
    <span>技术</span>
  </div>
  <el-row>
    <el-col v-for="bar in bars" :key="bar.barid" :span="8">
      <img v-bind:src="bar.barimg" style="width:40px;height:40px">
      <el-link type="success" @click="barlink(bar)" class="barlink">{{bar.barname}}</el-link>
      </el-col>
    </el-row>
</el-card>
    </div>
</template>
<script>
import Axios from 'axios'
import router from '@/router/index'
export default {
    data(){
        return{
            bars:[],
            input:this.$route.query.input,
            url:''
        }
    },
    beforeRouteEnter(to,from,next){
            var a =to.query.input;
           Axios({
                method:'post',
                url:"/api/bar/getallbar",
                data:{
                    input:a
                }
            }).then(response=>{
                console.log(response.data)
                 next(vm=>{
                        vm.input=a;
                        vm.bars=response.data
                 });
                
            })
    },
    beforeRouteUpdate (to,from,next){
           this.input=to.query.input;
           Axios({
                method:'post',
                url:"/api/bar/getallbar",
                data:{
                    input:this.input
                }
            }).then(response=>{
                this.bars=response.data
            })
            console.log("组件被复用")
            next();
    },
    methods:{
        barlink(bar){
            router.push({
                 name:"bartm",
                 query:{
                     data:JSON.stringify(bar)
                 }
                 });
        },
    },
    mounted(){
        this.$emit()
    }
}
</script>
<style>
.barlink{
    margin-top:-60px;
    margin-left: 5%;
}
.el-col {
    margin-top:10px
  }
</style>