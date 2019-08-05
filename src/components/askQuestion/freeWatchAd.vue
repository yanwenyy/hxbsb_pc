<template>
  <div class="frame-div" v-if="frame_status">
    <div class="frame-div-body">
      <iframe name="midFraim" id="midFraim" :src="link" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <img class="close-frame cursor" @click="close" src="../../../static/img/icon_pc_close.png" alt="">
  </div>
</template>

<script>
    export default {
      name: "free-watch-ad",
      data(){
        return {
          link:'',
          frame_status:true
        }
      },
      mounted(){
        // var that=this;
        // this.link=this.$route.query.link+"&cookieId="+sessionStorage.getItem("cookieId");
        // this.link="http://test.jieshuibao.com/video_ad/html/ad1.html?";
        // $("#midFraim").load(function(){
        //   var mainheight = $(this).contents().find(".ad1-body").height()+30;
        //   console.log(mainheight);
        //   $(this).height(mainheight);
        // });
      },
      methods:{
        goBack:function(){
          var that=this;
          that.ajax(that.http_url.url+"/onlook/look/buy",{
            "uuid":that.$route.query.uuid,
            "payType":"watchVideo",
            "money":1,
            "source":"1"
          },function(data){
            if(data.code==1){
              that.$router.push({name:'answerWacthDetail',query:{"uuid":that.$route.query.uuid}})
            }else{
              // alert(data.des);
              that.$myToast.error(data.des);
            }
          })
        },
        close:function(){
          this.frame_status=false;
        },
        init:function(e){
          this.link=e;
        }
      }
    }
</script>

<style scoped>
  .close-frame{
    position: absolute;
    top:8vh;
    right:14%;
  }
  .frame-div{
    width:100%;
    min-height:100vh;
    height:auto;
    background: rgba(0,0,0,.4);
    position: fixed;
    top:0;
    z-index: 1000000;
  }
  .frame-div-body{
    width:46.88rem;
    margin: 0 auto;
    min-height: 100vh;
    height:auto;
  }
  iframe{
    width:100%;
    min-height: 92vh;
    height:auto;
    margin-top: 8vh;
  }
</style>
