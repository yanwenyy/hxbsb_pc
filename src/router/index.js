import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import video from '@/components/video/video'
import login from '@/components/login'
import askQuestion from '@/components/askQuestion/askQuestion' //我要提问
import quesAnswerBank from '@/components/askQuestion/quesAnswerBank'
import payMethod from '@/components/payMethod'
import answerSearch from '@/components/askQuestion/answerSearch'
import answerWacth from '@/components/askQuestion/answerWacth'
import answerWacthDetail from '@/components/askQuestion/answerWacthDetail'
import mineEditPassword from '@/components/mine/mineEditPassword'
import mineInvoice from '@/components/mine/mineInvoice'
import mineBuy from '@/components/mine/mineBuy'
import mineData from '@/components/mine/mineData'
import mineQuestion from '@/components/mine/mineQuestion'
import mineBag from '@/components/mine/mineBag'
import mineLearningCard from '@/components/mine/mineLearningCard'
import about from '@/components/about' //关于我们
import smallClass from '@/components/video/smallClass' //微课
import masterInterview from '@/components/video/masterInterview' //大咖访谈
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta:{
        title:'首页'
      },
      component: Home
    },
    {
      path: '/HelloWorld:id',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/askQuestion',
      name: 'askQuestion',
      meta:{
        title:'我要提问',
      },
      component: askQuestion
    },
    {
      path: '/quesAnswerBank',
      name: 'quesAnswerBank',
      component: quesAnswerBank
    },
    {
      path: '/payMethod',
      name: 'payMethod',
      component: payMethod
    },
    {
      path: '/answerSearch',
      name: 'answerSearch',
      component: answerSearch
    },
    {
      path: '/answerWacth',
      name: 'answerWacth',
      component: answerWacth
    },
    {
      path: '/answerWacthDetail',
      name: 'answerWacthDetail',
      component: answerWacthDetail
    },
    {
      path: '/mineEditPassword',
      name: 'mineEditPassword',
      component: mineEditPassword
    },
    {
      path: '/mineInvoice',
      name: 'mineInvoice',
      component: mineInvoice
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/mineBuy',
      name: 'mineBuy',
      component: mineBuy
    },
    {
      path: '/mineData',
      name: 'mineData',
      component: mineData
    },
    {
      path: '/mineQuestion',
      name: 'mineQuestion',
      component: mineQuestion
    },
    {
      path: '/mineBag',
      name: 'mineBag',
      component: mineBag
    },
    {
      path: '/mineLearningCard',
      name: 'mineLearningCard',
      component: mineLearningCard
    },
    {
      path: '/smallClass',
      name: 'smallClass',
      component: smallClass
    },
    {
      path: '/masterInterview',
      name: 'masterInterview',
      component: masterInterview
    }

  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})



