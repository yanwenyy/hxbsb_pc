<template>
    <div class="home-body">
      <div class="sm-banner">
        <img src="../../../static/img/sm-class-banner.png">
      </div>
      <div class="container">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>大咖访谈</div>
        </div>
        <div class="br"></div>
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
    export default {
        name: "small-class",
      data () {
        return{
          //行业
          hy:[],
          //税种
          sz:[],
          //主题
          zt:[],
          //微课列表
          video_list:[],
        }
      },
      mounted () {
        //行业,税种,专题
        this.ajax_nodata(this.http_url.url+'category/tree',this.get_tree);
        //微课视频列表
        var params={sinceId:1,maxId:15,type:3}
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

  .sm-banner img{
    width: 100%;
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
  .br{
    width: 200%;
    height: 1px;
    border-bottom: 1px solid rgba(238,238,238,1);
    position: relative;
    left: -20%;
    top: -2px;
  }
  #page{
    margin: 50px 0;
  }
</style>
