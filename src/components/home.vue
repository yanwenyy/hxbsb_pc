<template>
    <div class="home-body">
      <Swiper></Swiper>
      <div class="container">
        <div class="home-main box-sizing">
          <div class="h-main-left inline-block">
            <div class="wg-notice box-sizing">
              <img src="../../static/img/home-wg-tongtai.png" alt="">
              <div class="inline-block">
                  <ul class="notice-ul">
                    <li class="notice-li" v-for="item in notice">
                      <img :src="head_src+item.headImage" alt="" :onerror="head_error">
                      <div class="inline-block">{{item.peepName}}围观了"{{item.content}}"</div>
                    </li>
                  </ul>
              </div>
            </div>
            <div>
              <div class="home-model-header">
                <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>最新问答</div>
                <div class="inline-block"><router-link :to="{ name: 'quesAnswerBank', query: { name: 'new' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
              </div>
              <div class="wdk-list-group box-sizing">
                <div class="wdk-list" v-for="item in zxwd">
                  <div class="inline-block"  @click="weiguan(item.uuid,item.status)">
                    <div class="wdk-name">
                      <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
                      <div class="inline-block user_name">{{item.realName||"匿名用户"}}</div>
                      <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
                      <div class="home-list-msg-group">
                        <div class="inline-block home-list-msg">{{item.content}}</div>
                        <div class="inline-block weiguan" :class="item.status==1? 'weiguan_also':''">{{item.status==1? '已围观':'一元围观'}}</div>
                      </div>
                      <div class="label box-sizing">
                        <div class="inline-block">{{format(item.date)}}</div>
                        <div class="inline-block">
                          <div class="see-num inline-block">
                            <!--<img class="home-zan" :src="zan==1? '../../static/img/zan1.png':'../../static/img/zan2.png'" alt="" :data-code="zan" v-on:click="zan_click(zan)" >-->
                            点赞
                            {{item.approveNum}}
                          </div>
                          <div class="see-num inline-block">
                            <!--<img class="home-cai" src="../../static/img/eye.png" alt="">-->
                            围观
                            {{item.lookNum}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="home-model-header">
                <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>本期热门专题：{{zt_name}}</div>
                <div class="inline-block"><router-link :to="{ name: 'answerSearch', query: { type: zt_topic,typeContent:zt_name }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
              </div>
              <div class="wdk-list-group box-sizing">
                <div class="wdk-list" v-for="item in zt">
                  <div class="inline-block"  @click="weiguan(item.uuid,item.status)">
                    <div class="wdk-name">
                      <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
                      <div class="inline-block user_name">{{item.realName||"匿名用户"}}</div>
                      <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
                      <div class="home-list-msg-group">
                        <div class="inline-block home-list-msg">{{item.content}}</div>
                        <div class="inline-block weiguan" :class="item.status==1? 'weiguan_also':''">{{item.status==1? '已围观':'一元围观'}}</div>
                      </div>
                      <div class="label box-sizing">
                        <div class="inline-block">{{format(item.date)}}</div>
                        <div class="inline-block">
                          <div class="see-num inline-block">
                            <!--<img class="home-zan" :src="zan==1? '../../static/img/zan1.png':'../../static/img/zan2.png'" alt="" :data-code="zan" v-on:click="zan_click(zan)" >-->
                            点赞
                            {{item.approveNum}}
                          </div>
                          <div class="see-num inline-block">
                            <!--<img class="home-cai" src="../../static/img/eye.png" alt="">-->
                            围观
                            {{item.lookNum}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="home-model-header">
                <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>最热围观</div>
                <div class="inline-block"><router-link :to="{ name: 'quesAnswerBank', query: { name: 'hot' }}">查看更多</router-link> <img src="../../static/img/more.png" alt=""></div>
              </div>
              <div class="wdk-list-group box-sizing">
                <div class="wdk-list" v-for="item in zrwd">
                  <div class="inline-block"  @click="weiguan(item.uuid,item.status)">
                    <div class="wdk-name">
                      <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
                      <div class="inline-block user_name">{{item.realName||"匿名用户"}}</div>
                      <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
                      <div class="home-list-msg-group">
                        <div class="inline-block home-list-msg">{{item.content}}</div>
                        <div class="inline-block weiguan" :class="item.status==1? 'weiguan_also':''">{{item.status==1? '已围观':'一元围观'}}</div>
                      </div>
                      <div class="label box-sizing">
                        <div class="inline-block">{{format(item.date)}}</div>
                        <div class="inline-block">
                          <div class="see-num inline-block">
                            <!--<img class="home-zan" :src="zan==1? '../../static/img/zan1.png':'../../static/img/zan2.png'" alt="" :data-code="zan" v-on:click="zan_click(zan)" >-->
                            点赞
                            {{item.approveNum}}
                          </div>
                          <div class="see-num inline-block">
                            <!--<img class="home-cai" src="../../static/img/eye.png" alt="">-->
                            围观
                            {{item.lookNum}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="h-main-right inline-block box-sizing">
            <HomeRight></HomeRight>
          </div>
          <ScrollTop></ScrollTop>
        </div>
      </div>
    </div>
</template>

<script>
  import Swiper from '@/components/swiper'
  import HomeRight from '@/components/homeRight'
  import ScrollTop from '@/components/scrollTop'
    export default {
        name: "home",
        components: {
          Swiper,
          HomeRight,
          ScrollTop
        },
      created () {

      },
      mounted () {
          //通告栏
          var scroll=0,num=0;
          const timer = setInterval(() =>{
              if(num==$(".notice-li").size()-1){
                scroll=0,num=-1;
                $(".notice-ul").css("top","0px");
              }
              num+=1;
              scroll=-num*2.31;
              // $("ul").css("top",scroll+"px");
              $(".notice-ul").animate({top:scroll+"rem"},"normal","linear");
          // 某些定时器操作
          }, 2000);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          });
          //通告内容
          this.ajax_nodata(this.http_url.url+'/indexOnLookQ',this.get_notice);
          //最新
          this.ajax(this.http_url.url+'/onlook/look/list',{
            "sinceId":1,
            "maxId":5,
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
        },
      data () {
          return{
            //头像出错
            head_error:"this.src='../../static/img/user-img.png'",
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
            notice:[]
          }
        },
      methods:{
          //一元围观
        weiguan:function(val,status){
          if(status==1){
            this.$router.push({ name: 'answerWacthDetail',query:{"uuid":val}})
          }else{
            this.$router.push({ name: 'answerWacth',query: {"uuid":val,"money":1}});
          }
          // this.$router.push({ name: 'answerWacth',query:{questionUuid:val}})
        },
        //首页通告栏
        get_notice:function(data){
          this.notice=data.datas;
        },
        //最新问答
        get_new:function(data){
          // console.log(data);
          var data=data.data;
          for(var i=0;i<data.length;i++){
            if(data[i].content.length>40){
              data[i].content=data[i].content.substr(0,40)+"...";
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
</style>
