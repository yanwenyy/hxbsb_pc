<template>
  <div class="container">
    <div class="home-main box-sizing">
      <div class="h-main-left inline-block">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>问题详情</div>
        </div>
        <div class="queser-grounp">
          <img :src="questionUser.isAnon==1? head_src+questionUser.headImage:'/static/img/user-img.png'"   onerror="javascript:this.src='./static/img/user-img.png';" alt="" class="queser-head">
          <div class="inline-block queser-msg">
            <div class="inline-block user_name">{{get_name(questionUser)}}</div>
            <div class="inline-block user-dj"><img :src="get_score(questionUser.integralScore,questionUser.aision,questionUser.vip)" alt=""></div>
            <div>{{format(questionUser.date)}}</div>
          </div>
          <div class="queser-grounp-content">
            {{questionUser.content}}
          </div>
          <div class="queser-grounp-img">
            <img :src="question_src+item" alt="" v-for="(item,index) in questionUser.images" @click="lookImgFn(questionUser.images,index)">
          </div>
          <div class="queser-grounp-footer">
            <span>{{questionUser.area}} {{questionUser.quTrade}}</span>
            <span>点赞{{questionUser.approveNum}}</span>
            <span>围观{{questionUser.lookNum}}</span>
          </div>
        </div>
        <div class="rob-money orange">悬赏: <span class="orange"> 15.00</span>元</div>
        <div class="answer-btn cursor" @click="answer()">我要抢答</div>
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
    <look-img v-if="lookImgVisible" ref="lookImg" @refreshMask="maskShow"></look-img>
  </div>
</template>

<script>
  import lookImg from '@/components/lookImg'
    export default {
        name: "mine-answer-wacth",
      components:{
        lookImg
      },
        data(){
          return{
            //问题者信息
            questionUser:'',
            lookImgVisible:false,//图片放大组件控制
          }
        },
        mounted(){
          var that=this;
          this.ajax(this.http_url.url+'/answer/grab/details/question',{"uuid":this.$route.query.id},function(data){
            // console.log(data);
            that.questionUser=data.data;
          })
        },
        methods:{
          //图片放大组件控制
          lookImgFn:function (list,index) {
            this.lookImgVisible = true
            this.$nextTick(() => {
              this.$refs.lookImg.init(list,index)
            })
          },
          //图片放大组件控制
          maskShow:function () {
            this.lookImgVisible = false
          },
          //抢答按钮点击
          answer:function(){
            var that=this;
            if(confirm("抢答成功后，必须认真作答，否则答题页面无法退出且有可能遭到用户投诉，确认抢答吗？")==true){
              this.ajax(this.http_url.url+"/answer/grabAnswer",{"uuid":this.$route.query.id},function(data){
                if(data.code==1){
                  that.$router.push({name:'mineAnswerWacthDetail',query:{"id":that.$route.query.id}});
                }else{
                  that.$myToast.error(data.des);
                }
              });
            }else{
              return false;
            }
          }
        }
    }
</script>

<style scoped>
  .rob-money{
    margin-top: 2rem;
    font-size: 0.88rem;
  }
  .rob-money>span{
    font-size: 1.125rem;
  }
  .answer-btn{
    margin-top: 1rem;
    font-size: 0.94rem;
    width:9.38rem;
    background: #FE6D27;
    color:#fff;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    border-radius: 4px;
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
  .queser-grounp{
    padding-top:1.19rem;
  }
  .queser-head{
    width:2.5rem;
    height:2.5rem;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 0.2rem;
  }
  .queser-msg{
    vertical-align: middle;
    color:#999;
    font-size:0.75rem ;
  }
  .queser-msg>div:last-child{
    margin-top: 0.5rem;
  }
  .user_name{
    font-size: 0.875rem;
    color:#333;
    font-weight: 400;
  }
  .queser-grounp-content{
    font-size: 1.125rem;
    font-weight: 400;
    color:#333;
    line-height: 1.6rem;
    margin-top: 0.8rem;
  }
  .queser-grounp-footer{
    font-size: 0.875rem;
    color:#999;
    margin-top: 1rem;
  }
  .queser-grounp-footer>span{
    margin-right: 1rem;
  }
  .queser-grounp-img{
    margin-top: 0.6rem;
  }
  .queser-grounp-img>img{
    width:6.25rem;
    height:6.25rem;
    margin-right: 0.625rem;
    border-radius:2px;
  }
</style>
