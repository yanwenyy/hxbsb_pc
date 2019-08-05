<template>
  <div>
    <div class="free-body">
      <div id="cont">
        <iframe :src="video_src" frameborder="0"></iframe>
      </div>
      <div class="free-control"></div>
    </div>
    <div class="back-model" v-if="back_status">
      <div class="back-body">
          <div class="back-msg">
            <img src="../../../static/img/icon_index_ask_why.png" alt="">
            <div class="back-title-notice">&nbsp;&nbsp;&nbsp;退出观看？</div>
            <div>&nbsp;&nbsp;&nbsp;您将不能免费围观了哦～</div>
          </div>
          <div class="back-btn">
            <div class="inline-block back-ok cursor">退出</div>
            <div class="inline-block back-no cursor">继续观看</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {creatH} from "../../../static/js/get_video"
    export default {
        name: "free-watch",
        data(){
            return{
              back_status:false,
              video_src:'',
              vueid:"myid",
              mid:'',
              link:''
            }
        },
      mounted () {
        // creatH(this.$route.query.vid);
          var that=this;
          this.video_src=this.ad_url.url+'video_ad/html/playerApi.html?vid='+this.$route.query.vid;
          this.mid=this.$route.query.mid;this.link=this.$route.query.link;
          that.ajax(that.http_url.url+"videoAdvertising/addNum",{
            "id":that.mid,
            "playNum":1,
            "outNum":0,
            "endNum":0
          },function(data){})
        },
      created(){
        let self = this;
        window[this.vueid] = ()=>{
          self.end();
        }
      },
      methods:{
          end:function(){
            var that=this;
            this.ajax(this.http_url.url+"videoAdvertising/addNum",{
              "id":this.mid,
              "playNum":0,
              "outNum":0,
              "endNum":1
            },function(data){
                that.ajax(that.http_url.url+"/onlook/look/buy",{
                  "uuid":that.$route.query.uuid,
                  "payType":"watchVideo",
                  "money":1,
                  "source":"1"
                },function(data){
                  if(data.code==1){
                    that.$router.push({name:'answerWacthDetail',query:{"uuid":that.$route.query.uuid,"link":that.link}})
                  }else{
                    // alert(data.des);
                    that.$myToast.error(data.des);
                  }
                })
              // if(that.link!=""){
              //   that.$router.push({name:'freeWatchAd',query:{"uuid":that.$route.query.uuid,"link":that.link}})
              // }else{
              //   that.ajax(that.http_url.url+"/onlook/look/buy",{
              //     "uuid":that.$route.query.uuid,
              //     "payType":"watchVideo",
              //     "money":1,
              //     "source":"1"
              //   },function(data){
              //     if(data.code==1){
              //       that.$router.push({name:'answerWacthDetail',query:{"uuid":that.$route.query.uuid}})
              //     }else{
              //       alert(data.des);
              //     }
              //   })
              // }
            });
          }
      }
    }
</script>

<style scoped>
  iframe{
    width:100%;
    height:100%;
  }
  .back-ok{
    background:rgba(242,242,242,1);
    color:#333;
    margin-right: 0.75rem;
  }
  .back-no{
    background:rgba(45,134,253,1);
    color:#fff;
  }
  .back-btn>div{
    width:7.5rem;
    height:2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 0.875rem;
    border-radius:4px;
  }
  .back-btn{
    margin-top: 1.31rem;
    text-align: center;
  }
  .back-title-notice{
    font-size:1.06rem ;
    color:#333;
    margin: 0.94rem 0 0.625rem 0;
  }
  .back-msg>img{
    width:2.44rem;
    height:2.44rem;
    margin-top:1.81rem;
  }
  .back-msg{
    text-align: center;
    font-size: 0.75rem;
    color:#999;
  }
  .back-body{
    width:19.25rem;
    height:12.44rem;
    background:rgba(255,255,255,1);
    border-radius:6px;
    margin:15rem auto ;
  }
  .back-model{
    width:100%;
    height:100vh;
    position: fixed;
    top:0;
    background: rgba(0,0,0,.4);
  }
  .free-body{
    height:33rem;
    position: relative;
  }
  .free-control{
    position: absolute;
    bottom:0;
    width:100%;
    height:4rem;
    background: #fff;
  }
  #cont{
    width:53rem;
    height:33rem;
    margin:2.94rem auto;
  }
  video::-webkit-media-controls{
    display:none !important;
  }
</style>
