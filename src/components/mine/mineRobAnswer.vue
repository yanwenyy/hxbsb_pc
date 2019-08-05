<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="待抢答"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>待抢答</div>
        </div>
        <div class="mine-right-body">
          <div class="wdk-list" v-for="item in list">
            <div class="inline-block">
              <div class="wdk-name">
                <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
                <div class="inline-block user_name">{{get_name(item)}}</div>
                <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
                <div class="home-list-msg-group">
                  <div class="inline-block home-list-msg">{{item.content}}</div>
                  <div class="inline-block rob-money">
                    <span class="inline-block orange">悬赏：15.00元</span>
                    <div class="inline-block weiguan" @click="answer(item.uuid)">查看</div>
                  </div>
                </div>
                <div class="label box-sizing">
                  <div class="inline-block">{{format(item.date)}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="no-msg-img" v-show="nomsg">
            <img src="../../../static/img/answer-nomsg.png" alt="">
            <div>刚刚悬赏的问题都被抢光了～</div>
          </div>
          <div id="page" class="paging"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
      name: "mine-rob-answer",
      components:{
        mineLeft,
      },
      data(){
        return{
          list:[],//抢答列表
          start:1,
          end:10,
          nomsg:false,
        }
      },
      mounted(){
        var that=this;
        this.ajax(this.http_url.url+"/question/pageList",{
          "sinceId":this.start,
          "maxId":this.end,
        },function(data){
          console.log(data);
          if(data.questions!=""&&data.questions!=null){
            that.list=data.questions;
            that.page(data.waitQuestionCount/10)
          }else{
            that.nomsg=true;
          }
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
              that.start=((msg-1)*10)+1;
              that.end=msg*10;
              that.ajax(that.http_url.url+"/question/pageList",{
                "sinceId":that.start,
                "maxId":that.end,
              },that.page_msg)
            });
        },
        //分页回调
        page_msg:function(data){
          this.purchaseOrders=data.purchaseOrders;
        },
        answer:function(id){
          var that=this;
          this.ajax_nodata(this.http_url.url+"/answer/isAnswer",function(data){
            console.log(data);
            if(data.code==4&&data.des=="您有未回答的问题，请前去回答"){
              that.$myToast.error(data.des);
              setTimeout(function(){
                that.$router.push({name:'mineAnswerWacthDetail',query:{'id':data.question.uuid}})
              },3000);
            }else if(data.code==1){
              that.$router.push({name:'mineAnswerWacth',query:{'id':id}})
            }else{
              that.$myToast.error(data.des);
            }
          })
        },
      }
    }
</script>

<style scoped>
  .rob-money>span{
    margin-right: 2rem;
    height: 1.75rem;
    line-height: 1.75rem;
  }
  .home-list-msg{
    width: 60%;
  }
  .rob-money{
    float: right;
  }
  .mine-right-body{
    padding:0 2rem;
  }
  .weiguan{
    background: #FE6D27;
    color:#fff;
  }
</style>
