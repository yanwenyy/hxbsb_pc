<template>
  <div class="mask-layer">
    <div class="issue-quesition-suc">
      <div class="close-mask-layer">
        <span class="inline-block close-square" v-on:click="close_ml()">
        </span>
      </div>
      <div class="success-box box-sizing">
        <div class="suc-txt">
          <img src="../../../static/img/icon_success.png"/>
          <h4>问题发布成功</h4>
          <p>可在我的提问查看回答,下载APP可及时接收回答消息和更多服务</p>
        </div>
        <div class="card">
          <img src="../../../static/img/qr-app.png" onerror="javascript:this.src='./static/img/qr-app.png';"/>
          <p>扫描二维码下载APP</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

    export default {
      name: "suc-dialog",
      methods:{
        close_ml:function () {
          $(".mask-layer").hide();
          this.$router.push({name:'mineQuestion'})
        }
      }
    }
</script>

<style scoped>
  .issue-quesition-suc{
    background:rgba(255,255,255,1);
    border-radius:6px;
    width: 24rem;
    height: 18rem;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .success-box{
    text-align: center;
    width: 100%;
    margin-top: 1.8rem;
    color: #999999;
  }
  .success-box .suc-txt{
    width: 14rem;
    height: 7.56rem;
    float: left;
    padding: 0.5rem 5rem;
  }
  .success-box .suc-txt h4{
    font-size: 1.3rem;
    color: #2D86FD;
    margin: 0.65rem 0;
  }
  .success-box .suc-txt p{
    font-size: 0.875rem;
    line-height: 1.2rem;
  }
  .success-box .suc-txt img{
    width: 2.4rem;
    height: 2.4rem;
  }
  .success-box .card{
    width: 24rem;
    height: 8.56rem;
    font-size: 0.625rem;
  }
  .success-box .card img{
    width: 5rem;
    height: 5rem;
    margin-bottom: 0.5rem;
  }
</style>
