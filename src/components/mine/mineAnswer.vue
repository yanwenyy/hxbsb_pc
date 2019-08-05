<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的回答"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的回答</div>
        </div>
        <div class="mine-right-body">
          <div class="wdk-list" @click="$router.push({name:'mineAnswerDetail',query:{'id':item.uuid}})" v-for="item in list">
            <div class="inline-block">
              <div class="wdk-name">
                <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
                <div class="inline-block user_name">{{get_name(item)}}</div>
                <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
                <div class="home-list-msg-group">
                  <div class="inline-block home-list-msg">{{item.content}}</div>
                  <div class="inline-block rob-money">
                    <span class="inline-block">悬赏：<span class="orange">15.00元</span></span>
                    <div class="inline-block weiguan">
                      {{item.status==1||item.status==3||item.status==4||item.status==5? '未采纳':item.status==2||item.status==7? '已采纳':'已纠错'}}
                    </div>
                  </div>
                </div>
                <div class="label box-sizing">
                  <div class="inline-block">{{format(item.date)}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="no-msg-img" v-show="list==''">
            <img src="../../../static/img/answer-nomsg.png" alt="">
            <div>暂无任何记录～</div>
          </div>
          <div id="page" class="paging"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
  export default {
    name: "mine-answer",
    components:{
      mineLeft,
    },
    data(){
      return{
        list:[],//抢答列表
        start:1,
        end:10,
      }
    },
    mounted(){
      var that=this;
      this.ajax(this.http_url.url+"/question/answerQuestionList",{
        "sinceId":this.start,
        "maxId":this.end,
      },function(data){
        console.log(data);
        that.list=data.questionUserAnswerRewardFlows;
        that.page(data.count/10)
      })
    },
    methods:{
      //分页
      page:function(data){
        var that=this;
        $("#page").paging({
            total: data,
            numberPage: 1
          },
          function(msg) {
            //回调函数 msg为选中页码
            // tab(msg);
            that.start=((msg-1)*10)+1;
            that.end=msg*10;
            that.ajax(that.http_url.url+"/question/answerQuestionList",{
              "sinceId":that.start,
              "maxId":that.end,
            },that.page_msg)
          });
      },
      //分页回调
      page_msg:function(data){
        this.purchaseOrders=data.purchaseOrders;
      },
    }
  }
</script>

<style scoped>
  .weiguan{
    background: none;
    color:#000;
  }
  .rob-money>span{
    margin-right: 2rem;
    height: 1.75rem;
    line-height: 1.75rem;
  }
  .home-list-msg{
    width: 60%;
  }
  .rob-money{
    float: right;
  }
  .mine-right-body{
    padding:0 2rem;
  }
</style>
