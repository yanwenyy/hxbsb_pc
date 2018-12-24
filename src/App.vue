<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/header'
  import Footer from '@/components/footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
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
  font-family: "微软雅黑";
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
