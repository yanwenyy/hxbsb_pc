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
                  <div class="inline-block"><img src="../../static/img/login-sj.png" alt=""></div>
                  <input type="text" class="phones" @blur.prevent="get_codeimg()" v-model="info_phone" placeholder="请输入手机号">
                </div>
              </li>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <div class="inline-block"><img src="../../static/img/login-txyzm.png" alt=""></div>
                  <input type="text" v-model="info_code" placeholder="图形验证">
                </div>
                <div class="inline-block" @click="info_img()">
                  <img :src="http_url.url+'/random/randCode/'+info_codeimg" alt="" class="sjyzm">
                </div>
              </li>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <div class="inline-block"><img src="../../static/img/login-dxyzm.png" alt=""></div>
                  <input type="text" v-model="info_message" placeholder="请输入短信验证码">
                </div>
                <div class="inline-block" @click="info_getcode()">
                  <span v-if="!code_status" class="blue cursor">获取验证码</span>
                  <span v-if="code_status">{{'重新发送:'+nums+"s"}}</span>
                </div>
              </li>
            </ul>
            <div class="login-method-checked">
              <div class="inline-block"></div>
              <div class="inline-block blue password_login cursor" @click="pass=true;info=false;forget_pass=false">账号密码登录</div>
            </div>
            <div class="login-btn" @click="info_sub()">注册/登录</div>
            <input type="checkbox"  v-model="agree_phone" v-on:click="agreeRule($event,1)"><div class="inline-block login-must-know cursor" @click="$router.push({name:'userAgreement'})">登录即代表同意我们的《用户使用协议和隐私政策》</div>
          </div>
        </div>
        <div class="password-way" v-if="pass">
          <div class="info-head">
            <img src="../../static/img/login-model-logo.png" alt="">
          </div>
          <div class="info-main">
            <ul>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <div class="inline-block"><img src="../../static/img/login-sj.png" alt=""></div>
                  <input type="text" v-model="pass_phone" placeholder="请输入手机号">
                </div>
              </li>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <div class="inline-block"><img src="../../static/img/login-password.png" alt=""></div>
                  <input type="password" v-model="pass_password" placeholder="请输入密码">
                </div>
              </li>
            </ul>
            <div class="login-method-checked">
              <div class="inline-block blue sjdx_login cursor" @click="pass=false;info=true;forget_pass=false">手机短信登录</div>
              <div class="inline-block blue password_login cursor" @click="pass=false;info=false;forget_pass=true">忘记密码</div>
            </div>
            <div class="login-btn" @click="pass_sub()">登录</div>
            <input type="checkbox" v-model="agree_pass" v-on:click="agreeRule($event,2)"><div class="inline-block login-must-know cursor" @click="$router.push({name:'userAgreement'})">登录即代表同意我们的《用户使用协议和隐私政策》</div>
          </div>
        </div>
        <div class="forget-password-way"  v-if="forget_pass">
          <div class="info-head">
            忘记密码
          </div>
          <div class="info-main">
            <ul>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <div class="inline-block"><img src="../../static/img/login-sj.png" alt=""></div>
                  <input type="text" class="phones" v-model="info_phone" placeholder="请输入手机号">
                </div>
              </li>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <div class="inline-block"><img src="../../static/img/login-txyzm.png" alt=""></div>
                  <input type="text" v-model="info_code" placeholder="图形验证">
                </div>
                <div class="inline-block" @click="info_img()">
                  <img  :src="http_url.url+'/random/randCode/'+info_codeimg" alt="" class="sjyzm">
                </div>
              </li>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <div class="inline-block"><img src="../../static/img/login-dxyzm.png" alt=""></div>
                  <input type="text" v-model="info_message" placeholder="请输入短信验证码">
                </div>
                <div class="inline-block" @click="info_getcode()">
                  <span v-if="!code_status" class="blue cursor">获取验证码</span>
                  <span v-if="code_status">{{'重新发送:'+nums+"s"}}</span>
                </div>
              </li>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <div class="inline-block"><img src="../../static/img/login-password.png" alt=""></div>
                  <input type="password" v-model="pass_password" placeholder="请输入密码">
                </div>
              </li>
              <li class="login-li">
                <div class="inline-block login-li-img">
                  <div class="inline-block"><img src="../../static/img/login-confirm-pass.png" alt=""></div>
                  <input type="password" v-model="password_confrim" placeholder="请确认密码">
                </div>
              </li>
            </ul>
            <div class="login-btn" @click="forget_pass_sub()">完成</div>
            <div class="go-login blue cursor" @click="pass=false;info=true;forget_pass=false">去登录</div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer" class="box-sizing">
      <div>©2018 北京解税宝科技有限公司版权所有，并保留所有权利</div>
      <div>京ICP备 16029821号-1</div>
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5'
    export default {
        name: "login",
        data(){
          return{
            info:true,//手机号登录
            pass:false,//账号密码登录
            forget_pass:false,//忘记密码
            info_codeimg:'',//手机号登录的图形验证码
            info_phone:'',//手机号登录的手机号
            info_message:'',//手机号登录的短信
            info_code:'',//手机号登录输入的图形验证码
            info_smsMessageSid:'',//获取的短信验证码的key值
            pass_phone:'',//账号密码登录的手机号
            pass_password:'',//账号密码登录的密码
            password_confrim:'',//确认输入的密码
            code_status:false,
            nums:60,
            agree_pass:true,
            agree_phone:true,
          }
        },
        mounted(){
          //获取图片验证码
          var timestamp=new Date().getTime();
          var sjstring = Math.random().toString(36).substr(2);
          var codemessages = md5(sjstring+timestamp); //手机号+时间戳的MD5加密
          this.info_codeimg=codemessages;
          // //获取图片验证码
          // $(".phones").on("blur",function(){
          //   var timestamp=new Date().getTime();
          //   var phonenum = $(".phones").val();
          //   if(phonenum == ''){
          //     alert("请输入手机号码");
          //     return false;
          //   }
          //
          //   var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
          //   if(!reg.test(phonenum) && phonenum != ''){
          //     alert("手机号码输入有误!");
          //     return false;
          //   }
          // });
        },
        methods:{
          //勾选登录协议点击
          agreeRule:function(e,val){
            if(val==1){
              //手机短信登录
              this.agree_phone=e.target.checked;
              this.agree_pass=false;
            }else if(val==2){
              //账号密码登录
              this.agree_pass=e.target.checked;
              this.agree_phone=false;
            }
            console.log("手机"+this.agree_phone);
            console.log("密码"+this.agree_pass);
          },
          //发送倒计时
          doLoop(){
            this.nums--;
            if(this.nums > 0){
              // this.code_num='重新发送('+this.nums+')';
            }else{
              clearInterval(this.clock); //清除js定时器
              this.code_status=false;
              this.nums = 60; //重置时间
            }
          },
          //图形验证码点击
          info_img:function(){
            var timestamp=new Date().getTime();
            var phonenum = $(".phones").val();
            var codemessages = md5(phonenum+timestamp); //手机号+时间戳的MD5加密
            sessionStorage.setItem("codeinfos",codemessages);
            this.info_codeimg=codemessages;
          },
          //手机号登录失焦验证
          get_codeimg:function(){
            console.log(this.info_phone);
            var that=this;
            var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if(!reg.test(this.info_phone) && this.info_phone != ''){
              // alert("手机号码输入有误!");
              that.$myToast.error("手机号码输入有误");
              return false;
            }
          },
          //手机号登录获取验证码
          info_getcode:function(){
            var that=this;
            this.ajax(this.http_url.url+"/api/sendSms",{
              "phoneNum":this.info_phone,
              "codeType":"login",
              "imgCode":this.info_code,
              "codeMessage":this.info_codeimg
            },function(data){
               //  console.log(data);
                if(data.code==1){
                  // alert("短信已发送");
                  that.$myToast.success("短信已发送");
                  that.info_smsMessageSid=data.smsMessageSid;
                  that.clock = setInterval(that.doLoop, 1000);
                  that.code_status=true;
                }else{
                  // alert(data.des);
                  that.$myToast.error(data.des);
                }
            })
          },
          //手机号登录
          info_sub:function(){
            sessionStorage.removeItem("cookieId");
            var that=this;
            if(this.info_phone==""||this.info_message==""||this.info_code==""){
              // alert("请完善信息");
              that.$myToast.error("请完整输入内容");
            }else{
              if(that.agree_phone==false){
                that.$myToast.error('请阅读并同意《用户使用协议和隐私政策》');
              }else{
                this.ajax(this.http_url.url+"/pc/login",{
                  "phoneNumber":this.info_phone,
                  "deviceType":"3",
                  "smsMessageSid":this.info_smsMessageSid,
                  "code":this.info_message
                },function(data){
                  if(data.code==1){
                    _czc.push(["_trackEvent","手机号注册登录","点击"]);
                    sessionStorage.setItem("userMessage",JSON.stringify(data));
                    sessionStorage.setItem("cookieId",data.cookieId);
                    if(data.ifNewRegist==0){
                      that.$router.push({name:"Home"});
                      sessionStorage.setItem("cookieId",data.cookieId);
                    }else{
                      that.$router.push({name:"bindFinanceCard"})
                    }
                  }else{
                    // alert(data.des);
                    that.$myToast.error(data.des);
                  }
                })
              }
            }
          },
          //账号密码登录
          pass_sub:function(){
            sessionStorage.removeItem("cookieId");
            var that=this;
            if(this.pass_phone==""||this.pass_password==''){
              // alert("请完善信息")
              that.$myToast.error("请完整输入内容");
            }else{
              if(that.agree_pass==false){
                that.$myToast.error('请阅读并同意《用户使用协议和隐私政策》');
              }else{
                this.ajax(this.http_url.url+"/pc/login",{
                  "phoneNumber":this.pass_phone,
                  "pwd":md5(this.pass_password),
                },function(data){
                  if(data.code==1){
                    // console.log(data);
                    _czc.push(["_trackEvent","账号密码登录","点击"]);
                    sessionStorage.setItem("userMessage",JSON.stringify(data));
                    sessionStorage.setItem("cookieId",data.cookieId);
                    if(data.ifNewRegist==0){
                      that.$router.push({name:"Home"});
                      sessionStorage.setItem("cookieId",data.cookieId);
                    }else{
                      that.$router.push({name:"bindFinanceCard"})
                    }
                  }else{
                    // alert(data.des);
                    that.$myToast.error(data.des);
                  }
                })
              }
            }
          },
          //忘记密码登录
          forget_pass_sub:function(){
            sessionStorage.removeItem("cookieId");
            var that=this;
            this.ajax(this.http_url.url+"/newFindPwdOne",{
              "pwd":md5(this.pass_password),
              "phoneNumber":this.info_phone,
              "code":this.info_message,
              "smsMessageSid":this.info_smsMessageSid,
              "conPwd":md5(this.password_confrim)
            },function(data){
              // console.log(data);
              if(data.code==1){
                sessionStorage.setItem("userMessage",JSON.stringify(data));
                sessionStorage.setItem("cookieId",data.cookieId);
                if(data.ifNewRegist==0){
                  // that.$router.push({name:"Home"});
                  // alert("修改成功");
                  that.$myToast.success("修改成功");
                  that.pass=true;
                  that.forget_pass=false;
                  sessionStorage.setItem("cookieId",data.cookieId);
                }else{
                  that.$router.push({name:"bindFinanceCard"})
                }
              }else{
                // alert(data.des);
                that.$myToast.error(data.des);
              }
            })
          }
        }
    }
</script>

<style scoped>
  @import "../../static/css/main.css";
  @import "../../static/css/reset.css";
  .go-login{
    text-align: center;
    margin: 2rem 0;
  }
  .login-method-checked{
    display: flex;
    justify-content: space-between;
    margin-top: 1.19rem;
  }
  .login-must-know{
    font-size: 0.75rem;
    color:#999;
    text-decoration: underline;
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
  .login-model:before,.login-model:after{
    display: table;
    content:'';
  }
  .login-model{
    width:31.88rem;
    min-height:32rem;
    height:auto;
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
</style>
