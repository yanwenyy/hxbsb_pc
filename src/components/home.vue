<template>
    <div class="home-body">
      <headerTab ref="child" msg="首页"></headerTab>
      <!--<Swiper></Swiper>-->
      <div class="container">
        <div class="home-main box-sizing">
          <div class="h-main-right inline-block box-sizing">
            <HomeRight></HomeRight>
          </div>
          <div class="h-main-left inline-block">
            <Swiper></Swiper>
            <div class="some-wd box-sizing">
              <div class="inline-block box-sizing">
                <div class="some-wd-new-title box-sizing inline-block" :class="new_hot=='最新'?'some-wd-new-title-act':''" @click="new_hot='最新'">
                  <img v-show="new_hot=='最新'" class="wd-act"  src="../../static/img/some-wd-new-title-act.png" alt="">
                  <img v-show="new_hot!='最新'" class="wd-noact" src="../../static/img/some-wd-new-title.png" alt="">
                  <div class="wd-name inline-block">最新问答</div>
                  <div class="wd-more inline-block"><router-link :to="{ name: 'quesAnswerBank', query: { name: 'new' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
                </div>
                <div class="some-wd-new-title box-sizing inline-block" :class="new_hot=='最热'?'some-wd-new-title-act':''"  @click="new_hot='最热'">
                  <img v-show="new_hot=='最热'" class="wd-act"  src="../../static/img/some-wd-hot-title-act.png" alt="">
                  <img v-show="new_hot!='最热'" class="wd-noact" src="../../static/img/some-wd-hot-title.png" alt="">
                  <div class="wd-name inline-block">最热围观</div>
                  <!--<div class="wd-more inline-block"><router-link :to="{ name: 'quesAnswerBank', query: { name: 'hot' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>-->
                  <div class="wd-more inline-block"><router-link :to="{ name: 'quesAnswerBank', query: { name: 'new' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
                </div>
                <div class="some-wd-new-body box-sizing" v-show="new_hot=='最新'" >
                  <div class="wd-list inline-block box-sizing"   @click="weiguan(item.uuid,item.status)" v-for="item in zxwd">
                    <div class="wd-msg wd-new-msg">
                      <div class="inline-block wd-msg-title cursor">
                        {{item.content.length>30?item.content.slice(0,30)+"...":item.content}}
                      </div>
                      <div class="inline-block go-wg-btn cursor"  :class="item.status==1? 'weiguan_also':''">{{item.status==1? '已围观':'去围观'}}</div>
                    </div>
                    <div class="wd-date cursor">
                      {{format(item.date)}}   点赞{{item.approveNum}}  围观{{item.lookNum}}
                    </div>
                  </div>
                </div>
                <div class="some-wd-new-body box-sizing" v-show="new_hot=='最热'" >
                  <div class="wd-list inline-block box-sizing"  v-for="item in zrwd"   @click="weiguan(item.uuid,item.status)">
                    <div class="wd-msg wd-new-msg">
                      <div class="inline-block wd-msg-title cursor">
                        {{item.content.length>30?item.content.slice(0,30)+"...":item.content}}
                      </div>
                      <div class="inline-block go-wg-btn cursor"  :class="item.status==1? 'weiguan_also':''">{{item.status==1? '已围观':'去围观'}}</div>
                    </div>
                    <div class="wd-date cursor">
                      {{format(item.date)}}   点赞{{item.approveNum}}  围观{{item.lookNum}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="inline-block" v-show="false">
                <div class="some-wd-new-title">
                  <img class="wd-noact"  src="../../static/img/some-wd-hot-title-act.png" alt="">
                  <img class="wd-act" src="../../static/img/some-wd-hot-title.png" alt="">
                  <div class="wd-name inline-block">最热围观</div>
                  <div class="wd-more inline-block"><router-link :to="{ name: 'quesAnswerBank', query: { name: 'hot' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
                </div>
                <div class="some-wd-new-body box-sizing">
                  <div class="wd-list"  v-for="item in zrwd"   @click="weiguan(item.uuid,item.status)">
                    <div class="wd-msg">
                      <div class="inline-block wd-msg-title cursor">
                        {{item.content.length>30?item.content.slice(0,30)+"...":item.content}}
                      </div>
                      <div class="inline-block go-wg-btn cursor"  :class="item.status==1? 'weiguan_also':''">{{item.status==1? '已围观':'围观'}}</div>
                    </div>
                    <div class="wd-date">
                      {{format(item.date)}}   点赞{{item.approveNum}}  围观{{item.lookNum}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollTop></ScrollTop>
        </div>
      </div>
      <div class="new-model">
        <div class="container">
          <div class="zjk">
            <div class="home-model-header">
              <div class="inline-block home-head-title">专家库</div>
              <div class="inline-block"><router-link :to="{ name: 'expert', query: { name: 'hot' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
            </div>
            <div class="zjk-body">
                <div class="inline-block box-sizing" v-for="item in zj">
                  <img class="zjk-head" :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
                  <div class="zj-name">{{item.userName||"匿名用户"}}</div>
                  <div class="zj-zz">{{item.counselorDuty}}</div>
                  <div class="zj-ly">擅长领域：{{item.adept.length>16?item.adept.slice(0,16)+"...":item.adept}}</div>
                  <div class="look-zj cursor" @click="$router.push({name:'expertHomepage',query:{phone:item.phoneNumber}})">查看主页</div>
                </div>
            </div>
          </div>
          <div class="jgtj">
            <div class="home-model-header">
              <div class="inline-block home-head-title">机构推荐</div>
              <div class="inline-block"><router-link :to="{ name: 'mechanismlist', query: { name: 'hot' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
            </div>
            <div class="jgtj-body">
              <div v-for="item in jg" class="cursor"  @click="item.videoId!=''?$router.push({name:'mechanismDetail',query:{'msg':JSON.stringify(item)}}):''">
                <img :src="cover_src+item.videoCover" alt="">
                <div class="jg-name box-sizing">{{item.name}}</div>
              </div>
            </div>
          </div>
          <div class="dkft-new">
            <div class="home-model-header">
              <div class="inline-block home-head-title">大咖访谈</div>
              <div class="inline-block"><router-link :to="{ name: 'masterInterview', query: { name: 'hot' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
            </div>
            <div class="dkft-body">
              <div class="inline-block dkft-list cursor" v-for="item in dk" style="height: 14.5rem"  @click="dk_click(item)">
                <img :src="cover_src+item.image" alt="">
                <div class="box-sizing">{{item.title.length>30? item.title.slice(0,30)+"...":item.title}}</div>
                <div class="video-hover"><img src="../../static/img/video-hover.png" alt=""></div>
              </div>
            </div>
          </div>
          <div class="wktj">
            <div class="home-model-header">
              <div class="inline-block home-head-title">微课推荐</div>
              <div class="inline-block"><router-link :to="{ name: 'smallClass', query: { name: 'hot' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
            </div>
            <div class="dkft-body">
              <div class="inline-block dkft-list cursor" v-for="item in wk" @click="wk_click(item)">
                <img :src="cover_src+item.image" alt="">
                <div class="box-sizing">
                  {{item.title.length>28? item.title.slice(0,28)+"...":item.title}}
                </div>
                <div class="orange wk-price" v-show="item.ifBuy!=1&&item.price!=0">￥<span style="font-size: 1.125rem">{{parseFloat(item.price).toFixed(2)}}</span></div>
                <div class="wk-price gray" v-show="item.ifBuy==1||item.price==0">{{item.ifBuy==1?'已购买':'限时免费'}}</div>
                <div class="video-hover"><img src="../../static/img/video-hover.png" alt=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Swiper from '@/components/swiper'
  import HomeRight from '@/components/homeRight'
  import ScrollTop from '@/components/scrollTop'
  import headerTab from "@/components/headerTab"
    export default {
        name: "home",
        components: {
          Swiper,
          HomeRight,
          ScrollTop,
          headerTab
        },
      data () {
          return{
            //最热最新状态
            new_hot:'最新',
            //头像出错
            head_error:"this.src='./static/img/user-img.png'",
            zan:1,
            //最新问答
            zxwd:[],
            //专题
            zt:[],
            //专题name
            zt_name:"",
            //主题类型
            zt_topic:"",
            //最新问答
            zrwd:[],
            //通告
            notice:[],
            zj:[],//专家库
            jg:[],//机构
            dk:[],//大咖访谈
            wk:[],//微课
          }
        },
      mounted () {
        var that=this;
        // console.log(this.getUrlParms('data'));
        //最新
        this.ajax(this.http_url.url+'/onlook/look/list',{
          "sinceId":1,
          "maxId":10,
          "type":"new"
        },this.get_new);
        //专题
        this.ajax_nodata(this.http_url.url+'/load/getconfig/message',this.get_set);
        //最热
        this.ajax(this.http_url.url+'/onlook/look/list',{
          "sinceId":1,
          "maxId":10,
          "type":"hot"
        },this.get_hot);
        //专家
        this.ajax(this.http_url.url+"/counselor/coun/list",{"sinceId":1, "maxId":5},function(data){
          that.zj=data.data;
        });
        //机构
        this.ajax(this.http_url.url+"/agency/findAgencysForRecommendByParams",{"sinceId":1, "maxId":3},function(data){
          that.jg=data.datas.slice(0,3);
        });
        //大咖访谈
        this.ajax(this.http_url.url+"/video/search",{"sinceId":1, "maxId":4, "type":"3"},function(data){
          that.dk=data.videos;
        });
        //微课
        this.ajax(this.http_url.url+"/video/search",{"sinceId":1, "maxId":4, "type":"0"},function(data){
          that.wk=data.videos;
        })
      },
      methods:{
        //大咖访谈视频点击
        dk_click:function(data){
          var that=this
          this.ajax(this.http_url.url+'video/vid',{id:data.id},function (e) {
            that.$router.push({name:'video',query:{vid:e.data.vid}})
          })
        },
        //微课点击
        wk_click:function(data){
          var that=this
          this.ajax(this.http_url.url+'video/vid',{id:data.id},function (e) {
            that.vid=e.data.vid
            if(data.ifBuy==1||data.price==0){
              if(data.price==0){
                _czc.push(["_trackEvent","微课免费","点击"]);
              }
              that.$router.push({name:'video',query:{vid:that.vid}})
            }else{
              _czc.push(["_trackEvent","微课付费","点击"]);
              data={videoId:data.id,source:2,money:data.price,url:'video'};
              var money=data.money;
              data=encodeURIComponent(JSON.stringify(data));
              that.$router.push({ name: 'payMethod',query: {url:'video',price:money ,source:"微课",data:data}})
            }
          })
        },
          get_child:function(){
            this.$nextTick(() => {
              this.$refs.child.init("222")
            });
          },
          //一元围观
        weiguan:function(val,status){
          var that=this;
          _czc.push(["_trackEvent","一元围观","点击"]);
          this.ajax_nodata(this.http_url.url+"/user/message",function(data){
              if(status==1){
                that.$router.push({ name: 'answerWacthDetail',query:{"uuid":val}})
              }else{
                if(data.tsfTime!=null&&data.tsfTime!=''){
                  var tt=new Date().getTime();
                  if(tt>data.tsfTime){
                    that.$router.push({ name: 'answerWacth',query: {"uuid":val,"money":1}});
                  }else{
                    that.$router.push({ name: 'answerWacthDetail',query:{"uuid":val}})
                  }
                }else{
                  that.$router.push({ name: 'answerWacth',query: {"uuid":val,"money":1}});
                }
              }
          });
          // this.$router.push({ name: 'answerWacth',query:{questionUuid:val}})
        },
        //最新问答
        get_new:function(data){
          // console.log(data);
          var data=data.data;
          for(var i=0;i<data.length;i++){
            if(data[i].content.length>30){
              data[i].content=data[i].content.substr(0,30)+"...";
            }
          }
          this.zxwd=data;
        },
        //专题
        get_zt:function(data){
          //console.log(data);
          var data=data.data;
          for(var i=0;i<data.length;i++){
            if(data[i].content.length>40){
              data[i].content=data[i].content.substr(0,40)+"...";
            }
          }
          this.zt=data;
        },
        //配置
        get_set:function(data){
          var that=this;
          //console.log(data);
          this.zt_name=data.columnRecom.description;
          this.zt_topic=data.columnRecom.name;
          that.ajax(this.http_url.url+'/onlook/serarch',{
            "sinceId":1,
            "maxId":5,
            "type":this.zt_topic,
            "typeContent":this.zt_name
          },that.get_zt);
        },
        //最热问答
        get_hot:function(data){
          // //console.log(data);
          var data=data.data;
          for(var i=0;i<data.length;i++){
            if(data[i].content.length>40){
              data[i].content=data[i].content.substr(0,40)+"...";
            }
          }
          this.zrwd=data;
        }
      }
    }
</script>

<style scoped>
  @import '../../static/css/swiper.min.css';
  .gray{
    color:#c6c6c6!important;
  }
  .wk-price{
    font-size: 1rem;
    padding:0 0 0 0.8rem!important;
    position: absolute;
    bottom:1.2rem;
  }
  .wktj{
    margin:2.94rem 0 5.94rem 0 ;
  }
  .dkft-list>div{
    padding:0.5rem 0.9rem;
    font-size: 1rem;
    line-height: 1.5rem;
    color:#1A1A1A;
  }
  .video-hover{
    border-radius: 6px;
  }
  .dkft-new{
    margin-top: 3.4rem;
  }
  .dkft-list{
    box-shadow:0px 0px 12px 0px rgba(221,221,221,0.4);
    border-radius:4px;
    width:24%;
    position: relative;
    height:16.5rem;
  }
  .dkft-list>img{
    width:100%;
    height:9.88rem;
  }
  .dkft-body{
    display: flex;
    justify-content: space-between;
    width:100%;
  }
  .jgtj-body{
    display: flex;
    justify-content: space-between;
  }
  .jg-name{
    position: absolute;
    bottom:0;
    color:#fff;
    width:100%;
    height:2.6rem;
    line-height: 2.6rem;
    background: rgba(0,0,0,.3);
    padding-left: 1.19rem;
    font-size: 1rem;
  }
  .jgtj-body>div{
    width:23.25rem;
    height:14.12rem;
    border-radius:4px;
    position: relative;
    vertical-align: top;
  }
  .jgtj-body>div>img{
    width:100%;
    height:100%;
    border-radius:4px;
  }
  .jgtj{
    margin-top: 2.5rem;
  }
  .look-zj{
    width:7.69rem;
    height:1.94rem;
    line-height: 1.94rem;
    text-align: center;
    background:rgba(72,114,237,1);
    border-radius:4px;
    color:#fff;
    font-size: 0.75rem;
    margin: 0 auto;
  }
  .zj-ly{
    font-size: 0.75rem;
    color:#333;
    margin: 1.19rem 0 1.44rem 0;
    line-height: 1.125rem;
  }
  .zj-zz{
    font-size: 0.75rem;
    color:#999;
  }
  .zj-name{
    font-size: 1.06rem;
    font-weight: bold;
    margin-top: 1.125rem;
    color:#333;
    margin-bottom: 0.56rem;
  }
  .zjk-head{
    width:6.125rem;
    height:6.125rem;
    border-radius: 50%;
    margin-top:1.75rem ;
  }
  .zjk-body>div{
    width:18%;
    height:20rem;
    border:1px solid rgba(238,238,238,1);
    border-radius:4px;
    text-align: center;
    padding:0 1.5rem;
  }
  .zjk-body{
    display: flex;
    justify-content: space-between;
  }
  .new-model>.container:before{
    display: table;
    content: '';
  }
  .zjk{
    margin-top:1.69rem;
  }
  .home-model-header{
    border: none;
    height:auto;
    line-height:auto;
    margin-top: 0;
    margin-bottom: 0.8rem;
  }
  .home-head-title{
    font-size: 1.5rem;
  }
  .new-model{
    background: #fff;
    min-height:30rem;
    height:auto;
    margin-top: 3rem;
  }
  .some-wd>div{
    vertical-align: top;
  }
  .home-body{
    background: #F9F9F9;
  }
  .wd-more>a{
    color:#999;
  }
  .wd-more>img{
    vertical-align: middle;
    margin-top: -0.1rem;
  }
  .wd-list:nth-child(odd) .wd-new-msg{
    border-right: 1px solid #eee;
  }
  /*.wd-new-msg{*/
    /*border-right: 1px solid #eee;*/
  /*}*/
  .wd-date{
    font-size: 0.81rem;
    color:#999;
    margin-top: 0.94rem;
  }
  .wd-msg-title:hover{
    color:#6389F0;
  }
  .wd-msg-title{
    width:73%;
    font-size: 0.875rem;
    vertical-align: top;
    line-height: 1.38rem;
    height:2.75rem;
    color:#333;
  }
  .go-wg-btn{
    width:3.8rem;
    height:1.5rem;
    line-height: 1.5rem;
    text-align: center;
    border:1px solid rgba(148,176,255,1);
    border-radius:2px;
    color:#4D7BFF;
    font-size: 0.75rem;
    margin-top: 0.3rem;
    vertical-align: top;
    margin-left: 1rem;
  }
  .wd-list{
    margin-bottom: 2rem;
    width:47%;
    margin-left: 3%;
  }
  .some-wd-new-body{
    padding:1.94rem 0 0 0;
  }

  .wd-more{
    font-size: 0.81rem;
    color:#999;
    vertical-align: middle;
    float: right;
    margin-right: 1.25rem;
  }
  .wd-name{
    font-size: 1.25rem;
    font-weight: bold;
    margin-left: 0.75rem;
  }
  .some-wd-new-title>img{
    vertical-align: middle;
    margin-top: -0.4rem;
  }
  .some-wd-new-title{
    height:3.88rem;
    line-height: 3.88rem;
    padding-left:2.69rem;
    width: 49.79%;
    color:#333;
    background: #F2F2F2;
  }
  .some-wd-new-title-act{
    color:#6389F0;
    background: #fff;
  }
  /*.some-wd-new-title:hover{*/
    /*color:#333;*/
    /*background: #F2F2F2;*/
  /*}*/
  /*.some-wd-new-title:hover .wd-act{*/
    /*display: inline-block;*/
  /*}*/
  /*.some-wd-new-title:hover .wd-noact{*/
    /*display:none;*/
  /*}*/
  .some-wd-new-body{
    height:34.3rem;
  }
  .some-wd{
    background: #fff;
    margin-top: 0.69rem;
  }
  .some-wd>div{
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
    background: url(../../static/img/zjk_prev.png) no-repeat;
  }
  .s2 .swiper-button-next{
    width:1.88rem;
    background: url(../../static/img/zjk-next.png) no-repeat;
  }
  .h-main-left{
    width:79%;
    margin-top: 0.44rem;
  }
  .h-main-right{
    width:19%;
    vertical-align: top;
    padding:0;
    margin-top:0.44rem;
    background: #fff;
    height:57.69rem;
  }
  .weiguan_also{
    background:rgba(246,246,246,1);
    border:1px solid rgba(238,238,238,1);
    border-radius:2px;
    color:#999;
  }
</style>
