import Vue from 'vue'
import Router from 'vue-router'
import bar from '@/views/bar'
import main from '@/views/main'
import fristbar from '@/views/fristbar'
import searchbar from '@/views/searchbar'
import blog from '@/views/blog'
import bar_tm from '@/views/bar_tm'
import searchpost from '@/views/searchpost'
import mycenter from '@/views/mycenter'
import mydata from '@/components/mydata'
import post from "@/components/post"
import wblog from "@/components/write"
import mblog from "@/components/blog_data"
import mystar from "@/components/mystar"
import earlyrise from '@/views/frist'
import qwrite from "@/components/qwrite"
import question from '@/views/question'
import qut_data from "@/components/question_data"
import admin from "@/views/admin"
import admain from "@/views/admain"
import blogadmin from "@/admincom/blogadmin"
import useradmin from "@/admincom/useradmin"
import qutadmin from "@/admincom/qutadmin"
import postadmin from "@/admincom/postadmin"
import baradmin from "@/admincom/baradmin"
import myblog from "@/components/myblog"
import myatt from "@/components/myatt"
import myqut from "@/components/myqut"
import mypost from "@/components/mypost"
import mydraft from "@/components/mydraft"
Vue.use(Router)

export default new Router({
  
  routes: [
    {
      path:"/",
      name:"main",
      component:main
    },
    {
      path:"/admin",
      name:"admin",
      component:admin
    },
    {
      path:"/admain",
      name:"admain",
      component:admain,
      children:[
        {
          path:"blogadmin",
          name:'blogadmin',
          component:blogadmin
        },{
          path:"useradmin",
          name:"useradmin",
          component:useradmin
        },{
          path:"qutadmin",
          name:"qutadmin",
          component:qutadmin
        },{
          path:"postadmin",
          name:"postadmin",
          component:postadmin
        },{
          path:"baradmin",
          name:"baradmin",
          component:baradmin
        }
      ]
    },
    {
      path:"/qwrite",
      name:"qwrite",
      component:qwrite

    },
    {
      path:'/wblog',
      name:'wblog',
      component:wblog
    },
    {
      path:'/main',
      name:'main',
      component:main,
      children:[
        {
          path:"earlyrise",
          name:"earlyrise",
          component:earlyrise
        },
        {
          path:"question",
          name:"question",
          component:question
        },
        {
          path:"qut_data",
          name:"qut_data",
          component:qut_data
        },
        {
          path: 'bar',
          name: 'bar',
          component: bar,
          children:[
            {
              path:"fristbar",
              name:'fristbar',
              component:fristbar
            },
            {
              path:"searchbar",
              name:"searchbar",
              component:searchbar
            },
            {
              path:"bartm",
              name:"bartm",
              component:bar_tm
            },
            {
              path:"searchpost",
              name:"searchpost",
              component:searchpost
            },
            {
              path:"post",
              name:"post",
              component:post
            }
          ]
        },{
          path:"mycenter",
          name:"mycenter",
          component:mycenter,
          children:[
            {
              path:"mydata",
              name:"mydata",
              component:mydata
            },
            {
              path:"mystar",
              name:"mystar",
              component:mystar
            },
            {
              path:"myblog",
              name:"myblog",
              component:myblog
            },
            {
              path:"myatt",
              name:"myatt",
              component:myatt
            },{
              path:"myqut",
              name:"myqut",
              component:myqut
            },
            {
              path:"mypost",
              name:"mypost",
              component:mypost
            },{
              path:"mydraft",
              name:"mydraft",
              component:mydraft
            }
          ]
        },
        {
          path:"blog",
          name:"blog",
          component:blog,
         }, 
         {
          path:"mblog",
          name:"mblog",
          component:mblog
        }
      ]
    }

  ]
})
