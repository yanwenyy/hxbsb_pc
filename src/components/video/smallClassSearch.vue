<template>
  <div class="home-body">
    <headerTab ref="child" msg=""></headerTab>
    <div class="container" v-if="nomsg">
      <div class="sm-class-video box-sizing">
        <div class="inline-block  video-list" v-for="(item,index) in video_list"  @click="video_click(item)">
          <img :src="cover_src+item.image" alt="" @click="video_click(item)">
          <div>{{item.title}}</div>
          <p class="buy" v-if="item.ifBuy==1">已购买</p>
          <p class="price" v-else-if="item.ifBuy!=1&&item.price!=0">¥{{parseFloat(item.price).toFixed(2)}}</p>
          <p class="free" v-else-if="item.price==0">限时免费</p>
          <div class="video-hover"><img src="../../../static/img/video-hover.png" alt=""></div>
        </div>
      </div>
    </div>
    <!--<div class="no-msg" v-else>暂无相关内容</div>-->
    <div class="no-msg-img" v-show="video_list==''">
      <img src="../../../static/img/no-msg-img.png" alt="">
      <div>没有搜到相关内容哦～</div>
    </div>
    <div id="page" class="paging" v-show="nomsg"></div>
  </div>
</template>

<script>
  import headerTab from "@/components/headerTab"
    export default {
        name: "small-class",
      components: {
        headerTab
      },
      data () {
        return{
          nomsg:false,//判断有无数据，对应显示div
          video_list:[], //微课封面列表
          sinceId:1,//当前页开始条数
          maxId:16,//当前页结束条数
          type:0,//微课类型
          total:1,//分页页数
          title:null, //搜索框输入的条件
          page_size:16,//每页15条
          vid:null
        }
      },
      mounted () {
        var that=this
        this.title=this.$route.query.msg
        //微课视频列表
        var query={sinceId:this.sinceId,maxId:this.maxId,type:this.type,title:this.title}
        this.ajax(this.http_url.url+'video/search',query,this.get_video);
        //搜索视频按钮点击事件
        $("body").on("click",".header-search-answer",function(e){
          this.title=$(".search-input-header>input").val()
          query.title=this.title
          that.ajax(that.http_url.url+'video/search',query,that.get_video);
        });
      },
        methods:{
          //视频点击
          video_click:function(data){
            var that=this
            this.ajax(this.http_url.url+'video/vid',{id:data.id},function (e) {
              that.vid=e.data.vid
              if(data.ifBuy==1||data.price==0){
                that.$router.push({name:'video',query:{vid:that.vid}})
              }else{
                var sdata='';
                sdata={videoId:data.id,source:2,money:data.price,url:'video'}
                sdata=encodeURIComponent(JSON.stringify(sdata))
                // console.log(data);
                that.$router.push({ name: 'payMethod',query: {price: data.price,source:"微课",data:sdata}})
              }
            })
          },
          get_video:function (data) {
            this.get_video_list(data)
            this.go_page()
          },
          //获取视频封面列表
          get_video_list:function (data) {
            var data_list=data.videos;
            this.total=Math.ceil(data.count/this.maxId)
            if(data_list.length!=0){
              this.nomsg=true
            }else{
              this.nomsg=false
            }
            for(var i=0;i<data_list.length;i++){
              if(data_list[i].title.length>40){
                data_list[i].title=data_list[i].title.substr(0,35)+"...";
              }
            }
            this.video_list=data_list;
          },
          //分页
          go_page:function () {
            var that=this
            //分页插件初始化
            $("#page").paging({
                total: this.total,
                numberPage: 1
              },
              function(msg) {
                //回调函数 msg为选中页码
                this.sinceId=parseInt(that.page_size*(msg-1)+1)
                this.maxId=parseInt(this.sinceId+that.page_size-1)
                var query={sinceId:this.sinceId,maxId:this.maxId,type:that.type}
                that.ajax(that.http_url.url+'video/search',query,that.get_video_list);
              });
          },
        }
    }
</script>

<style scoped>
  @import '../../../static/css/swiper.min.css';
  .video-list{
    position: relative;
  }
  .video-hover{
    height:9.4rem;
    top:0.5rem;
    width:95%;
    box-sizing: border-box;
  }
  .video-list:hover .video-hover{
    display: block;
  }
  .video-hover>img{
    margin-top:3.5rem;
  }
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
    color: #666;
    font-size: 0.875rem;
    border: 1px solid rgba(229,229,229,1);
  }
  .wdk-select-group>ul{
    background: #F6F6F6;
    padding: 2.19rem 2.44rem 1rem 2.44rem;
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
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
  }
  .sm-class-video>div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #666;
    font-size: 0.875rem;
    width: 24%;
    margin-right: 1%;
    padding: 0.5rem;
    vertical-align: top;
    height: 14.5rem;
    line-height: 1.2;
    position: relative;
  }
  .sm-class-video>div>div{
    line-height: 1.4;
  }
  .sm-class-video>div>img{
    width:100%;
    height:9.4rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
  }
  .sm-class-video>div>p{
    position: absolute;
    bottom: 0.5rem;
  }
  .sm-class-video p{
    color: #fe6d27;
  }
  .sm-class-video p.buy{
    color: #c6c6c6;
  }
  #page{
    margin: 50px 0;
  }
</style>
