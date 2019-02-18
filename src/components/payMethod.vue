<template>
  <div class="container" style="min-height:35.31rem;height:auto">
    <BreadNav :breadName="title"></BreadNav>
    <div class="pay-title">
      <span class="pay-title-name">{{source}}</span>金额支付:
      <span class="pay-title-money orange">¥<span>{{price}}</span>元</span>
    </div>
    <div class="pay-sel">
      <div class="inline-block" @click="pay_click('bag')">
        <img src="../../static/img/pay-selected.png" alt=""  v-if="bag">
        <div class="pay-method-list box-sizing">
          <img src="../../static/img/pay_bag.png" alt="">
          <div>
            <div class="pay-method-list-name">我的钱包</div>
            <div class="orange">余额:{{parseFloat(bag_money).toFixed(2)}}</div>
          </div>
        </div>
      </div>
      <div class="inline-block" @click="pay_click('card')">
        <img src="../../static/img/pay-selected.png" alt=""  v-if="card">
        <div class="pay-method-list box-sizing">
          <img src="../../static/img/pay_card.png" alt="">
          <div>
            <div class="pay-method-list-name">学习顾问卡</div>
            <div class="orange">余额:{{parseFloat(card_money).toFixed(2)}}</div>
          </div>
        </div>
      </div>
      <div class="inline-block" @click="pay_click('qa')" v-if="cswdc">
        <img src="../../static/img/pay-selected.png" alt=""  v-if="qa">
        <div class="pay-method-list box-sizing">
          <img src="../../static/img/pay_qa.png" alt="">
          <div>
            <div class="pay-method-list-name">财税问答卡</div>
            <div class="orange">余额:{{parseFloat(qa_money).toFixed(2)}}</div>
          </div>
        </div>
      </div>
      <div class="inline-block" @click="pay_click('wexin')">
        <img src="../../static/img/pay-selected.png" alt="" v-if="wexin">
        <div class="pay-method-list box-sizing">
          <img src="../../static/img/pay_wechat.png" alt="">
          <div>
            <div class="pay-method-list-name">微信支付</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wexin-code" v-if="wexin">
      <div class="pay-wexin-code-name">
        <img src="../../static/img/pay_wechat.png" alt="">
        扫码支付, 支付<span>{{price}}</span>元
      </div>
      <div class="pay-wexin-code-img box-sizing">
        <div class="code-img-show" id="qrcode"></div>
      </div>
    </div>
    <div class="pay-btn" v-if="btn_show" @click="normal_pay()">
      确认支付 <span>{{price}}</span>元
    </div>
    <Diglog v-show="suc_show"></Diglog>
  </div>
</template>

