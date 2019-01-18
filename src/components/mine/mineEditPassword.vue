<template>
    <div class="mine-body box-sizing">
      <div class="container">
        <div class="mine-left inline-block box-sizing">
          <mineLeft msg="设置密码"></mineLeft>
        </div>
        <div class="mine-right inline-block box-sizing">
          <div class="home-model-header">
            <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>设置密码</div>
          </div>
          <div class="mine-right-body">
            <ul class="mine-edit-password-ul">
              <!--<li>-->
                <!--<span class="inline-block">旧密码:</span>-->
                <!--<input type="text" placeholder="输入旧密码" class="box-sizing">-->
              <!--</li>-->
              <li>
                <span class="inline-block">新密码:</span>
                <input type="password" placeholder="输入6-15位数字或字母" v-model="password" class="box-sizing">
              </li>
              <li>
                <span class="inline-block">确认新密码:</span>
                <input type="password" placeholder="确认新密码" v-model="passwordConfirm" class="box-sizing">
              </li>
              <li>
                <span class="inline-block"></span>
                <div class="sub-password inline-block cursor" @click="sub()">完  成</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import mineLeft from '@/components/mineLeft'
    export default {
        name: "mine-edit-password",
        components:{
          mineLeft
        },
        data(){
            return{
              password:'',
              passwordConfirm:''
            }
        },
        mounted(){

        },
        methods:{
          //密码提交
          sub:function(){
            // console.log(this.password+"..."+this.passwordConfirm);
            var that=this;
            if(this.password==""||this.passwordConfirm==""){
              alert("密码不能为空")
            }else if(this.password!=this.passwordConfirm){
              alert("两次密码输入不一致")
            }else{
              $.ajax({
                type:"POST",
                url:this.http_url.url+"/upatePwd",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json;charset=utf-8",
                  "cookieId":sessionStorage.getItem("cookieId"),
                  "version":"1"
                },
                data:JSON.stringify({
                  "newPwd":md5(that.password),
                  "updateType":"0"
                }),
                success:function(data){
                  if(data.code=="1"){
                    alert(data.des);
                  }else{
                    alert(data.des);
                  }

                },
                error:function(){
                  console.log("程序出错,请重试");
                }
              })
            }
          }
        }
    }
</script>

<style scoped>
  .mine-edit-password-ul{
    margin-top: 1rem;
  }
.mine-edit-password-ul>li{
  text-align: center;
  margin-bottom: 0.875rem;
  width: 80%;
}
.mine-edit-password-ul>li>span{
  width:20%;
  color:#666;
  font-weight: 400;
  font-size: 0.875rem;
  vertical-align: middle;
  text-align: right;
}
.mine-edit-password-ul>li>input{
  width:12.31rem;
  height:2.25rem;
  padding:0 0.875rem;
  border:1px solid rgba(221,221,221,1);
  border-radius: 2px;
  font-size: 0.875rem;
}
  .sub-password{
    width:12.31rem;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    background: #2D86FD;
    color:#fff;
    font-size: 0.875rem;
    border-radius:2px
  }
</style>
