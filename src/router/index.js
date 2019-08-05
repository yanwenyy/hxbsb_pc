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
import freeWatch from '@/components/askQuestion/freeWatch'//免费围观
// import freeWatchAd from '@/components/askQuestion/freeWatchAd'//免费围观
import payMethod from '@/components/payMethod'
import answerSearch from '@/components/askQuestion/answerSearch'
import answerWacth from '@/components/askQuestion/answerWacth'
import answerWacthDetail from '@/components/askQuestion/answerWacthDetail'
import privateQuestion from '@/components/askQuestion/privateQuestion'
import mineEditPassword from '@/components/mine/mineEditPassword' //设置密码
import mineInvoice from '@/components/mine/mineInvoice' //开具发票
import mineInvoiceMsg from '@/components/mine/mineInvoiceMsg' //发票信息
import mineInvoiceEdit from '@/components/mine/mineInvoiceEdit' //发票信息
import mineBuy from '@/components/mine/mineBuy' //我的购买
import mineData from '@/components/mine/mineData' //我的资料
import mineQuestion from '@/components/mine/mineQuestion' //我的提问
import questionProgress from '@/components/mine/questionProgress' //我的提问-问题进度
import mineQuesDetail from '@/components/mine/mineQuesDetail' //我的提问详情
import mineBag from '@/components/mine/mineBag' //我的钱包
import mineLearningCard from '@/components/mine/mineLearningCard' //学习顾问卡
import mine365 from '@/components/mine/mine365' //365
import mine365Pay from '@/components/mine/mine365Pay' //365购买
import mineLearningCardPay from '@/components/mine/mineLearningCardPay' //学习顾问卡购买
import mineFinanceCard from '@/components/mine/mineFinanceCard' //财税问答卡
import mineBindFCard from '@/components/mine/mineBindFCard' //财税问答卡-绑定财税问答卡
import about from '@/components/about' //关于我们
import smallClass from '@/components/video/smallClass' //微课
import smallClassSearch from '@/components/video/smallClassSearch' //微课搜索
import masterInterview from '@/components/video/masterInterview' //大咖访谈
import bindFinanceCard from '@/components/bindFinanceCard'
import mechanismlist from '@/components/mechanism/mechanismlist'//机构
import mechanismDetail from '@/components/mechanism/mechanismDetail'//机构详情
import mechanismSearch from '@/components/mechanism/mechanismSearch'//机构搜索
import mineWorkbench from '@/components/mine/mineWorkbench'//我的工作台
import mineRobAnswer from '@/components/mine/mineRobAnswer'//待抢答
import answerList from '@/components/askQuestion/answerList'//首页抢答列表
import mineAnswerWacth from '@/components/mine/mineAnswerWacth'//抢答查看页
import mineAnswerWacthDetail from '@/components/mine/mineAnswerWacthDetail'//抢答页
import mineAnswer from '@/components/mine/mineAnswer'//我的回答
import mineAnswerDetail from '@/components/mine/mineAnswerDetail'//我的回答详情
import mineAttention from '@/components/mine/mineAttention'//我的关注
import mineFans from '@/components/mine/mineFans'//我的关注
import mineExpertEdit from '@/components/mine/mineExpertEdit'//我的工作台编辑专家信息
import expert from '@/components/expert/expert'//专家列表
import expertHomepage from '@/components/expert/expertHomepage'//专家主页
import expertSearch from '@/components/expert/expertSearch'//专家搜索
import expertApply from '@/components/expert/expertApply'//申请咨询师
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
            },
          ]
        },
        {
          path: '/mechanismlist',
          name: 'mechanismlist',
          component: mechanismlist
        },
        {
          path: '/mechanismDetail',
          name: 'mechanismDetail',
          component: mechanismDetail
        },
        {
          path: '/mechanismSearch',
          name: 'mechanismSearch',
          component: mechanismSearch
        },
        {
          path: '/expert',
          name: 'expert',
          component: expert
        },
        {
          path: '/expertHomepage',
          name: 'expertHomepage',
          component: expertHomepage
        },
        {
          path: '/expertSearch',
          name: 'expertSearch',
          component: expertSearch
        },
        {
          path: '/expertApply',
          name: 'expertApply',
          component: expertApply
        },
        {
          path: '/payMethod',
          name: 'payMethod',
          component: payMethod
        },
        {
          path: '/answerList',
          name: 'answerList',
          component: answerList
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
            {
              path: '/mineInvoiceMsg',
              name: 'mineInvoiceMsg',
              component: mineInvoiceMsg
            },
            {
              path: '/mineInvoiceEdit',
              name: 'mineInvoiceEdit',
              component: mineInvoiceEdit
            },
            {
              path: '/mine365',
              name: 'mine365',
              component: mine365
            },
            {
              path: '/mine365Pay',
              name: 'mine365Pay',
              component: mine365Pay
            },
            {
              path: '/mineWorkbench',
              name: 'mineWorkbench',
              component: mineWorkbench
            },
            {
              path: '/mineRobAnswer',
              name: 'mineRobAnswer',
              component: mineRobAnswer
            },
            {
              path: '/mineAnswerWacth',
              name: 'mineAnswerWacth',
              component: mineAnswerWacth
            },
            {
              path: '/mineAnswerWacthDetail',
              name: 'mineAnswerWacthDetail',
              component: mineAnswerWacthDetail
            },
            {
              path: '/mineAnswer',
              name: 'mineAnswer',
              component: mineAnswer
            },
            {
              path: '/mineAnswerDetail',
              name: 'mineAnswerDetail',
              component: mineAnswerDetail
            },
            {
              path: '/mineAttention',
              name: 'mineAttention',
              component: mineAttention
            },
            {
              path: '/mineFans',
              name: 'mineFans',
              component: mineFans
            },
            {
              path: '/mineExpertEdit',
              name: 'mineExpertEdit',
              component: mineExpertEdit
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
          path: '/mechanismlist',
          name: 'mechanismlist',
          component: mechanismlist
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
        },
        {
          path: '/freeWatch',
          name: 'freeWatch',
          component: freeWatch
        },
        // {
        //   path: '/freeWatchAd',
        //   name: 'freeWatchAd',
        //   component: freeWatchAd
        // }
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



