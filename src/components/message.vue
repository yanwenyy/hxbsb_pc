<template>
  <div class="message-bg" v-if="visible">
    <div class="alert-model" v-if="!confirm">
      <div class="meg-div">
        <span v-if="type==1" class="green">
        {{message}}
      </span>
        <span v-if="type==2" class="red">
        {{message}}
      </span>
      </div>
      <div class="notice">{{time}}s后自动关闭</div>
    </div>
    <div class="confirm-model alert-model" v-if="confirm">
      <div class="meg-div">
         <span class="green">
                {{message}}
         </span>
      </div>
      <div class="confirm-btn">
        <div class="inline-block c-sub cursor" @click="visible=false;confirm=false;confirm_sub()">{{btnMsg}}</div>
        <div class="inline-block c-cancel cursor" @click="visible=false;confirm=false;">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Router from '../../src/router/index'
  export default {
    data() {
      return {
        visible: false,
        message: '',
        type:1,
        time:3,
        confirm:false,
        confirm_url:'',
        btnMsg:'确定'//确认按钮文字
      };
    },
    methods:{
      //确认按钮点击
      confirm_sub:function(){
        Router.push({name:this.confirm_url})
        // this.confirm_url!=''? this.$router.push({name:'mineData'}):'';
      }
    }
  }
</script>
<style>
  .confirm-btn>div{
    width: 4rem;
    height:2rem;
    line-height: 2rem;
    text-align: center;
    color:#fff;
    border-radius: 4px;
    margin-top: 1rem;
  }
  .confirm-btn>a{
    width: 4rem;
    height:2rem;
    line-height: 2rem;
    text-align: center;
    color:#fff;
    border-radius: 4px;
    margin-top: 1rem;
    background: #2D86FD;
    margin-right: 1rem;
  }
  .c-sub{
    background: #2D86FD;
    margin-right: 1rem;
  }
  .c-cancel{
    background: #ddd;
  }
  .meg-div{
    margin-top: 2rem;
    line-height: 1.125rem;
  }
  .notice{
    font-size: 0.6rem;
    margin-top: 3%;
  }
  .message-bg{
    background: rgba(0,0,0,.3);
    position: fixed;
    top:0;
    width:100%;
    height:100%;
    z-index: 9999999;
  }
  .alert-model{
    position: absolute;
    top:20%;
    left:40%;
    width:20%;
    height:100px;
    background: #fff;
    z-index: 9999999;
    text-align: center;
    border:1px solid #eee;
    border-radius: 5px;
    color:#333;
    font-size: 0.875rem;
    padding:1rem;
  }
  .green{
    color:green
  }
  .red{
    color:red;
  }
  .confirm-model{
    height:120px;
  }
</style>
