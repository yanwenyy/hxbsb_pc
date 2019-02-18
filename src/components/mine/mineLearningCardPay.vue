<template>
  <div class="container" style="min-height:35.31rem;height:auto">
    <BreadNav :breadName="title"></BreadNav>
    <div class="pay-title">
      学习顾问卡购买: <span class="orange"><span style="font-size: 0.5rem">¥</span>{{card_money}}元</span>
    </div>
    <div class="card-sel">
      <div class="inline-block cursor" v-for="item in card_list" @click="card_click(item)">
        <img src="../../../static/img/card-selected.png" v-if="card_money==item.currentPrice" alt="">
        <div class="card-sel-list box-sizing">
          <img :src="showImg_src+item.cardImage" alt="">
          <div class="inline-block">￥{{item.currentPrice}}</div>
        </div>
      </div>
      <!--<div class="inline-block cursor" @click="card_click(200)">-->
        <!--<img src="../../../static/img/card-selected.png" alt="" v-if="card_money==200" >-->
        <!--<div class="card-sel-list box-sizing">-->
          <!--<img src="../../../static/img/card-200.png" alt="">-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="inline-block cursor" @click="card_click(500)">-->
        <!--<img src="../../../static/img/card-selected.png" alt=""  v-if="card_money==500" >-->
        <!--<div class="card-sel-list box-sizing">-->
          <!--<img src="../../../static/img/card-500.png" alt="">-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="inline-block cursor" @click="card_click(1000)">-->
        <!--<img src="../../../static/img/card-selected.png" alt=""  v-if="card_money==1000" >-->
        <!--<div class="card-sel-list box-sizing">-->
          <!--<img src="../../../static/img/card-1000.png" alt="">-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="pay-title">
      支付方式:
    </div>
    <div class="pay-sel">
      <div class="inline-block">
        <img src="../../../static/img/pay-selected.png" alt="">
        <div class="pay-method-list box-sizing">
          <img src="../../../static/img/pay_wechat.png" alt="">
          <div>
            <div class="pay-method-list-name">微信支付</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wexin-code">
      <div class="pay-wexin-code-name">
        <img src="../../../static/img/pay_wechat.png" alt="">
        扫码支付, 支付<span>{{card_money}}</span>元
      </div>
      <div class="pay-wexin-code-img box-sizing">
        <div class="code-img-show" id="qrcode"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import BreadNav from '@/components/breadNav'
  import QRCode from 'qrcodejs2'
    export default {
        name: "mine-learning-card-pay",
        components: {
          BreadNav,
        },
      data () {
        return{
          title:"我的资料>学习顾问卡购买",
          card_money:'',
          card_list:[],
          //订单定时器
          timer:'',
        }
      },
      mounted(){
          var that=this;
          this.ajax_nodata(this.http_url.url+"/pay/card",function(data){
            that.card_list=data.vipCards;
            that.card_money=that.card_list[0].currentPrice;
            that.ajax(that.http_url.url+"/pay/buyCard",{
              "uuid":that.card_list[0].uuid,
              "source":2,
              "payType":"weixin",
              "originalPrice":that.card_list[0].originalPrice,
              "currentPrice":that.card_list[0].currentPrice,
              "invoiceStatus":0,
              "cardStyle":that.card_list[0].cardStyle,
            },function(data){
              that.show_code(data.codeUrl);
              that.check_order(data);
            });
          });
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once('hook:beforeDestroy', () => {
          clearInterval(this.timer);
          this.timer=null;
        });
      },
      methods:{
        card_click:function(val){//充值卡类型点击
          var that=this;
          this.card_money=val.currentPrice;
          $("#qrcode").html("");
          this.ajax(this.http_url.url+"/pay/buyCard",{
            "uuid":val.uuid,
            "source":2,
            "payType":"weixin",
            "originalPrice":val.originalPrice,
            "currentPrice":val.currentPrice,
            "invoiceStatus":0,
            "cardStyle":val.cardStyle,
          },function(data){
            that.show_code(data.codeUrl);
            that.check_order(data);
          });
        },
        //生成二维码
        show_code:function (val) {
          var qrcode = new QRCode('qrcode', {
            text: 'your content',
            width: 256,
            height: 256,
            colorDark : '#000000',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
          });
          // 使用 API
          qrcode.clear();
          qrcode.makeCode(val);
        },
        //查询订单
        check_order:function(str){
          var that=this;
          this.timer=setInterval(function(){
            that.ajax(that.http_url.url+"/api/wxPC/queryOrder",{
              "appId": str.appId,
              "mchId": str.partnerid,
              "orderMchNo": str.orderNo,
              "nonceStr": str.nonceStr,
              "sign": str.sign
            },function(data){
              if(data.code==1){
                clearInterval(that.timer);
                that.timer=null;
                that.$router.push({name:'mineLearningCard'});
              }
            })
          },3000)
        },
      }
    }
</script>

<style scoped>
  .card-sel-list>div{
    height:2.125rem;
    line-height: 2.125rem;
    border-left: 1px solid #eee;
    margin-left:1.5rem ;
    margin-top: 7px;
    padding-left:1.25rem ;
  }
  .card-sel-list>img{
    width:4.8rem;
    height:3rem;
  }
  .pay-title>span{
    font-weight: bold;
  }
  .card-sel-list{
    width:98.2%;
    height:98%;
    position: absolute;
    top:1%;
    left:1%;
    text-align: center;
    padding:0.75rem 0;
    border: 1px solid #eee;
  }
  .card-sel>div{
    width: 12.31rem;
    height:4.75rem;
    position: relative;
    margin-right: 2.06rem;
  }
  .card-sel>div>img{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
  }
  .pay-title{
    margin: 1.19rem 0 1.25rem 0;
    font-size:0.875rem;
    color:#333;
    font-weight: 400;
  }
  .pay-title-money{
    font-size:0.75rem ;
    margin-left: 0.75rem;
  }
  .pay-title-money>span{
    font-size: 1rem;
  }
  .pay-sel>div{
    width:7.875rem;
    height:7.875rem;
    position: relative;
    margin-right: 0.625rem;
  }
  .pay-sel>div>div,.pay-sel>div>img{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
  }
  .pay-method-list{
    text-align: center;
    font-size: 0.625rem;
    border: 1px solid #eee;
    border-radius: 2px;
  }
  .pay-method-list>img{
    position: absolute;
    bottom: 4.125rem;
    left:2.625rem;
  }
  .pay-method-list>div{
    position: absolute;
    top: 5.125rem;
    width:100%;
  }
  .pay-method-list-name{
    color:#333;
    font-size: 0.875rem;
    font-weight: 400;
    margin-bottom: 0.44rem;
  }
  .pay-wexin-code{
   text-align: center;
    font-size: 0.875rem;
    color:#333;
    margin: 1rem auto;
  }
  .pay-wexin-code-name>img{
    width:1rem;
    height:0.875rem;
    vertical-align: middle;
  }
  .pay-wexin-code-name span{
    font-size: 1.25rem;
  }
  .pay-wexin-code-img{
    width:10.625rem;
    height:10.625rem;
    border:1px solid #eee;
    padding:0.625rem;
    margin: 1rem auto;
  }
  .code-img-show >>> canvas,.code-img-show >>> img{
    width:100%!important;
    height:100%!important;
  }
  .code-img-show{
    width:100%;
    height:100%;
  }
  .pay-btn{
    width:7.5rem;
    height:2rem;
    line-height: 2rem;
    text-align: center;
    background:rgba(45,134,253,1);
    border-radius:2px;
    color:#fff;
    font-size: 0.875rem;
    margin-top: 1.69rem;
  }
</style>
