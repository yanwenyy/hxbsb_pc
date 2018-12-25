<template>
    <div class="home-body">
      <Swiper></Swiper>
      <!--<div class="sm-banner">
        <img src="../../../static/img/sm-class-banner.png">
      </div>-->
      <div class="container">
        <div class="wdk-select-group">
          <ul>
            <li>
              <div class="wdk-select-name inline-block">全部类型:</div>
              <div class="wdk-select-msg inline-block">
                <div class="inline-block blue" @click="search_list()">全部</div>
              </div>
            </li>
            <li>
              <div class="wdk-select-name inline-block">行业类型:</div>
              <div class="wdk-select-msg inline-block">
                <div class="inline-block wdk-select-msg-div" v-for="item in hy" data-type="trade">{{item.name}}</div>
              </div>
            </li>
            <li>
              <div class="wdk-select-name inline-block">专题类型:</div>
              <div class="wdk-select-msg inline-block">
                <div class="inline-block wdk-select-msg-div" v-for="item in zt" data-type="topic">{{item.name}}</div>
              </div>
            </li>
            <li>
              <div class="wdk-select-name inline-block">税种类型:</div>
              <div class="wdk-select-msg inline-block">
                <div class="inline-block wdk-select-msg-div" v-for="item in sz" data-type="topic">{{item.name}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>微课</div>
        </div>
        <div class="sm-class-video box-sizing">
          <div class="inline-block"v-for="(item,index) in video_list">
            <img :src="cover_src+item.image" alt="" @click="video_click()">
            <div>{{item.title}}</div>
          </div>
        </div>
      </div>
      <div id="page" class="paging"></div>
      </div>
</template>

<script>
  import Swiper from '@/components/swiper'
    export default {
        name: "small-class",
      components:{
        Swiper,
      },
      data () {
        return{
          hy:[],//行业
          sz:[],//税种
          zt:[],//主题
          video_list:[], //微课封面列表
          sinceId:1,
          maxId:15,
          type:0
        }
      },
      mounted () {
        console.log(this.$route.params.msg)
        //行业,税种,专题
        this.ajax_nodata(this.http_url.url+'category/tree',this.get_tree);
        //微课视频列表
        var params={sinceId:this.sinceId,maxId:this.maxId,type:this.type}
        this.ajax(this.http_url.url+'video/search',params,this.get_video);
        //分页插件初始化
        $("#page").paging({
            total: 20,
            numberPage: 1
          },
          function(msg) {
            //回调函数 msg为选中页码
            // tab(msg);
          });

      },
        methods:{
          search_list:function () {

          },
          //视频点击
          video_click:function(){
            this.$router.push({
              name:'video'
            })
          },
          //行业,税种,专题
          get_tree:function(data){
            // console.log(data);
            var categorys=data.categorys;
            this.hy=this.get_category(categorys,"行业");
            this.sz=this.get_category(categorys,"税种");
            this.zt=this.get_category(categorys,"专题");
          },
          //获取视频封面列表
          get_video:function (data) {
            var data=data.videos
            for(var i=0;i<data.length;i++){
              if(data[i].title.length>40){
                data[i].title=data[i].title.substr(0,40)+"...";
              }
            }
            this.video_list=data
          }
        }
    }
</script>

<style scoped>
  @import '../../../static/css/swiper.min.css';
  .sm-banner img{
    width: 100%;
  }
  .swiper-container{
    height:18.75rem;
    box-sizing: border-box;
    padding:1.88rem;
  }
  .s2 .swiper-slide{
    width:39rem!important;
  }
  .swiper-slide>div{
    width:11.88rem;
    height:15rem;
    box-shadow: 2px 2px 2px 2px #eee;
    margin-right: 2%;
    text-align: center;
    box-sizing: border-box;
    font-size: 0.88rem;
    padding:1.25rem;
  }
  .swiper-slide>div>img{
    width:3.75rem;
    height:3.75rem;
    border-radius: 50%;
    margin-top: 1.56rem;
    margin-bottom: 1rem;
  }
  .swiper-slide>div>div:nth-child(2){
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .swiper-slide>div>div:nth-child(4){
    width:50%;
    height:1.8rem;
    line-height: 1.8rem;
    margin-top: 1rem;
    border-radius:0.3rem ;
    background: #149ADA;
    color:#fff;
    margin-left:25%;
  }
  .swiper-button-disabled{
    display: none;
  }
  .s2 .swiper-button-prev{
    width:1.88rem;
    background: url(../../../static/img/zjk_prev.png) no-repeat;
  }
  .s2 .swiper-button-next{
    width:1.88rem;
    background: url(../../../static/img/zjk-next.png) no-repeat;
  }
  .wdk-select-group{
    margin-top: 1.0625rem;
    color:#666;
    font-size: 0.875rem;
  }
  .wdk-select-msg{
    color:#333;
    width: 88%;
    vertical-align: top;
    line-height: 1.81rem;
  }
  .wdk-select-name{
    margin-right: 0.6rem;
    vertical-align: top;
    line-height: 1.81rem;
  }
  .wdk-select-group li{
    margin-bottom: 1rem;
  }
  .wdk-select-msg>div{
    margin-right: 0.875rem;
  }
  .wdk-select-msg>div:hover{
    color:#2D86FD;
  }
  .sm-class-video{
    width: 85%;
    margin: 0 auto;
  }
  .sm-class-video>div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #666;
    font-size: 0.875rem;
    width: 31%;
    margin-right: 2%;
    padding: 0.5rem;
    vertical-align: top;
  }
  .sm-class-video>div>img{
    width:100%;
    max-height:10.35rem;
    margin-bottom: 1rem;
  }
  #page{
    margin: 50px 0;
  }
</style>
