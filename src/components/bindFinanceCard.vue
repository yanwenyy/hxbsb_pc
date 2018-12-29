<template>
  <div class="login-body">
    <div class="login-header">
      <div class="container">
        <img src="../../static/img/login-logo.png" alt="">
      </div>
    </div>
    <div class="login">
      <div class="login-model box-sizing">
        <div class="information-way" v-if="info">
          <div class="info-head">
            <img src="../../static/img/login-model-logo.png" alt="">
          </div>
          <div class="info-main">
            <ul>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <input type="text" placeholder="请输入卡号">
                </div>
              </li>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <input type="text" placeholder="请输入兑换码">
                </div>
              </li>
            </ul>
            <div class="login-btn">绑定</div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer" class="box-sizing">
      <div>©2018 北京解税宝科技有限公司与航天信息股份有限公司版权所有，并保留所有权利</div>
      <div>京ICP备 16029821号-1</div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "bind-finance-card",
        data(){
          return{
          }
        },
        mounted(){

        }
    }
</script>

<style scoped>
  .go-login{
    text-align: center;
    margin-top: 2rem;
  }
  .login-method-checked{
    display: flex;
    justify-content: space-between;
    margin-top: 1.19rem;
  }
  .login-must-know{
    font-size: 0.75rem;
    color:#999;
  }
  .login-btn{
    height:3.5rem;
    line-height: 3.5rem;
    text-align: center;
    color:#fff;
    font-size: 1.125rem;
    background: #2D86FD;
     border-radius: 2px;
    margin: 1.375rem 0 0.875rem 0;
  }
  .login-li input{
    border:none;
    font-size: 0.875rem;
    color:#999;
  }
  .sjyzm{
    width:3.75rem;
    height:1.75rem;
  }
  .login-li-img{
    width:60%;
  }
  .login-li-img>div{
    width:16%;
    vertical-align: middle;
  }
  .login-li{
    border-bottom: 1px solid #eee;
    padding-bottom: 0.875rem;
    margin-top:2.19rem ;
    display: flex;
    justify-content: space-between;
  }
  .info-head{
    text-align: center;
    margin: 3.06rem 0 3.69rem 0;
    font-size: 1rem;
    color:#333;
    font-weight: bold;
  }
  .info-head>img{
    width:14.5rem;
    height:3.25rem;
  }
  .login-model:before{
    display: table;
    content:'';
  }
  .login-model{
    width:31.88rem;
    height:32rem;
    background: #fff;
    margin: 4rem auto;
    box-shadow:0px 3px 8px 0px rgba(39, 39, 39, 0.35);
    border-radius:2px;
    padding:0 3.94rem;
  }
  .login-header img{
    vertical-align: middle;
  }
  .login-header{
    height:4rem;
    line-height: 4rem;
    width:100%;
    background: #fff;
  }
  .login-body{
    width:100%;
    height:120vh;
    position: absolute;
    top:0;
  }
  .login:before{
    display: table;
    content: '';
  }
  .login{
    width:100%;
    height:90%;
    background: url("/static/img/login-bg.png");

  }
</style>
