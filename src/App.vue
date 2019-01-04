<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data(){
    return{

    }
  },
  mounted () {

  }
}
</script>

<style>
  @import "../static/css/main.css";
  @import "../static/css/reset.css";
  #app {
    font-family: "pingFangSC-Regular";
  }
  .swiper-pagination-bullet{
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #FFF;
    opacity:1;
    margin-left:1rem;
  }
  .swiper-pagination-bullet-active{
    background:#FF5601;
    transform: scale(1.8);
  }
</style>
