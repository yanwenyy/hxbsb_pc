<template>
    <!--<div class="go-top" v-if="show" @click="go_top()"></div>-->
    <div class="scroll-bar">
      <div class="cursor" @click="userMessage.userName||userMessage.companyName||userMessage.province?$router.push({name:'askQuestion'}):$myToast.confirm('您还没有完善信息,完善后方可提问','mineData','去完善')">
        <img src="../../static/img/scroll-bar1.png" alt="">
        <div>快速问</div>
      </div>
      <div class="cursor" @click="ksd()">
        <img src="../../static/img/scroll-bar2.png" alt="">
        <div>快速答</div>
      </div>
      <div class="cursor code-bar">
        <img src="../../static/img/scroll-bar3.png" alt="">
        <div>二维码</div>
        <div class="code-img">
          <div class="inline-block scroll-code box-sizing">
            <img src="../../static/img/footer-code-wx.jpg" alt="">
            <div>
              <div>扫描二维码</div>
              <div>关注微信公众号</div>
            </div>
          </div>
          <div class="inline-block scroll-code box-sizing">
            <img src="../../static/img/footer-code-app.jpg" alt="">
            <div>
              <div>扫描二维码</div>
              <div>下载刷刷APP</div>
            </div>
          </div>
        </div>
      </div>
      <div class="cursor" @click='go_top()'>
        <img src="../../static/img/scroll-bar4.png" alt="">
        <div>顶部</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "scroll-top",
        data () {
          return{
            show:false,
            userMessage:'',
          }
        },
        mounted () {
          var that=this;
          // this.userMessage=JSON.parse(sessionStorage.getItem("userMessage"));
          this.ajax_nodata(this.http_url.url+"/user/message",function(data){
            that.userMessage=data;
          });
          window.addEventListener('scroll',function(){
            var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
            //console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);
            if(scrollTop>800){   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部
              //滚动条到达底部
              //alert(3);
              that.show=true;
            }else if(scrollTop<800){
              //滚动条到达顶部
              that.show=false;
            }
          });
        },
      methods:{
          go_top:function(){
            window.location.href="#";
          },
          //快速答点击
          ksd:function(){
            if(this.userMessage.status==1){
              this.$myToast.error("正在审核,请耐心等待")
            }else{
              if(this.userMessage.role==2){
                this.$router.push({name:'answerList'})
              }else{
                // if(confirm("您还不是咨询师,请去申请成为咨询师后才能回答问题")==true){
                //   this.$router.push({name:'expertApply'});
                // }
                this.$myToast.confirm("您还不是咨询师,请去申请成为咨询师后才能回答问题",'expertApply');
              }
            }
          }
      }
    }
</script>

<style scoped>
  .code-bar:hover .code-img{
    display: block;
  }
  .scroll-code{
    width:7rem;
    height:7rem;
    vertical-align: top;
  }
  .scroll-code>img{
    width:100%;
    height:100%;
  }
  .code-img{
    /*width:10rem;*/
    height: 11rem;
    position: absolute;
    left:-17rem;
    top:0;
    z-index: 99999;
    background: #fff;
    display: none;
    padding: 1rem;
    font-size: 0.5rem;
    box-sizing: border-box;
  }
  .scroll-bar{
    width:4.56rem;
    min-height: 15rem;
    height:auto;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 12px 0px rgba(221,221,221,0.4);
    border-radius:4px;
    position: fixed;
    bottom:6.25rem;
    right:0;
    text-align: center;
    z-index: 99999999;
  }
  .scroll-bar>div{
    padding:1rem 0 0.81rem 0;
    width:2.88rem;
    font-size: 0.81rem;
    margin: 0 auto;
    position: relative;
  }
  .scroll-bar>div:not(:last-child){
    border-bottom: 1px solid #eee;
  }
  .scroll-bar>div>img{
    margin-bottom: 0.5rem;
  }
</style>
