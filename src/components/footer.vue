<template>
    <div>
      <div id="footer" class="box-sizing">
        <div class="container">
          <div class="inline-block footer-msg">
            <img src="../../static/img/footer-logo.png" class="footer-logo" alt="">
            <div class="about-us-footer">
              <span>联系我们</span>
              <span>Tel：010-57797504</span>
              <span>Email：jsb@jieshuibao.com</span>
            </div>
            <div style="text-align: left">©2018 北京解税宝科技有限公司版权所有，并保留所有权利</div>
            <div style="text-align: left">京ICP备 16029821号-1</div>
          </div>
          <div class="inline-block">
            <div class="inline-block footer-code-group">
              <img src="../../static/img/footer-code-wx.jpg" alt="">
              <div>扫描二维码</div>
              <div>关注微信公众号</div>
            </div>
            <div class="inline-block footer-code-group">
              <img src="../../static/img/footer-code-app.jpg" alt="">
              <div>扫描二维码</div>
              <div>下载刷刷APP</div>
            </div>
          </div>
        </div>
        <!--<div>-->
          <!--<img src="../../static/img/footer-logo.png" class="footer-logo" alt="">-->
          <!--<div class="inline-block about-us-footer">-->
            <!--<span>联系我们</span>-->
            <!--<span>电话：010-57797504</span>-->
            <!--<span>邮箱：jsb@jieshuibao.com</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div>©2018 北京解税宝科技有限公司版权所有，并保留所有权利</div>-->
        <!--<div>京ICP备 16029821号-1</div>-->
      </div>
    </div>
</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style scoped>
  .footer-msg{
    text-align: left!important;
  }
  #footer>.container{
    display: flex;
    justify-content: space-between;
  }
  .footer-code-group{
    width:6.125rem;
    vertical-align: top;
    font-size: 0.75rem;
    margin-right: 2.62rem;
  }
  .footer-code-group>img{
    width:100%;
    height:6.125rem;
    margin-bottom: 0.68rem;
    opacity: 0.7;
  }
  .footer-logo{
    width: 10.5rem;
    height: 2.38rem;
    vertical-align: middle;
    margin-bottom: 2rem;
  }
  .about-us-footer{
    text-align: left!important;
    font-size: 1rem;
    margin-bottom: 1rem!important;
  }
  .about-us-footer>span:nth-child(1){
    border-right: 1px solid #999;
    padding-right: 0.81rem;
  }
  .about-us-footer>span{
    margin-right: 1rem;
    color:#999;
  }
  .about-us-footer>span:nth-child(1){
    font-size: 1rem;
  }
</style>
