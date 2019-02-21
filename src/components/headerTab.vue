<template>
  <div id="head-title">
    <div class="container">
      <div class="inline-block" @click="headT_click"><router-link :to="{ name: 'Home',params: { msg: 'sy'}}"><span  :class=" msg=='首页'? 'title_act':''" class="box-sizing" >首页</span></router-link></div>
      <div class="inline-block" @click="headT_click"><router-link :to="{ name: 'quesAnswerBank'}"><span  :class=" msg=='问答库'? 'title_act':''" class="box-sizing" >问答库</span></router-link></div>
      <div class="inline-block" @click="headT_click"><router-link :to="{ name: 'masterInterview'}"><span :class=" msg=='大咖访谈'? 'title_act':''" class="box-sizing" >大咖访谈</span></router-link></div>
      <div class="inline-block" @click="headT_click"><router-link :to="{ name: 'smallClass'}"><span  :class=" msg=='微课'? 'title_act':''" class="box-sizing" >微课</span></router-link></div>
      <!--<div class="inline-block" @click="headT_click"><router-link :to="{ name: 'privateQuestion'}"><span :class=" msg=='私密问'? 'title_act':''" class="box-sizing" >私密问</span></router-link></div>-->
      <div class="inline-block" @click="headT_click"><router-link :to="{ name: 'about'}"><span :class=" msg=='联系我们'? 'title_act':''" class="box-sizing" >联系我们</span></router-link></div>
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
            $(".search-input-header>input").val('');
            if(this.$route.path=="/smallClass"){
              $(".header-search-answer").html("搜索视频");
              $(".header-search-ques").hide();
              $(".ask-index").hide();
            }else{
              $(".header-search-answer").html("搜索答案");
              $(".header-search-ques").show();
              $(".ask-index").show();
            }
          },
        }
    }
</script>

<style scoped>

</style>
