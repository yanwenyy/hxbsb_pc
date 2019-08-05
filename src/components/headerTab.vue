<template>
  <div id="head-title">
    <div class="container">
      <div class="inline-block" @click="headT_click('首页')"  :class=" msg=='首页'? 'title_act':''"><router-link :to="{ name: 'Home',params: { msg: 'sy'}}"><span class="box-sizing" >首页</span></router-link></div>
      <div class="inline-block" @click="headT_click('专家')" :class=" msg=='专家'? 'title_act':''" ><router-link :to="{ name: 'expert'}"><span class="box-sizing" >专家</span></router-link></div>
      <div class="inline-block" @click="headT_click('机构')"  :class=" msg=='机构'? 'title_act':''"><router-link :to="{ name: 'mechanismlist'}"><span class="box-sizing" >机构</span></router-link></div>
      <div class="inline-block" @click="headT_click('问答库')"  :class=" msg=='问答库'? 'title_act':''"><router-link :to="{ name: 'quesAnswerBank'}"><span  class="box-sizing" >问答库</span></router-link></div>
      <div class="inline-block" @click="headT_click('大咖访谈')" :class=" msg=='大咖访谈'? 'title_act':''"><router-link :to="{ name: 'masterInterview'}"><span class="box-sizing" >大咖访谈</span></router-link></div>
      <div class="inline-block" @click="headT_click('微课')"  :class=" msg=='微课'? 'title_act':''"><router-link :to="{ name: 'smallClass'}"><span class="box-sizing" >微课</span></router-link></div>
      <!--<div class="inline-block" @click="headT_click"><router-link :to="{ name: 'privateQuestion'}"><span :class=" msg=='私密问'? 'title_act':''" class="box-sizing" >私密问</span></router-link></div>-->
      <!--<div class="inline-block" @click="headT_click('联系我们')"><router-link :to="{ name: 'about'}"><span :class=" msg=='联系我们'? 'title_act':''" class="box-sizing" >联系我们</span></router-link></div>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "header-tab",
        data () {
          return {
            title_code:1,
          }
        },
        props: {
          msg: String,
          required: true
        },
        mounted () {
        },
        methods:{
          //head点击
          headT_click:function(e){
            // console.log(e);
            if(e!=""){
              _czc.push(["_trackEvent",e,"点击"]);
            }
            $(".search-input-header>input").val('');
            if(this.$route.path=="/smallClass"){
              $(".header-search-answer").html("搜索视频");
              // $(".header-search-ques").hide();
              $(".ask-index").hide();
            }else if(this.$route.path=="/expert"||this.$route.path=="/expertSearch"||this.$route.path=="/expertHomepage"){
              $(".header-search-answer").html("搜索专家");
            }else if(this.$route.path=="/mechanismlist"||this.$route.path=="/mechanismDetail"){
              $(".header-search-answer").html("搜索机构");
            }else{
              $(".header-search-answer").html("搜索答案");
              // $(".header-search-ques").show();
              $(".ask-index").show();
            }
          },
        }
    }
</script>

<style scoped>

</style>
