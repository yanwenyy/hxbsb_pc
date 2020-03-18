<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的钱包"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="mine-data-head box-sizing">
          <div class="home-model-header">
            <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的钱包</div>
          </div>
          <div>
            <div class="inline-block user-money-msg">
              <div>可用余额（元）</div>
              <div>¥<span class="orange">{{parseFloat(balance).toFixed(2)}}</span></div>
              <div>*提示：请下载刷刷APP进行提现。</div>
            </div>
            <div class="inline-block money-record box-sizing">
              <!--<div class="inline-block money-tx">-->
                <!--<img src="../../../static/img/download-app.png" alt="">-->
              <!--</div>-->
              <div class="inline-block">
                <div class="total-record-name">总收入（元）</div>
                <div>¥<span>{{parseFloat(incomeSum).toFixed(2)}}</span></div>
              </div>
              <div class="inline-block">
                <div class="total-record-name">总支出（元）</div>
                <div>¥<span>{{parseFloat(outpaySum).toFixed(2)}}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mine-data-body box-sizing">
          <div class="home-model-header">
            <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>交易记录</div>
          </div>
          <table class="mine-ques-table box-sizing">
            <tr>
              <td width="25">类型</td>
              <td width="25">收支类型</td>
              <td width="20">支付完成日期</td>
              <td width="20">金额</td>
            </tr>
            <tr class="mine-ques-tr box-sizing" v-for="item in records">
              <td>{{item.goodsType}}</td>
              <td>{{item.tradeType==1? '支出':'收入'}}</td>
              <td>{{format(item.paySucTime)}}</td>
              <td>{{item.tradeType==1? '-':'+'}}{{parseFloat(item.sum).toFixed(2)}}元</td>
            </tr>
          </table>
          <div id="page" class="paging"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
        name: "mine-bag",
        components:{
          mineLeft,
        },
      data(){
          return{
            start:1,
            end:10,
            //余额显示
            balance:0,
            //总收入
            incomeSum:0,
            //总支出
            outpaySum:0,
            //交易记录
            records:[],
            //总页数
            count:''
          }
      },
      mounted(){
        //余额
        this.ajax_nodata(this.http_url.url+"/user/message",this.get_balance);
        // var data=JSON.parse(sessionStorage.getItem("userMessage"));
        // this.balance=data.balance;
        //交易记录
        this.ajax(this.http_url.url+"/flow/sumRecording",{
          "sinceId":this.start,
          "maxId":this.end,
          "articleType":"all",
          "payType":"wallet"
        },this.get_msg);
      },
      methods:{
          //获取余额
        get_balance:function(data){
          this.balance=data.balance;
        },
          //交易记录
        get_msg:function(data){
          // console.log(data);
          this.incomeSum=data.incomeSum||0;
          this.outpaySum=data.outpaySum||0;
          this.records=data.records;
          this.count=data.count/10;
          this.page(this.count);
        },
        //分页
        page:function(data){
          var that=this;
          $("#page").paging({
              total: data,
              numberPage: 1
            },
            function(msg) {
              //回调函数 msg为选中页码
              // tab(msg);
              that.start=((msg-1)*10)+1;
              that.end=msg*10;
              that.ajax(that.http_url.url+"/flow/sumRecording",{
                "sinceId":that.start,
                "maxId":that.end,
                "articleType":"all",
                "payType":"wallet"
              },that.page_msg)
            });
        },
        //分页回调
        page_msg:function(data){
          this.records=data.records;
        }
      }
    }
</script>

<style scoped>
  .mine-ques-tr{
    height:2.625rem;
  }
  .mine-right{
    background: #F4F6F8;
    box-shadow:none;
    padding-left: 0;
  }
  .mine-data-head{
    height:10.75rem;
    width:100%;
    background: #fff;
    box-shadow:0px 1px 8px 0px rgba(54,177,255,0.1);
    border-radius:4px;
    margin-bottom: 1rem;
    padding:0 0.875rem;
  }
  .mine-data-body{
    min-height:30.69rem;
    height: auto;
    width:100%;
    background: #fff;
    box-shadow:0px 1px 8px 0px rgba(54,177,255,0.1);
    border-radius:4px;
    padding:0 0.875rem 1rem 0.875rem;
  }
  .money-tx>img {
    margin-top: -0.95rem;
  }
</style>
