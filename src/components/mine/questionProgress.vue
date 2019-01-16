<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的提问"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>问题进度详情</div>
        </div>
        <div class="q-progress">
          <div class="current-progress" v-for="(item,index) in progress_list">
            <span class="inline-block round" ><img :src="index==0?'./static/img/round-blue.png':'./static/img/round.png'"/></span>
            <div class="inline-block">{{item.behavior}}<br><span class="cp-time">{{format(item.createdate)}}</span></div>
          </div>
          <div class="back"><span @click="$router.go(-1)"><img src="/static/img/blue_back_icon.png">返回</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
        name: "question-progress",
      data() {
        return {
          progress_list:[]
        }
      },
      components:{
        mineLeft
      },
      mounted(){
          this.ajax(this.http_url.url+"progressDetails/list",{
            questionUuid:this.$route.query.uuid,
            businessType:0
          },this.get_progress)
      },
      methods:{
        get_progress:function (data) {
          var data=data.data;
          for(var i=0;i<data.length;i++){
            this.progress_list.push(data[i])
          }
        }
      }
    }
</script>

<style scoped>
  .q-progress{
    margin-left: 3rem;
  }
  .current-progress{
    font-size: 1rem;
    color: #333;
    margin: 1.8rem 0;
  }
  .current-progress .round{
    width: 1.7rem;
    height: 1.7rem;
    vertical-align: top;
    margin-top: 2px;
    position: relative;
  }
  .current-progress .round::before{
    content: "";
    width: 1px;
    height: 4rem;
    position: absolute;
    background: #D7D7D7;
    left: 0.81rem;
    top:-3.5rem;
    z-index: 1;
  }
  .current-progress:first-child .round::before{
    width: 0;
    height: 0;
  }
  .current-progress .round img{
    width: 100%;
    position: relative;
    z-index: 222;
  }
  .current-progress .cp-time{
    font-size: 0.875rem;
    color: #999;
    line-height: 1.8;
  }
  .current-progress .current{

  }
  .back{
    color: #2D86FD;
    font-size: 14px;
    margin-top: 4rem;
    cursor: default;
  }
  .back img{
    width: 0.8rem;
    position: relative;
    top: 2px;
    margin-right: 3px;
    margin-left: 7px;
  }
</style>
