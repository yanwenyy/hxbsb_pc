<template>
  <div class="detail-body">
    <headerTab msg="机构"></headerTab>
    <div class="container">
      <div class="m-detail-title">搜索结果</div>
      <div class="mechanism-group">
        <div style="width: 105%;margin-left: -2.5%">
          <div class="mechanism-list box-sizing inline-block" v-for="item in mechanismlist" @click="item.videoId!=''?$router.push({name:'mechanismDetail',query:{'msg':JSON.stringify(item)}}):''">
            <img :src="cover_src+item.videoCover" class="mechanism-img" alt="">
            <div class="mlist-name">{{item.name}}</div>
            <div class="mlist-msg">
              <span><img src="../../../static/img/sqfws.png" alt=""></span>
              <span v-show="item.views!=''&&item.views!=null">{{item.views}}人浏览</span>
              <span>{{item.contactNo}}</span>
            </div>
            <div class="mlist-adress"><img src="../../../static/img/mop-position.png" alt="">{{item.address}}</div>
            <div class="video-hover" v-if="item.videoId&&item.videoId!=''"><img src="../../../static/img/video-hover.png" alt=""></div>
          </div>
        </div>
        <div class="no-msg-img" v-show="mechanismlist==''">
          <img src="../../../static/img/no-msg-img.png" alt="">
          <div>没有搜到相关内容哦～</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import headerTab from "@/components/headerTab"
    export default {
      name: "mechanism-search",
      components:{
        headerTab,
      },
      data(){
        return{
          mechanismlist:[],//机构列表
        }
      },
      mounted(){
        var that=this;
        this.ajax(this.http_url.url+"/agency/findAgencysByParams",{
          "latitude":sessionStorage.getItem("lat"),
          "longitude":sessionStorage.getItem("lng"),
          "name":this.$route.query.msg
        },function(data){
          that.mechanismlist=data.datas;
        });
        //搜索答案按钮点击
        $("body").on("click",".header-search-answer",function(){
          that.list=[];
          var msg=$(".search-input-header>input").val();
          that.ajax(that.http_url.url+'/agency/findAgencysByParams',{
            "latitude":sessionStorage.getItem("lat"),
            "longitude":sessionStorage.getItem("lng"),
            "name":msg,
          },function(data){
            that.mechanismlist=data.datas;
          });
        });
      }
    }
</script>

<style scoped>
  .video-hover{
    height:14.12rem;
  }
  .mechanism-list:hover .video-hover{
    display: block;
  }
  .video-hover>img{
    margin-top:6rem;
  }
  .detail-body{
    margin-bottom:12.5rem;
  }
  .m-detail-title{
    color:#333;
    font-size: 1.5rem;
    margin: 2.44rem 0 1.5rem 0;
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
    margin-bottom: 0.8rem;
  }
  .mlist-name{
    font-size: 1.25rem;
    color:#333;
    font-weight: bold;
    margin: 1rem 0 0.8rem 0;
  }
  .mechanism-img{
    min-width:100%;
    min-height:14.12rem;
    width:100%;
    height:14.12rem;
    border-radius: 4px;
  }
  .mechanism-list{
    width:28%;
    margin:0 2.5% 3.3rem 2.5%;
    position: relative;
    vertical-align: top;
  }
</style>
