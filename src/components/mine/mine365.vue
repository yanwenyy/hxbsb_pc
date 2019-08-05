<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="365会员卡"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>365会员卡</div>
        </div>
        <div class="mine-right-body">
          <div class="mine-365-body box-sizing" v-if="open_365">
            <div class="inline-block mine-365-title">您还未开通365会员卡</div>
            <div class="inline-block">· 每天1元 财税无难题</div>
            <div class="inline-block mine-365-btn cursor" @click="pay_365()">立即开通</div>
          </div>
          <div class="mine-365-body box-sizing" v-if="continue_365">
            <div class="inline-block mine-365-title">您已是365会员卡</div>
            <div class="inline-block orange">· {{format(usermsg.tsfTime).split(" ")[0]}}到期 </div>
            <div class="inline-block mine-365-btn cursor" @click="pay_365()">立即续费</div>
          </div>
          <div class="mine-365-body box-sizing" v-if="dateout_365">
            <div class="inline-block mine-365-title">您的365会员卡已过期</div>
            <div class="inline-block">· {{format(usermsg.tsfTime).split(" ")[0]}}已过期</div>
            <div class="inline-block mine-365-btn cursor" @click="pay_365()">立即续费</div>
          </div>
          <div class="mine-365-model">
            <div class="mine-365-list inline-block box-sizing">
              <img src="../../../static/img/icon_pc_vip1.png" alt="">
              <div class="inline-block">
                <div>免费围观</div>
                <div>省去等待回答的过程，第一时间获取答案。</div>
              </div>
            </div>
            <div class="mine-365-list inline-block box-sizing">
              <img src="../../../static/img/icon_pc_vip2.png" alt="">
              <div class="inline-block">
                <div>免费快速问</div>
                <div>5000+专家24h在线答疑，给您最专业的回答。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
  export default {
    name: "mine365",
    components:{
      mineLeft,
    },
    data(){
      return{
        open_365:true,
        continue_365:false,
        dateout_365:false,
        usermsg:''
      }
    },
    mounted(){
      var that=this;
      this.ajax_nodata(this.http_url.url+"/user/message",function(data){
        console.log(data);
        that.usermsg=data;
        if(data.tsfTime!=null&&data.tsfTime!=''){
          that.open_365=false;
          var tt=new Date().getTime();
          if(tt>data.tsfTime){
            that.dateout_365=true;
          }else{
            that.continue_365=true;
          }
        }
      })
    },
    methods: {
      //购买365
      pay_365:function(){
        var that=this;
        this.ajax_nodata(this.http_url.url+"/vipcard/tsf",function(data){
          console.log(data);
          if(data.code==1){
            that.$router.push({name:'mine365Pay',query:{
                "uuid":data.data.uuid,
                "originalPrice":data.data.originalPrice,
                "currentPrice":data.data.currentPrice,
                "cardType":data.data.cardType,
                "cardNum":data.data.cardNum,
                "cardStyle":data.data.cardStyle
              }})
          }
        });
      }
    }
  }
</script>

<style scoped>
  .mine-365-list>div>div:nth-child(1){
    font-size: 0.94rem;
    color:#333;
    margin-bottom: 0.56rem;
    margin-top: 4px;
  }
  .mine-365-list>img{
    width:2.75rem;
    height:2.56rem;
    vertical-align: top;
    margin-right: 0.5rem;
  }
  .mine-365-list{
    width:49%;
    font-size: 0.75rem;
    color:#666;
    padding-left: 1.625rem;
  }
  .mine-365-model{
    border-top:1px dotted #eee;
    margin-top: 2.125rem;
    padding-top: 2.125rem;
  }
  .mine-365-body{
    width:100%;
    height:4rem;
    line-height: 4rem;
    background:rgba(255,251,242,1);
    border:1px solid rgba(248,238,216,1);
    border-radius:6px;
    font-size: 0.81rem;
    color:#666;
    padding:0 1.44rem;
  }
  .mine-365-title{
    font-size:1.125rem;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
  .mine-right-body{
    padding:1rem;
  }
  .mine-365-btn{
    float:right;
    width:7rem;
    height:2rem;
    line-height: 2rem;
    text-align: center;
    font-size:0.875rem;
    font-weight:bold;
    color:rgba(95,48,8,1);
    background:rgba(223,194,135,1);
    border-radius:2px;
    margin-top: 1rem;
  }
</style>
