<template>
  <ul class="mine-left-ul box-sizing">
    <li class="mine-title">
      <img src="../../static/img/mine-icon.png" alt="" class="mine-icon">
      个人中心
    </li>
    <li :class="msg=='我的资料'?  'blue':''" @click="mine_left_li('mineData')">
      <span class="dot inline-block"></span>
      我的资料
    </li>
    <li :class="msg=='我的提问'?  'blue':''" @click="mine_left_li('mineQuestion')">
      <span class="dot inline-block"></span>
      我的提问
    </li>
    <li :class="msg=='我的购买'?  'blue':''" @click="mine_left_li('mineBuy')">
      <span class="dot inline-block"></span>
      我的购买
    </li>
    <li>
      <div class="mine-one-tab"  :class="msg=='我的工作台'||msg=='待抢答'||msg=='我的回答'||msg=='我的粉丝'||msg=='编辑信息'?  'blue':''" @click="userMessage.role==1? mine_left_li('mineWorkbench'):mine_left_li('mineRobAnswer')">
        <span class="dot inline-block"></span>
        我的工作台
      </div>
      <div v-show="msg=='待抢答'||msg=='我的回答'||msg=='我的粉丝'||msg=='编辑信息'">
        <div class="mine-two-tab" :class="msg=='待抢答'?  'blue':''" @click="mine_left_li('mineRobAnswer')">待抢答 <span v-show="num!=''">( {{num}} )</span></div>
        <div class="mine-two-tab" :class="msg=='我的回答'?  'blue':''" @click="mine_left_li('mineAnswer')">我的回答</div>
        <div class="mine-two-tab" :class="msg=='我的粉丝'?  'blue':''" @click="mine_left_li('mineFans')">我的粉丝</div>
        <div class="mine-two-tab" :class="msg=='编辑信息'?  'blue':''" @click="mine_left_li('mineExpertEdit')">编辑信息</div>
      </div>
    </li>
    <li>
      <div class="mine-one-tab"  :class="msg=='我的钱包'||msg=='学习顾问卡'||msg=='财税问答卡'?  'blue':''" @click="mine_left_li('mineBag')">
        <span class="dot inline-block"></span>
        我的财富
      </div>
      <div v-show="msg=='我的钱包'||msg=='学习顾问卡'||msg=='财税问答卡'">
        <div class="mine-two-tab" :class="msg=='我的钱包'?  'blue':''" @click="mine_left_li('mineBag')">我的钱包</div>
        <div class="mine-two-tab" :class="msg=='学习顾问卡'?  'blue':''" @click="mine_left_li('mineLearningCard')">学习顾问卡</div>
        <div class="mine-two-tab" :class="msg=='财税问答卡'?  'blue':''" @click="mine_left_li('mineFinanceCard')">财税问答卡</div>
      </div>
    </li>
    <li v-show="userMessage.aision!=0||userMessage.vip==1"   :class="msg=='365会员卡'?  'blue':''" @click="mine_left_li('mine365')">
      <span class="dot inline-block"></span>
      365会员卡
    </li>
    <li v-show="userMessage.aision!=0||userMessage.vip==1"  :class="msg=='开具发票'?  'blue':''" @click="mine_left_li('mineInvoice')">
      <span class="dot inline-block"></span>
      开具发票
    </li>
    <li :class="msg=='我的关注'?  'blue':''" @click="mine_left_li('mineAttention')">
      <span class="dot inline-block"></span>
      我的关注
    </li>
    <li :class="msg=='设置密码'?  'blue':''"  @click="mine_left_li('mineEditPassword')">
      <span class="dot inline-block"></span>
      设置密码
    </li>
  </ul>
</template>

<script>
    export default {
        name: "mine-left",
        props: {
          msg: String,
          required: true
        },
      data () {
        return {
          userMessage:'',
          num:'',//待抢答个数
        }
      },
        mounted () {
          var that=this;
          // this.userMessage=JSON.parse(sessionStorage.getItem("userMessage"));
          this.ajax_nodata(this.http_url.url+"/user/message",function(data){
            that.userMessage=data;
          });
          //带抢答个数
          this.ajax_nodata(this.http_url.url+"/question/waitquestionNum",function (data) {
            that.num=data.data;
          })
        },
      methods:{
        mine_left_li:function(val){
          this.$router.push({
            name:val
          })
        }
      }
    }
</script>

<style scoped>
  .mine-icon{
    vertical-align: middle;
    margin-top: -0.5rem;
  }
  .dot{
    width:4px;
    height:4px;
    background:rgba(69,110,241,1);
    border-radius:50%;
    vertical-align: middle;
  }
  .mine-left li{
    border: none;
    font-size: 1rem;
    text-align: left;
    padding-left: 3rem;
    box-sizing: border-box;
  }
  .mine-left-ul>.mine-title{
    color:#333;
    font-size: 1.25rem;
    height:3.75rem;
    line-height: 3.75rem;
    border-bottom: 1px solid #eee;
    margin-left: 0;
    padding-left: 2rem;
  }
  .mine-left-ul{
    padding-bottom: 1.5rem;
  }
</style>
