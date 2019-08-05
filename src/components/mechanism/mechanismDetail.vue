<template>
    <div class="detail-body">
      <headerTab msg="机构"></headerTab>
      <div class="container">
        <div class="m-detail-title">视频展示</div>
        <div id="cont" class="inline-block"></div>
        <div class="mechanism-detail inline-block">
          <div class="m-detail" v-show="marker_msg!=''">
            <img :src="cover_src+marker_msg.videoCover" class="mechanism-img" alt="">
            <div class="mlist-name">{{marker_msg.name}}</div>
            <div class="mlist-msg">
              <span><img src="../../../static/img/sqfws.png" alt=""></span>
              <span>{{marker_msg.views}}人浏览</span>
              <span>{{marker_msg.contactNo}}</span>
            </div>
            <div class="mlist-adress"><img src="../../../static/img/mop-position.png" alt="">{{marker_msg.address}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import headerTab from "@/components/headerTab"
  import {creatH} from "../../../static/js/get_video"
    export default {
      name: "mechanism-detail",
      components:{
        headerTab,
      },
      data(){
        return{
          marker_msg:''
        }
      },
      mounted(){
        this.marker_msg=JSON.parse(this.$route.query.msg);
        console.log(this.marker_msg);
        creatH(this.marker_msg.videoId);
       this.ajax(this.http_url.url+"/agency/increaseBrowsingTimes",{"id":this.marker_msg.id},function(data){})
      }
    }
</script>

<style scoped>
  .detail-body{
    margin-bottom:12.5rem;
  }
  .m-detail-title{
    color:#333;
    font-size: 1.5rem;
    margin: 2.44rem 0 1.5rem 0;
  }
  #cont {
    width: 68%;
    height:27rem;
    cursor: pointer;
  }
  .mlist-adress{
    font-size: 1rem;
    color:#999;
  }
  .mlist-msg>span{
    vertical-align: middle;
    padding:0 0.4rem;
    border-left: 1px solid #eee;
  }
  .mlist-msg>span:nth-child(1){
    padding-left:0;
    border-left:none;
  }
  .mlist-msg{
    font-size: 1rem;
    color:#666;
    margin-bottom: 1rem;
  }
  .mlist-name{
    font-size: 1.25rem;
    color:#333;
    font-weight: bold;
    margin: 1rem 0;
  }
  .mechanism-img{
    min-width:100%;
    min-height:14.12rem;
    width:100%;
    height:14.12rem;
    border-radius: 4px;
  }
  .mechanism-list{
    width:31.3%;
    margin:0 1% 3.3rem 1%;
  }
  .mechanism-title{
    color:#1A1A1A;
    font-size: 1.5rem;
    margin: 2.75rem 0 1.5rem 0;
  }
  .mechanism-detail{
    width:30%;
    height:27rem;
    vertical-align: top;
    margin-left: 1%;
  }
</style>
