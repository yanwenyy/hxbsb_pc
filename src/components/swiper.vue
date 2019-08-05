<template>
  <div class="lubo-group">
    <div id="lunbo">
      <div class="head-banner clearfix">
        <div class="swiper-container s1">
          <ul class="swiper-wrapper swiper-no-swiping">
            <!--<li class="swiper-slide head-img" style="background: url('./static/img/img1920.png') center">-->
            <li class="swiper-slide head-img">
              <img src="../../static/img/swiper_bg.png" alt="">
            </li>
          </ul>
          <div class="ask-btn">
            <div class="ask-btn-title">快速问</div>
            <textarea class="box-sizing" @click="userMessage.userName||userMessage.companyName||userMessage.province?$router.push({name:'askQuestion'}):$myToast.confirm('您还没有完善信息,完善后方可提问','mineData','去完善')" readonly v-model="text" name="" id="" style="resize:none" placeholder="点击输入您要问的问题"></textarea>
            <div class="ask-btn-btn cursor" @click="userMessage.userName||userMessage.companyName||userMessage.province?$router.push({name:'askQuestion'}):$myToast.confirm('您还没有完善信息,完善后方可提问','mineData','去完善')">我要提问</div>
          </div>
          <div class="swiper-pagination"></div>
          <!--<div class="swiper-button-prev"></div>&lt;!&ndash;左箭头&ndash;&gt;
          <div class="swiper-button-next"></div>&lt;!&ndash;右箭头&ndash;&gt;-->
        </div>
      </div>
    </div>
    <!--<div id="search-group">-->
      <!--<img src="../../static/img/jubian.png" alt=""><br>-->
      <!--<div class="search-new">-->
          <!--<div class="search-head">-->
            <!--<div>-->
              <!--<div :class=" s_head==1? 's-head-act':''" class="inline-block" v-on:click="s_head_click(1)">问答</div>-->
              <!--<div :class=" s_head==2? 's-head-act':''" class="inline-block" v-on:click="s_head_click(2)">大咖访谈</div>-->
              <!--<div :class=" s_head==3? 's-head-act':''" class="inline-block" v-on:click="s_head_click(3)">财税圈</div>-->
              <!--<div :class=" s_head==4? 's-head-act':''" class="inline-block" v-on:click="s_head_click(4)">专家库</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="search-inpu-group">-->
              <!--<div class="inline-block"><input type="text" class="box-sizing"></div>-->
              <!--<div class="inline-block box-sizing">搜索</div>-->
              <!--<div class="inline-block box-sizing">我要提问</div>-->
          <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
    export default {
        name: "swiper",
        data () {
          return {
            s_head:1,
            text:'',
            userMessage:'',
          }
        },
        mounted () {
          var that=this;
          // this.userMessage=JSON.parse(sessionStorage.getItem("userMessage"));
          this.ajax_nodata(this.http_url.url+"/user/message",function(data){
            that.userMessage=data;
          });
          var mySwiper = new Swiper('.s1', {
            // autoplay: 3000, //可选选项，自动滑动
            //autoHeight: true,
            speed: 2000,
            autoplayDisableOnInteraction: false,
            roundLengths: true,
            // pagination: '.swiper-pagination',
            type: 'bullets',
            paginationClickable: true,
            // loop: true, //循环播放
            //touchRatio:1,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true ,//修改swiper的父元素时，自动初始化swiper
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
          });
          var mySwiper2 = new Swiper('.s2', {
            //autoplay:3000,//可选选项，自动滑动
            //autoHeight: true,
            speed: 2000,
            roundLengths: true,
            // pagination: '.swiper-pagination',
            type: 'bullets',
            paginationClickable: true,
            loop: false, //循环播放
            //touchRatio:1,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true ,//修改swiper的父元素时，自动初始化swiper
            autoplayStopOnLast:false,
            nextButton: '.swiper-button-next2',
            prevButton: '.swiper-button-prev2',
          })
      },
      methods:{
          s_head_click:function(e){
            this.s_head=e;
          }
      }
    }
</script>

<style scoped>
  @import '../../static/css/swiper.min.css';
  .ask-btn-title{
    color:#333;
    font-size: 0.88rem;
    margin: 1.125rem;
    font-weight: bold;
  }
  .ask-btn-btn{
    width:11rem;
    height:1.875rem;
    line-height: 1.875rem;
    text-align: center;
    background:rgba(252,109,52,1);
    border-radius:4px;
    color:#fff;
    font-size: 0.81rem;
    margin: 0 auto;
  }
  .ask-btn>textarea{
    width:11rem;
    height:5rem;
    padding:0.69rem 1rem;
    outline: none;
    border:1px solid rgba(238,238,238,1);
    border-radius:4px;
    line-height: 1.25rem;
    margin-bottom: 1rem;
  }
  .ask-btn{
    width:13.38rem;
    height:12.56rem;
    background:rgba(225,225,225,.8) ;
    position: absolute;
    top:3rem;
    right:6rem;
    z-index: 99999999;
    border-radius:4px;
    text-align: center;
  }
  .swiper-pagination-bullet{
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: .2;
  }
  .swiper-button-prev{
    width:2.5rem;
    height:4.375rem;
    left:5%;
    top:60%;
    background: url(../../static/img/prev.png);
    display: none;
  }
  .swiper-button-next{
    width:2.5rem;
    height:4.375rem;
    right:5%;
    top:60%;
    background: url(../../static/img/next.png);
    display: none;
  }
  .lubo-group:hover .swiper-button-prev,.lubo-group:hover .swiper-button-next{
    display: block;
  }
  .swiper-slide{
    height: 18.75rem;
    width: 100%;
    background-size: cover;
  }
  .swiper-slide>img{
    width: 100%;
    height: 100%;
  }
</style>
