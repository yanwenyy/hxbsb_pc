import Vue from 'vue'
import Router from 'vue-router'
import {getUrlParms} from '../../static/js/public'
import main from '@/components/main'//主入口页面
import Home from '@/components/home'
import cookieId from '@/components/cookieId'
import video from '@/components/video/video'
import login from '@/components/login'
import userAgreement from '@/components/userAgreement'
import ask from '@/components/askQuestion/ask' //我要提问主入口
import mine from '@/components/mine/mine' //我要提问主入口
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
import questionProgress from '@/components/mine/questionProgress' //我的提问-问题进度
import mineQuesDetail from '@/components/mine/mineQuesDetail' //我的提问详情
import mineBag from '@/components/mine/mineBag' //我的钱包
import mineLearningCard from '@/components/mine/mineLearningCard' //学习顾问卡
import mineLearningCardPay from '@/components/mine/mineLearningCardPay' //学习顾问卡购买
import mineFinanceCard from '@/components/mine/mineFinanceCard' //财税问答卡
import mineBindFCard from '@/components/mine/mineBindFCard' //财税问答卡-绑定财税问答卡
import about from '@/components/about' //关于我们
import smallClass from '@/components/video/smallClass' //微课
import smallClassSearch from '@/components/video/smallClassSearch' //微课搜索
import masterInterview from '@/components/video/masterInterview' //大咖访谈
import bindFinanceCard from '@/components/bindFinanceCard'
import Public from "../../static/js/public"; //登录注册-绑定财税问答卡
/*import masterInterviewSearch from '@/components/video/masterInterviewSearch' //大咖访谈搜索*/
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      redirect: to => {
        console.log(getUrlParms("data"));
        if (getUrlParms("data")) {
           return '/cookieId'
        } else {
          // Redirect to login instead
          return '/login'
        }
      },
      meta: { title: '主入口整体布局' },
      children: [
        {
          path: '/home',
          name: 'Home',
          meta:{
            title:'首页'
          },
          component: Home
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
          path: '/ask',
          name: 'ask',
          component: ask,
          redirect: { name: 'quesAnswerBank' },
          children: [
            {
              path: '/quesAnswerBank',
              name: 'quesAnswerBank',
              component: quesAnswerBank
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
            }
          ]
        },
        {
          path: '/payMethod',
          name: 'payMethod',
          component: payMethod
        },
        {
          path: '/about',
          name: 'about',
          component: about
        },
        {
          path: '/mine',
          name: 'mine',
          component: mine,
          redirect: { name: 'mine' },
          children: [
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
              path: '/questionProgress',
              name: 'questionProgress',
              component: questionProgress
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
              path: '/mineLearningCardPay',
              name: 'mineLearningCardPay',
              component: mineLearningCardPay
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
              path: '/mineEditPassword',
              name: 'mineEditPassword',
              component: mineEditPassword
            },
            {
              path: '/mineInvoice',
              name: 'mineInvoice',
              component: mineInvoice
            },
          ]
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
        },
        {
          path: '/bindFinanceCard',
          name: 'bindFinanceCard',
          component: bindFinanceCard
        }
      ],
      // beforeEnter (to, from, next) {
      //   //获取地址栏参数
      //   function getUrlParms(name){
      //     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      //     var r = window.location.search.substr(1).match(reg);
      //     if(r!=null)
      //       return unescape(r[2]);
      //     return null;
      //   }
      //   if(getUrlParms("data")){
      //     // sessionStorage.setItem("cookieId","oPUdI0pZbHIYBCHUn_aQPCJAmRIU")
      //   }else{
      //     let cookieId = sessionStorage.getItem("cookieId")
      //     if (!cookieId || !/\S/.test(cookieId)) {
      //       next({ name: 'login' })
      //     }
      //   }
      //   next();
      //   // let cookieId = sessionStorage.getItem("cookieId")
      //   // if (!cookieId || !/\S/.cookieId(cookieId)) {
      //   //   next({ name: 'login' })
      //   // }
      //   // next()
      // }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/cookieId',
      name: 'cookieId',
      component: cookieId
    },
    {
      path: '/userAgreement',
      name: 'userAgreement',
      meta:{
        title:'用户协议'
      },
      component: userAgreement
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})



