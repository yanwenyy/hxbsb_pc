<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的粉丝"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的粉丝 <span v-show="count>0">({{count}})</span></div>
        </div>
        <div class="mine-right-body">
          <div class="mine-fans-list box-sizing inline-block" v-for="item in fans_list">
            <img   :src="head_src+item.headImage"  onerror="javascript:this.src='./static/img/user-img.png';" class="fans-head" alt="">
            <div class="inline-block fans-msg">
              <div>{{get_name(item)}}</div>
              <img :src="get_score(item.integralScore,item.aision,item.vip)" alt="">
            </div>
          </div>
          <div class="no-msg-img" v-show="fans_list==''">
            <img src="../../../static/img/answer-nomsg.png" alt="">
            <div>您还没有粉丝～</div>
          </div>
        </div>
        <div id="page" class="paging"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
      name: "mine-fans",
      components:{
        mineLeft
      },
      data(){
        return{
          fans_list:[],//关注列表start:1,
          start:1,
          end:12,
          count:'',//粉丝总数
        }
      },
      mounted(){
        var that=this;
        this.ajax(this.http_url.url+"/attention/user/fans",{
          "sinceId":this.start, "maxId":this.end
        },function(data){
          that.fans_list=data.data.fans;
          that.count=data.data.count;
          that.page(data.data.count/12)
        })
      },
      methods:{
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
              that.start=((msg-1)*12)+1;
              that.end=msg*12;
              that.ajax(that.http_url.url+"/attention/user/fans",{
                "sinceId":that.start, "maxId":that.end
              },that.page_msg)
            });
        },
        //分页回调
        page_msg:function(data){
          this.fans_list=data.data.fans;
        },
      }
    }
</script>

<style scoped>
  .mine-right-body{
    height:33.2rem;
  }
  .fans-msg{
    color:#333;
    font-size: 1rem;
    margin-top: 0.38rem;
  }
  .fans-msg>img{
    width:3.5rem;
    height:1rem;
    margin-top: 0.56rem;
  }
  .fans-head{
    width:3.38rem;
    height:3.38rem;
    vertical-align: top;
    margin-right: 0.75rem;
    border-radius: 50%;
  }
  .mine-fans-list{
    width: 30%;
    height:6.9rem;
    padding:1.8rem 1.125rem;
    box-shadow:0px 0px 7px 0px rgba(221, 221, 221, 0.35);
    border-radius:4px;
    margin: 0 3% 1.38rem 0;
  }
</style>
