<template>
  <div class="home-body">
    <Swiper></Swiper>
    <div class="container">
      <div class="home-main box-sizing">
        <div class="inline-block">
          <div class="wdk-select-group">
            <ul>
              <li>
                <div class="wdk-select-name inline-block">全部类型:</div>
                <div class="wdk-select-msg inline-block">
                  <div class="inline-block blue" @click="load_list()">全部</div>
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
                  <div class="inline-block wdk-select-msg-div" v-for="item in sz" data-type="tax">{{item.name}}</div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div class="home-model-header">
              <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>问答库</div>
              <div class="inline-block">为您筛选到以下围观信息</div>
            </div>
            <div v-if="nomsg" class="no-msg">暂无相关内容</div>
            <div class="wdk-list-group box-sizing">
              <div class="wdk-list" v-for="item in list"  @click="weiguan(item.uuid,item.status)">
                <div class="inline-block">
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
          <div class="load-more">
            <span class="inline-block gray-line"></span>
            <span class="inline-block load-more-btn" @click="load_more()">点击加载更多</span>
            <span class="inline-block gray-line"></span>
          </div>
        </div>
        <!--<div class="h-main-right inline-block box-sizing">-->
          <!--<HomeRight></HomeRight>-->
        <!--</div>-->
        <div class="go-top"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from '@/components/swiper'
  import HomeRight from '@/components/homeRight'
  export default {
    name: "home",
    components: {
      Swiper,
      HomeRight
    },
    data () {
      return{
        nomsg:false,
        //列表数据
        list:[],
        //问答库筛选
        //行业
        hy:[],
        //税种
        sz:[],
        //主题
        zt:[],
        type:"new",
        num:1,
        count_start:1,
        count_end:10
      }
    },
    mounted () {
      var that=this;
      //删选条件点击
      $("body").on("click",".wdk-select-msg-div",function(){
        this.num=1;
        this.count_start=1;
        this.count_end=10;
        $(".wdk-select-msg>div").removeClass("blue");
        $(this).addClass("blue");
        var type=$(this).attr("data-type"),typeContent=$(this).html();
        that.ajax(that.http_url.url+'/onlook/serarch',{
          "sinceId":1,
          "maxId":10,
          "type":type,
          "typeContent":typeContent
        },that.get_list);
      });
      if(this.$route.query.name){
        this.type=this.$route.query.name;
        //列表数据加载
        // this.ajax(this.http_url.url+'/onlook/look/list',{
        //   "sinceId":this.count_start,
        //   "maxId":this.count_end,
        //   "type":this.type
        // },this.get_list);
        this.load_list();
      }else{
        //列表数据加载
        // this.ajax(this.http_url.url+'/onlook/look/list',{
        //   "sinceId":this.count_start,
        //   "maxId":this.count_end,
        //   "type":this.type
        // },this.get_list);
        this.load_list();
      }
      //行业,税种,专题
      this.ajax_nodata(this.http_url.url+'/category/tree',this.get_tree);
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
      //列表数据
      load_list:function(){
        this.num=1;
        this.count_start=1;
        this.count_end=10;
        this.ajax(this.http_url.url+'/onlook/look/list',{
          "sinceId":this.count_start,
          "maxId":this.count_end,
          "type":this.type
        },this.get_list);
      },
      //列表
      get_list:function(data){
        // console.log(data);
        var data=data.data;
        if(data!=""&&data!=null){
          this.nomsg=false;
          $(".load-more").show();
          for(var i=0;i<data.length;i++){
            if(data[i].content.length>40){
              data[i].content=data[i].content.substr(0,40)+"...";
            }
          }
        }else{
          $(".load-more").hide();
          this.nomsg=true;
        }
        this.list=data;
      },
      get_list_more:function(data){
        // console.log(data);
        var data=data.data;
        if(data!=""&&data!=null){
          for(var i=0;i<data.length;i++){
            if(data[i].content.length>40){
              data[i].content=data[i].content.substr(0,40)+"...";
            }
            this.list.push(data[i]);
          }
        }else{
          $(".load-more").hide();
        }
      },
      //行业,税种,专题
      get_tree:function(data){
        // console.log(data);
        var categorys=data.categorys;
        this.hy=this.get_category(categorys,"行业");
        this.sz=this.get_category(categorys,"税种");
        this.zt=this.get_category(categorys,"专题");
      },
      //点击加载更多
      load_more:function(){
        this.num+=1;
        this.count_start=((this.num-1)*10)+1;
        this.count_end=this.num*10;
        this.ajax(this.http_url.url+'/onlook/look/list',{
          "sinceId":this.count_start,
          "maxId":this.count_end,
          "type":this.type
        },this.get_list_more);
      }
    }
  }
</script>

<style scoped>
  @import '../../../static/css/swiper.min.css';
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
</style>
