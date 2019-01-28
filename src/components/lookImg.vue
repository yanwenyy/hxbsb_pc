<template>
    <div class="mask-layer">
      <div class="swiper-container s1">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="item in imageList">
            <img class="look-imgs" :src="question_src+item" />
          </li>
        </ul>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev" id="prev"></div><!--左箭头-->
        <div class="swiper-button-next" id="next"></div><!--右箭头-->
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          imageList:[]
        }
      },
      mounted () {
        var mySwiper = new Swiper('.s1', {
          autoplay: 0, //可选选项，自动滑动
          //autoHeight: true,
          speed: 2000,
          autoplayDisableOnInteraction: false,
          roundLengths: true,
          // pagination: '.swiper-pagination',
          type: 'bullets',
          paginationClickable: true,
          loop: false, //循环播放
          //touchRatio:1,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
        });
        var that=this
        $("html").bind("click",function(){
          var evt = event.srcElement ? event.srcElement : event.target;
          if(evt.id == 'next' || evt.id == 'prev'){ //必须用ID class不管用　　　
          }else{
            that.$emit('refreshMask')
          }});
      },
      methods:{
        init (list) {
          this.imageList=list;
        }
      }
    }
</script>

<style scoped>
  @import '../../static/css/swiper.min.css';
  .swiper-container{
    text-align: center;
    height: 100%;
  }
  .look-imgs{
    display: block;
    width: 32rem;
    height: 32rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
</style>
