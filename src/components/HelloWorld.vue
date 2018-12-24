<template>
  <div class="head-banner clearfix">
    <div class="swiper-container">
      <ul class="swiper-wrapper">
        <li class="swiper-slide head-img">
          <a href="" style="cursor: pointer;"><img class="banner-img" src="../assets/banner.png"  /></a>
        </li>
        <li class="swiper-slide head-img">
          <a href="" style="cursor: pointer;"><img class="banner-img"  src="../assets/banner2.png" /></a>
        </li>
        <li class="swiper-slide head-img">
          <a href="" style="cursor: pointer;"><img class="banner-img"  src="../assets/banner3.png" /></a>
        </li>
        <li class="swiper-slide head-img">
          <a href="" style="cursor: pointer;"><img class="banner-img"  src="../assets/banner4.png" /></a>
        </li>
      </ul>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: 3000, //可选选项，自动滑动
      autoHeight: true,
      speed: 2000,
      autoplayDisableOnInteraction: true,
      roundLengths: true,
      pagination: '.swiper-pagination',
      paginationClickable: true,
      loop: true, //循环播放
      //touchRatio:1,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    console.log(this.$route.params.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../static/css/swiper.min.css';
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
