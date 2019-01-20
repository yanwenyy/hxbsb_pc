<template>
  <div style="text-align: center;position: relative" id="vi">
    <video id="myvideo" :src="videoSrc" :poster="videoImg" :muted="muteStatus" :autoplay="playStatus" height="500" width="70%" controls="controls">
      your browser does not support the video tag
    </video>
    <span class="ico ico-sound" :class="{ active: isMute }" v-on:click="closeSoundClick()"></span>
    <span class="ico ico-skip"></span>
    <span class="ico ico-video" :class="{ hide: isPlay }" v-on:click="playClick()"></span>
    <div class="qinxidu">高清</div>
  </div>
</template>

<script>
    export default {
        name: "video",
      data(){
        return {
          _dom:"",
          // videoSrc:'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
          // videoImg:'http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg',
          playStatus:false,
          muteStatus:'',
          isMute:true,
          isPlay:false
        }
      },
      mounted () {

      },
      methods:{
        playClick(){
          this.isPlay = !this.isPlay;
          this.playStatus= 'autoplay';
        },
        closeSoundClick(){
          this.isMute = !this.isMute;
          if(this.isMute){
            this.muteStatus = '';
          }else{
            this.muteStatus = 'muted';
          }
        }
      }
    }
</script>

<style scoped>
  .qinxidu{
    position: absolute;
    bottom:12%;
    right:33%;
    color:#fff;
    font-size: 1rem;
    background: #007aff;
    padding:0.2rem;
    border-radius: 0.2rem;
    display: none;
  }
  #vi:hover .qinxidu{
    display: block;
  }
</style>
