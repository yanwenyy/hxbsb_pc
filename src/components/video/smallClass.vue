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
                <div class="inline-block wdk-select-msg-div" @click="search_list_wdk($event,item.uuid,'trade')" v-for="item in hy" data-type="trade">{{item.name}}</div>
              </div>
            </li>
            <li>
              <div class="wdk-select-name inline-block">专题类型:</div>
              <div class="wdk-select-msg inline-block">
                <div class="inline-block wdk-select-msg-div" @click="search_list_wdk($event,item.uuid,'topic')" v-for="item in zt" data-type="topic">{{item.name}}</div>
              </div>
            </li>
            <li>
              <div class="wdk-select-name inline-block">税种类型:</div>
              <div class="wdk-select-msg inline-block">
                <div class="inline-block wdk-select-msg-div" @click="search_list_wdk($event,item.uuid,'tax')" v-for="item in sz" data-type="tax">{{item.name}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>微课</div>
        </div>
        <div class="sm-class-video box-sizing" v-if="nomsg">
          <div class="inline-block"v-for="(item,index) in video_list">
            <img :src="cover_src+item.image" alt="" @click="video_click(item)">
            <div>{{item.title}}</div>
            <p class="buy" v-if="item.ifBuy==1">已购买</p>
            <p class="price" v-else-if="item.ifBuy!=1&&item.price!=0">¥：{{parseFloat(item.price).toFixed(2)}}</p>
            <p class="free" v-else-if="item.price==0">限时免费</p>
          </div>
        </div>
        <div class="no-msg" v-else>暂无相关内容</div>
      </div>

      <div id="page" class="paging" v-show="nomsg"></div>
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
          nomsg:false,//判断有无数据，对应显示div
          hy:[],//行业
          sz:[],//税种
          zt:[],//主题
          video_list:[], //微课封面列表
          sinceId:1,//当前页开始条数
          maxId:15,//当前页结束条数
          type:0,//微课类型
          total:1,//分页页数
          page_size:15,//每页15条
          vid:null
        }
      },
      mounted () {
        //行业,税种,专题
        this.ajax_nodata(this.http_url.url+'category/tree',this.get_tree);
        //微课视频列表
        var query={sinceId:this.sinceId,maxId:this.maxId,type:this.type}
        this.ajax(this.http_url.url+'video/search',query,this.get_video);
      },
        methods:{
          //全部类别微课搜索
          search_list:function () {
            var query={sinceId:this.sinceId,maxId:this.maxId,type:this.type}
            this.ajax(this.http_url.url+'video/search',query,this.get_video);
          },
          //视频封面点击
          video_click:function(data){
            var that=this
            this.ajax(this.http_url.url+'video/vid',{id:data.id},function (e) {
              that.vid=e.data.vid
              if(data.ifBuy==1||data.price==0){
                that.$router.push({name:'video',query:{vid:that.vid}})
              }else{
                data={videoId:data.id,source:2,money:data.price,url:'video'}
                that.$router.push({ name: 'payMethod',query: {price: data.money ,source:"微课",data:data,}})
              }
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
          //视频封面列表
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
          //类别搜索
          search_list_wdk:function (event,uuid,wdk) {
            var query;
            $(".wdk-select-msg>div").removeClass("blue");
            $(event.target).addClass("blue");
            if(wdk=="trade"){
              query={sinceId:this.sinceId,maxId:this.maxId,type:this.type,trade:uuid}
            }else if(wdk=="topic"){
              query={sinceId:this.sinceId,maxId:this.maxId,type:this.type,topic:uuid}
            }else if(wdk=="tax"){
              query={sinceId:this.sinceId,maxId:this.maxId,type:this.type,tax:uuid}
            }
            this.ajax(this.http_url.url+'video/search',query,this.get_video);
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
    margin-top: 2rem;
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
    height: 14.5rem;
    line-height: 1.2;
    position: relative;
  }
  .sm-class-video>div>img{
    width:100%;
    height:9.4rem;
    margin-bottom: 0.5rem;
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
