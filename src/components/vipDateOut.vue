<template>
  <div class="message-bg" v-if="status">
    <div class="alert-model box-sizing">
      <img v-on:click="close()" class="close-model cursor" src="../../static/img/icon_index_ask_vipclosed.png" alt="">
      <div class="model-title">
        <img src="../../static/img/vip_notice.png" alt="">
        <div>会员到期提醒</div>
      </div>
      <div class="model-msg" v-if="type==1">
        <div class="model-msg-title">
          尊敬的航信会员：
        </div>
        <div>
          您的 “免费问”会员权益已过有效期，延长会员权益请联系当地航天信息公司工作人员。
        </div>
      </div>
      <div class="model-msg"  v-if="type==2">
        <div class="model-msg-title">
          尊敬的365会员：
        </div>
        <div>
          您的会员已到期，当前免费问会员权益被暂时收回，继续提问将需支付15元/问题,请尽快续费找回权益！
        </div>
      </div>
      <div class="no-notice box-sizing">
        <input type="checkbox" v-on:change="notice_change($event)">
        <span>不再提醒</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "vip-date-out",
        data() {
          return {
            status:true,
            isNotice:1
          };
        },
        props: {
          type: Number,
          required: true
        },
        methods:{
          close:function(){
            this.status=false;
          },
          notice_change:function(e){
            // console.log(e.target.checked);
            if(e.target.checked==true){
              localStorage.setItem("no_vipDateout","yes");
            }else{
              localStorage.removeItem("no_vipDateout");
            }
          }
        }
    }
</script>

<style scoped>
  .no-notice{
    font-size: 0.875rem;
    color:#999;
    margin-top: 2rem;
  }
  .model-msg-title{
    font-weight: bold;
    margin-bottom: 10px;
  }
  .model-msg{
    text-align: left;
    font-size:0.875rem;
    color:#333;
    line-height:21px;
  }
  .model-title>img{
    margin-bottom: 0.75rem;
  }
  .model-title{
    text-align: center;
    margin-top: 2.125rem;
    color: #FE6D27;
    font-size: 1rem;
    margin-bottom: 1.19rem;
  }
  .close-model{
    float: right;
    margin-top:1.19rem;
    margin-right:-0.94rem;
  }
  .message-bg{
    background: rgba(0,0,0,.3);
    position: fixed;
    top:0;
    width:100%;
    height:100%;
    z-index: 9999999;
  }
  .alert-model{
    margin: 6% auto;
    width:364px;
    height:279px;
    background: #fff;
    z-index: 9999999;
    text-align: center;
    border:1px solid #eee;
    border-radius: 5px;
    color:#333;
    font-size: 1.125rem;
    padding: 0 2.125rem;
  }
</style>
