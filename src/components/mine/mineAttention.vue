<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的关注"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的关注</div>
        </div>
        <div class="mine-right-body">
          <div class="attention-list box-sizing inline-block cursor" v-for="item in attention_list">
            <img  :src="head_src+item.headImage"  onerror="javascript:this.src='./static/img/user-img.png';" class="attention-head" alt=""  @click="$router.push({name:'expertHomepage',query:{phone:item.phoneNumber}})">
            <div class="inline-block attention-msg"  @click="$router.push({name:'expertHomepage',query:{phone:item.phoneNumber}})">
              <div class="attention-name">
                <span>{{item.userName}}</span>
                <span><img src="../../../static/img/zxs-icon.png" alt="">{{item.levelName}}</span>
              </div>
              <div class="attention-post">{{item.counselorDuty}}</div>
            </div>
            <div class="inline-block cancel-attention cursor" @click="cancel(item.phoneNumber)">取消关注</div>
          </div>
          <div class="no-msg-img" v-show="attention_list==''">
            <img src="../../../static/img/answer-nomsg.png" alt="">
            <div>你还没有关注任何人，快去关注吧！</div>
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
      name: "mine-attention",
      components:{
        mineLeft
      },
      data(){
        return{
          attention_list:[],//关注列表start:1,
          start:1,
          end:10,
        }
      },
      mounted(){
        var that=this;
        this.ajax(this.http_url.url+"/attention/allUser",{
          "sinceId":this.start, "maxId":this.end
        },function(data){
          that.attention_list=data.attentionUser;
          that.page(data.count/10)
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
              that.ajax(that.http_url.url+"/attention/allUser",{
                "sinceId":that.start, "maxId":that.end
              },that.page_msg)
            });
        },
        //分页回调
        page_msg:function(data){
          this.attention_list=data.attentionUser;
        },
        //取消关注
        cancel:function(phone){
          var that=this;
          if(confirm("确定不再关注吗")==true){
            this.ajax(this.http_url.url+"/attention/user",{
              "phoneNum":phone, "isAttention":0
            },function(data){
              if(data.code==1){
                location.reload()
              }else{
                that.$myToast.error(data.des);
              }
            })
          }
        }
      }
    }
</script>

<style scoped>
  .mine-right-body{
    height:41.56rem;
  }
  .cancel-attention{
    float: right;
    width:5.94rem;
    height:2.19rem;
    line-height: 2.19rem;
    text-align: center;
    color:#999999;
    font-size: 0.88rem;
    background:rgba(238,238,238,1);
    border-radius:2px;
    margin:0.5rem 0;
  }
  .attention-name>span:nth-child(1){
    color:#333;
    font-size: 1.125rem;
  }
  .attention-post{
    margin-top: 0.5rem;
    font-size: 0.94rem;
  }
  .attention-msg{
    color: #999999;
    font-size: 0.88rem;
    margin-top: 0.3rem;
  }
  .attention-head{
    width:3.38rem;
    height:3.38rem;
    vertical-align: top;
    border-radius: 50%;
    margin-right: 0.75rem;
  }
  .attention-list{
    width:48%;
    height:6.94rem;
    box-shadow:0px 0px 7px 0px rgba(221, 221, 221, 0.35);
    border-radius:4px;
    margin-bottom: 1.38rem;
    padding:1.87rem 1.125rem;
  }
  .attention-list:nth-child(odd){
    margin-right:4%;
  }
</style>
