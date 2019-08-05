<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的工作台"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的工作台</div>
        </div>
        <div class="mine-right-body">
          <div class="bench-div box-sizing">
            <img src="../../../static/img/bench-icon.png" alt="">
            <div class="inline-block bench-name">
              <div>我的工作台</div>
              <div>申请成为咨询师，自由兼职更轻松</div>
            </div>
            <div class="inline-block apply-btn cursor" @click="user.status==1? $myToast.success('审核中'):$router.push({name:'expertApply'})">立即申请 ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
      name: "mine-workbench",
      components:{
        mineLeft,
      },
      data(){
        return{
          user:''
        }
      },
      mounted(){
        var that=this;
        this.ajax_nodata(this.http_url.url+"/user/message",function(data){
          that.user=data;
        });
      },
    }
</script>

<style scoped>
  .apply-btn{
    float: right;
    width:7.75rem;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    font-size: 1rem;
    color:#fff;
    background:rgba(69,110,241,1);
    border:1px solid rgba(69,110,241,1);
    border-radius:2px;
    margin-top: 1.19rem;
  }
  .bench-div>img{
    width:4.63rem;
    height:4.63rem;
    margin-right: 0.75rem;
  }
  .bench-name{
    font-size: 1rem;
    color:#999;
  }
  .bench-name>div:nth-child(1){
    font-size: 1.19rem;
    color:#555;
    margin: 1rem 0 0.69rem 0;
  }
  .bench-div{
    height:6.19rem;
    background: url("../../../static/img/bench-bg.png") no-repeat 100% 100%;
    background-size: 100% 100%;
    padding:0.81rem 2.56rem;
    margin:0 1rem;
  }
</style>
