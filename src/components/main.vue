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
            if(to.path=="/video"||to.path=="/smallClass"||to.path=="/smallClassSearch"||to.path=="/payMethod"||to.path=="/freeWatch"){
              $(".ask-index").hide();
            }else{
              $(".ask-index").show();
            };
            if(to.path=="/smallClass"){
              $(".header-search-answer").html("搜索视频");
              $(".ask-index").hide();
            }else if(to.path=="/expert"||to.path=="/expertSearch"||to.path=="/expertHomepage"){
              $(".header-search-answer").html("搜索专家");
            }else if(to.path=="/mechanismlist"||to.path=="/mechanismDetail"){
              $(".header-search-answer").html("搜索机构");
            }else{
              $(".header-search-answer").html("搜索答案");
              $(".ask-index").show();
            }
          }
        },
    }
</script>

<style scoped>


</style>
