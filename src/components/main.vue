<template>
  <div class="main">
    <Header></Header>
      <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/header'
  import Footer from '@/components/footer'
    export default {
        name: "main",
        components:{
          Header,
          Footer
        },
        watch:{
          $route(to,from){
            // console.log(to.path);
            if(to.path=="/video"||to.path=="/smallClass"){
              $(".ask-index").hide();
            }else{
              $(".ask-index").show();
            }
          }
        },
    }
</script>

<style scoped>


</style>
