<template>
  <div class="home-body">
    <div class="container" v-if="nomsg">
      <div class="sm-class-video box-sizing">
        <div class="inline-block"v-for="(item,index) in video_list">
          <img :src="cover_src+item.image" alt="" @click="video_click()">
          <div>{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="no-msg" v-else>暂无相关内容</div>
    <div id="page" class="paging" v-show="nomsg"></div>
  </div>
</template>

<script>
    export default {
        name: "small-class",
      data () {
        return{
          nomsg:false,//判断有无数据，对应显示div
          video_list:[], //微课封面列表
          sinceId:1,//当前页开始条数
          maxId:15,//当前页结束条数
          type:0,//微课类型
          title:null //搜索框输入的条件
        }
      },
      mounted () {
        var that=this
        this.title=this.$route.params.msg
        //微课视频列表
        var params={sinceId:this.sinceId,maxId:this.maxId,type:this.type,title:this.title}
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
        //搜索视频按钮点击事件
        $("body").on("click",".header-search-answer",function(e){
          this.title=$(".search-input-header>input").val()
          params.title=this.title
          that.ajax(that.http_url.url+'video/search',params,that.get_video);
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
          //获取视频封面列表
          get_video:function (data) {
            var data=data.videos
            if(data.length!=0){
              this.nomsg=true
            }else{
              this.nomsg=false
            }
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
