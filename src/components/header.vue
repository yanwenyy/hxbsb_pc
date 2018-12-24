<template>
  <div>
    <div id="head-group">
      <div id="header" class="box-sizing">
        <div class="header-search box-sizing">
          <div class="container">
            <img src="../../static/img/header-logo.png" alt="" class="inline-block logo-img box-sizing">
            <div class="search-input-header inline-block">
              <input type="text" class="box-sizing" placeholder="请输入关键字" v-model="message">
              <div class="inline-block header-search-answer" @click="ques_btn()">搜索答案</div>
              <div class="inline-block header-search-ques"><router-link :to="{ name: 'askQuestion'}">我要提问</router-link></div>
            </div>
            <div class="header-user inline-block">
              <div class="inline-block h-u-name" v-on:click="user_name">
                <!--<img src="../../static/img/user-img.png" alt="">-->
                张三
                <img src="../../static/img/header-down.png"  alt="">
              </div>
              <div class="uer-sel" v-if="head_scode">
                <ul>
                  <li v-on:click="user_name_li"><router-link :to="{ name: 'mineData', params: { name:''  }}">我的资料</router-link></li>
                  <li v-on:click="user_name_li"><router-link :to="{ name: 'mineQuestion', params: { name:''  }}">我的提问</router-link></li>
                  <li v-on:click="user_name_li"><router-link :to="{ name: 'mineBuy', params: { name:''  }}">我的购买</router-link></li>
                  <li v-on:click="user_name_li"><router-link :to="{ name: 'mineBag', params: { name:''  }}">我的钱包</router-link></li>
                  <li v-on:click="user_name_li"><router-link :to="{ name: 'mineLearningCard', params: { name:''  }}">学习顾问卡</router-link></li>
                  <li v-on:click="user_name_li"><router-link :to="{ name: 'mineInvoice', params: { name:''  }}">开具发票</router-link></li>
                  <li v-on:click="user_name_li"><router-link :to="{ name: 'mineEditPassword', params: { name:''  }}">设置密码</router-link></li>
                  <li v-on:click="user_name_li"><router-link :to="{ name: 'login', params: { name:''  }}">退出</router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="head-title">
        <div class="container">
          <div class="inline-block"><router-link :to="{ name: 'Home',params: { msg: 'sy'}}"><span  :class=" title_code==1? 'title_act':''" class="box-sizing" v-on:click="headT_click(1)">首页</span></router-link></div>
          <div class="inline-block"><router-link :to="{ name: 'quesAnswerBank'}"><span  :class=" title_code==2? 'title_act':''" class="box-sizing"  v-on:click="headT_click(2)">问答库</span></router-link></div>
          <div class="inline-block"><span :class=" title_code==3? 'title_act':''" class="box-sizing"   v-on:click="headT_click(3)">大咖访谈</span></div>
          <div class="inline-block"><router-link :to="{ name: 'smallClass'}"><span  :class=" title_code==4? 'title_act':''" class="box-sizing"  v-on:click="headT_click(4)">微课</span></router-link></div>
          <div class="inline-block"><span :class=" title_code==5? 'title_act':''" class="box-sizing"  v-on:click="headT_click(5)">私密问</span></div>
          <div class="inline-block"><router-link :to="{ name: 'about'}"><span :class=" title_code==6? 'title_act':''" class="box-sizing"  v-on:click="headT_click(6)">关于我们</span></router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "header",
        data () {
          return {
            head_scode: false,
            title_code:1,
            //搜索框内容
            message:""
          }
        },
      mounted () {
        this.message=""
      },
      methods:{
          //用户名点击
        user_name:function(){
          if(this.head_scode==false){
            this.head_scode=true;
          }else{
            this.head_scode=false;
          }
        },
        //我的列表点击
        user_name_li:function(){
          this.head_scode=false;
          this.title_code=1;
        },
        //head点击
        headT_click:function(e){
            this.title_code=e;
            if(e==4){
              $(".header-search-answer").html("搜索视频");
              $(".header-search-ques").hide();
            }else{
              $(".header-search-answer").html("搜索答案");
              $(".header-search-ques").show();
            }
            if(e==3||e==5){
              alert("请下载航信办税宝app进行操作")
            }
        },
        //我要提问点击
        ques_btn:function(){
          if(this.title_code==1||this.title_code==2){
            this.$router.push({
              name: 'answerSearch',params:{msg:this.message}
            })
          }else if(this.title_code==4){
            this.$router.push({
              name: 'smallClass',params:{msg:this.message}
            })
          }
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
</style>
