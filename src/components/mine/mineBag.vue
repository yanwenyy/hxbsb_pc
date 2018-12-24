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
              <div>¥<span class="orange">100.00</span></div>
              <div>*提示：请下载解税宝APP进行提现。</div>
            </div>
            <div class="inline-block money-record box-sizing">
              <div class="inline-block money-tx">
                <img src="../../../static/img/download-app.png" alt="">
                <div>提现</div>
              </div>
              <div class="inline-block">
                <div class="total-record-name">总收入（元）</div>
                <div>¥<span>100.00</span></div>
              </div>
              <div class="inline-block">
                <div class="total-record-name">总支出（元）</div>
                <div>¥<span>100.00</span></div>
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
              <td width="25">收入类型</td>
              <td width="20">支付完成日期</td>
              <td width="20">金额</td>
            </tr>
            <tr class="mine-ques-tr box-sizing">
              <td>私密问退回</td>
              <td>收入</td>
              <td>2018-12-09 13:00：21</td>
              <td>+15.00元</td>
            </tr>
            <tr class="mine-ques-tr box-sizing">
              <td>私密问退回</td>
              <td>收入</td>
              <td>2018-12-09 13:00：21</td>
              <td>+15.00元</td>
            </tr>
            <tr class="mine-ques-tr box-sizing">
              <td>私密问退回</td>
              <td>收入</td>
              <td>2018-12-09 13:00：21</td>
              <td>+15.00元</td>
            </tr>
            <tr class="mine-ques-tr box-sizing">
              <td>私密问退回</td>
              <td>收入</td>
              <td>2018-12-09 13:00：21</td>
              <td>+15.00元</td>
            </tr>
            <tr class="mine-ques-tr box-sizing">
              <td>私密问退回</td>
              <td>收入</td>
              <td>2018-12-09 13:00：21</td>
              <td>+15.00元</td>
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
      mounted(){
        //分页插件初始化
        $("#page").paging({
            total: 20,
            numberPage: 1
          },
          function(msg) {
            //回调函数 msg为选中页码
            // tab(msg);
          });
      },
    }
</script>

<style scoped>
  .mine-ques-tr{
    height:2.625rem;
  }
  .mine-right{
    background: #F4F6F8;
    box-shadow:none;
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
    height:30.69rem;
    width:100%;
    background: #fff;
    box-shadow:0px 1px 8px 0px rgba(54,177,255,0.1);
    border-radius:4px;
    padding:0 0.875rem;
  }
</style>