<script>
  import BreadNav from '@/components/breadNav'
  import QRCode from 'qrcodejs2'
  import Diglog from '@/components/askQuestion/sucDialog'
    export default {
      name: "pay-method",
      components: {
        BreadNav,
        Diglog
      },
      data () {
        return{
          suc_show:false,
          price:"",
          source:"",
          title:"",
          cswdc:false,//是否显示财税问答卡支付
          //钱包余额
          bag_money:'',
          //学习顾问卡余额
          card_money:'',
          wexin:false,
          bag:true,
          card:false,
          qa:false,
          btn_show:true,
          //支付类型
          payType:'balance',
          //二维码图片
          codeUrl:'',
          //订单定时器
          timer:'',
          //公众号appid
          appId:'',
          //商户号
          partnerid:'',
        //  商户订单号
          orderNo:'',
          //随机字符串
          nonceStr:'',
          //签名
          sign:'',
          //围观信息
          weiguan_msg:'',
          qa_money:0
        }
      },
      mounted () {
        // console.log(this.$route.query.msg);
        this.price=this.$route.query.price;
        this.source=this.$route.query.source;
        this.title="首页> "+this.$route.query.source+" > 支付";
        var data=JSON.parse(decodeURIComponent(this.$route.query.data));

        if(this.source=="围观"){
          this.weiguan_msg=this.$route.query.data;
          console.log(this.weiguan_msg);
          this.ajax(this.http_url.url+"/onlook/look/buy",{
            "uuid":data.uuid,
            "payType":"weixin",
            "money":this.$route.query.price,
            "source":2
          },this.wexin_pay);
        }else if(this.source=="我要提问"){
          this.cswdc=true;
          data.payType="weixin";
          data.source=2
          this.ajax(this.http_url.url+"question/releaseQuestion",data,this.wexin_pay);
        }else if(this.source=="微课"){
          console.log(this.$route.query)
          this.ajax(this.http_url.url+"video/buy",{
            "videoId":data.videoId,
            "payType":"weixin",
            "money":data.money,
            "source":2
          },this.wexin_pay);
        }
        //余额查询
        this.ajax_nodata(this.http_url.url+"/user/message",this.get_money);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once('hook:beforeDestroy', () => {
          clearInterval(this.timer);
          this.timer=null;
        });
      },
      methods: {
        //余额查询
        get_money:function(data){
          console.log(data);
          this.bag_money=data.balance;
          this.card_money=data.vipBalance;
          this.qa_money=data.qacardBlance;
        },
        //扫码支付
        wexin_pay:function(data){
          console.log(data);
          if(data.code==1){
            this.codeUrl=data.codeUrl;
            this.appId=data.appId;
            this.partnerid=data.partnerid;
            this.orderNo=data.orderNo;
            this.nonceStr=data.nonceStr;
            this.sign=data.sign;
            this.show_code(this.codeUrl);
            this.check_order();
          }else{
            alert(data.des);
          }
        },
        //查询订单
        check_order:function(){
          var that=this;
          var data_msg=JSON.parse(decodeURIComponent(that.$route.query.data));
          function get_msg(data){
            // console.log(data);
            // console.log(data_msg)
            if(data.code==1){
                if(that.$route.query.source=="我要提问"){
                  that.suc_show=true
                }else {
                  alert("支付成功");
                  if (that.$route.query.source == "围观") {
                    that.$router.push({
                      name: that.$route.query.url,
                      query: {
                        uuid: data_msg.uuid
                      }
                    })
                  } else if(that.$route.query.source=="微课"){
                    that.ajax(that.http_url.url+'video/vid',{id:data_msg.videoId},function (e) {
                      console.log(e.data.vid);
                      that.$router.push({name:that.$route.query.url,query:{vid:e.data.vid,pagetype:'pay'}})
                    })
                  }else {
                    that.$router.push({
                      name: that.$route.query.url,
                      query: {
                        uuid: data_msg.uuid
                      }
                    })
                  }
                }
            }
          };
          var that=this;
          this.timer=setInterval(function(){
            that.ajax(that.http_url.url+"/api/wxPC/queryOrder",{
               "appId": that.appId,
               "mchId": that.partnerid,
               "orderMchNo": that.orderNo,
               "nonceStr": that.nonceStr,
               "sign": that.sign
             },get_msg)
          },3000)
        },
        //钱包或学习顾问卡支付
        normal_pay:function(){
          var that=this;
          var data_msg=JSON.parse(decodeURIComponent(that.$route.query.data));
          data_msg.payType=this.payType;
          function get_msg(data){
            if(data.code==1){
              if(that.$route.query.source=="我要提问"){
                that.suc_show=true
              }else{
                alert("支付成功");
                if(that.$route.query.source=="围观"){
                  console.log(that.$route.query.source)
                  that.$router.push({
                    name:that.$route.query.url,
                    query:{
                      uuid:data_msg.uuid
                    }
                  })
                }else{
                  that.$router.push({
                    name:that.$route.query.url,
                  })
                }
              }
            }else{
              alert(data.des);
            }
          }
          //微课支付成功跳转播放页
          function go_video(data){
            if(data.code==1){
              alert("支付成功");
              that.ajax(that.http_url.url+'video/vid',{id:data_msg.videoId},function (e) {
                // console.log(e.data.vid);
                that.$router.push({name:that.$route.query.url,query:{vid:e.data.vid,pagetype:'pay'}})
              })
            }else{
              alert(data.des);
            }
          }
          //this.$route.query.data
          if(this.source=="围观"){
              this.ajax(this.http_url.url+"/onlook/look/buy",data_msg,get_msg)
          }else if(this.source=="我要提问"){
            this.ajax(this.http_url.url+"question/releaseQuestion",data_msg,get_msg)
          }else if(this.source=="微课"){
            this.ajax(this.http_url.url+"video/buy",data_msg,go_video)
          }
        },
        //支付方式点击
        pay_click:function(msg){
          var that=this;
          if(msg=="wexin"){//微信支付
              this.wexin=true;
              this.bag=false;
              this.card=false;
              this.btn_show=false;
              this.qa=false;
            this.payType="weixin";
              setTimeout(function(){that.show_code(that.codeUrl);},1);
              // this.check_order();
          }else {
            this.btn_show=true;
            if(msg=="bag"){//钱包支付
              this.bag=true;
              this.wexin=false;
              this.card=false;
              this.qa=false;
              this.payType="balance";
              clearInterval(this.timer);
              this.timer=null;
            }else if(msg=="card"){//学习顾问卡卡支付
              this.card=true;
              this.wexin=false;
              this.payType="VipBalance";
              this.bag=false;
              this.qa=false;
              clearInterval(this.timer);
              this.timer=null;
            }else if(msg=="qa"){
              this.qa=true;
              this.card=false;
              this.wexin=false;
              this.payType="QACardBalance";
              this.bag=false;
              clearInterval(this.timer);
            }
          }
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
      }
    }
</script>

<style scoped>
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
    margin: 1.81rem 0 0 7.69rem;
    font-size: 0.875rem;
    color:#333;
    width:10.625rem;
    text-align: center;
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
    margin-top: 1rem;
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
