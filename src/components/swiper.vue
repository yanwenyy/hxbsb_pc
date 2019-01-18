<template>
  <div class="lubo-group">
    <div id="lunbo">
      <div class="head-banner clearfix">
        <div class="swiper-container s1">
          <ul class="swiper-wrapper">
            <li class="swiper-slide head-img" style="background: url('./static/img/img1920.jpg') center">
            </li>
          </ul>
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
            s_head:1
          }
        },
        mounted () {
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
    height: 17.5rem;
    width: 100%;
    background-size: cover;
  }
</style>
