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
import privateQuestion from '@/components/askQuestion/privateQuestion'
import mineEditPassword from '@/components/mine/mineEditPassword' //设置密码
import mineInvoice from '@/components/mine/mineInvoice' //开具发票
import mineBuy from '@/components/mine/mineBuy' //我的购买
import mineData from '@/components/mine/mineData' //我的资料
import mineQuestion from '@/components/mine/mineQuestion' //我的提问
import mineQuesDetail from '@/components/mine/mineQuesDetail' //我的提问详情
import mineBag from '@/components/mine/mineBag' //我的钱包
import mineLearningCard from '@/components/mine/mineLearningCard' //学习顾问卡
import mineFinanceCard from '@/components/mine/mineFinanceCard' //财税问答卡
import mineBindFCard from '@/components/mine/mineBindFCard' //财税问答卡-绑定财税问答卡
import about from '@/components/about' //关于我们
import smallClass from '@/components/video/smallClass' //微课
import smallClassSearch from '@/components/video/smallClassSearch' //微课搜索
import masterInterview from '@/components/video/masterInterview' //大咖访谈
/*import masterInterviewSearch from '@/components/video/masterInterviewSearch' //大咖访谈搜索*/
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
      path: '/mineQuesDetail',
      name: 'mineQuesDetail',
      component: mineQuesDetail
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
      path: '/mineFinanceCard',
      name: 'mineFinanceCard',
      component: mineFinanceCard
    },
    {
      path: '/mineBindFCard',
      name: 'mineBindFCard',
      component: mineBindFCard
    },
    {
      path: '/smallClass',
      name: 'smallClass',
      component: smallClass
    },
    {
      path: '/smallClassSearch',
      name: 'smallClassSearch',
      component: smallClassSearch
    },
    {
      path: '/masterInterview',
      name: 'masterInterview',
      component: masterInterview
    },
    {
      path: '/privateQuestion',
      name: 'privateQuestion',
      component: privateQuestion
    }
    /*{
      path: '/masterInterviewSearch',
      name: 'masterInterviewSearch',
      component: masterInterviewSearch
    }*/

  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})



