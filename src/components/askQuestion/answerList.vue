<template>
  <div class="container">
    <BreadNav :breadName="title"></BreadNav>
    <div class="home-main box-sizing">
      <div class="h-main-left inline-block">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>快速答</div>
        </div>
        <div class="wdk-list" v-for="item in list">
          <div class="inline-block">
            <div class="wdk-name">
              <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
              <div class="inline-block user_name">{{get_name(item)}}</div>
              <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
              <div class="home-list-msg-group">
                <div class="inline-block home-list-msg">{{item.content}}</div>
                <div class="inline-block rob-money">
                  <span class="inline-block">悬赏：<span class="orange">15.00元</span></span>
                  <div class="inline-block weiguan" @click="answer(item.uuid)">查看</div>
                </div>
              </div>
              <div class="label box-sizing">
                <div class="inline-block">{{format(item.date)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="no-msg-img" v-show="nomsg">
          <img src="../../../static/img/answer-nomsg.png" alt="">
          <div>刚刚悬赏的问题都被抢光了～</div>
        </div>
        <div class="load-more" v-if="list.length==end">
          <span class="inline-block gray-line"></span>
          <span class="inline-block load-more-btn" @click="load_more()">点击加载更多</span>
          <span class="inline-block gray-line"></span>
        </div>
      </div>
      <div class="h-main-right inline-block box-sizing answer-rule">
        <div>抢答规则</div>
        <ul>
          <li>
            1. 抢答名额宝贵，请认真作答，若未回答或者遭到提问者投诉，您将可能被停用账号。
          </li>
          <li>
            2.采纳后赏金七天后到账。
          </li>
          <li>
            3.回答有误被纠错，后台审核后赏金会扣除奖励给救错人，同时评分也扣除。
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadNav from '@/components/breadNav'
    export default {
      name: "answer-list",
      components: {
        BreadNav,
      },
      data(){
        return{
          list:[],//抢答列表
          start:1,
          end:10,
          nomsg:false,
          title:"首页 >快速答",//给面包屑传值
        }
      },
      mounted(){
        var that=this;
        this.ajax(this.http_url.url+"/question/pageList",{
          "sinceId":this.start,
          "maxId":this.end,
        },function(data){
          if(data.questions!=""&&data.questions!=null){
            that.list=data.questions;
          }else{
            that.nomsg=true;
          }
        })
      },
      methods:{
        //点击加载更多
        load_more:function(){
          var that=this;
          this.num+=1;
          this.start=((this.num-1)*10)+1;
          this.end=this.num*10;
          this.ajax(this.http_url.url+'/question/pageList',{
            "sinceId":this.start,
            "maxId":this.end,
          },function(data){
            var data=data;
            if(data.questions!=""&&data.questions!=null){
              for(var i=0;i<data.length;i++){
                that.list.push(data[i]);
              }
            }else{
              $(".load-more").hide();
              that.nomsg=true;
            }
          });
        },
        answer:function(id){
          var that=this;
          this.ajax_nodata(this.http_url.url+"/answer/isAnswer",function(data){
            console.log(data);
            if(data.code==4&&data.des=="您有未回答的问题，请前去回答"){
              that.$myToast.error(data.des);
              setTimeout(function(){
                that.$router.push({name:'mineAnswerWacthDetail',query:{'id':data.question.uuid}})
              },3000);
            }else if(data.code==1){
              that.$router.push({name:'mineAnswerWacth',query:{'id':id}})
            }else{
              that.$myToast.error(data.des);
            }
          })
        },
      }
    }
</script>

<style scoped>
  .h-main-left{
    min-height: 33rem;
    height: auto;
  }
  .weiguan{
    background: #FE6D27;
    color:#fff;
  }
  .answer-rule>div{
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
  .answer-rule>ul li{
    font-size: 0.875rem;
    margin-bottom: 1rem;
    line-height: 1.2rem ;
  }
  .home-main{
    margin-bottom: 2rem;
  }
  .queser-msg>div:last-child{
    margin-top: 0.5rem;
  }
  .queser-grounp-footer>span{
    margin-right: 1rem;
  }
  .queser-grounp-img>img{
    width:6.25rem;
    height:6.25rem;
    margin-right: 0.625rem;
    border-radius:2px;
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
</style>
