import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    username:"",
    islogin:false
  }
  const getters={
    getdata(state){
      return state.islogin
    }
  }
  const mutations={
      Mincrease(state,user){
          if(user){
            state.username=user;
            state.islogin=true
          }
          else{
            state.username=null;
            state.islogin=false;
            sessionStorage.setItem("usename",null)
          }
      }
  }
  const actions={
      Aincrease({commit},user){
          commit('Mincrease',user);
      }
  }
  export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
