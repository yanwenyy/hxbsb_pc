<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的购买"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的购买</div>
        </div>
        <div class="mine-right-body">
          <div class="mine-buy-body box-sizing">
            <div class="mine-buy-title">
              <div class="inline-block mine-buy-headname" @click="mine_buy_title('我的围观')">
                我的围观
                <span class="inline-block" v-if="headName=='我的围观'"></span>
              </div>
              <div class="inline-block mine-buy-headname" @click="mine_buy_title('已购视频')">
                已购视频
                <span class="inline-block" v-if="headName=='已购视频'"></span>
              </div>
            </div>
            <div class="mine-buy-main">
              <div class="mine-buy-wacth" v-if="headName=='我的围观'">
                <div class="wdk-list-group box-sizing">
                  <div class="wdk-list" v-for="item in questions">
                    <div class="inline-block">
                      <div class="wdk-name">
                        <img :src='head_src+item.headImage'  onerror="javascript:this.src='./static/img/user-img.png';">
                        <div class="inline-block user_name">{{item.realName||"匿名用户"}}</div>
                        <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
                        <div class="home-list-msg-group">
                          <div class="inline-block home-list-msg">{{item.content}}</div>
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
                          <div class="inline-block statu" v-if="item.status==9">已纠错</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mine-buy-video box-sizing"  v-if="headName=='已购视频'">
                <div class="inline-block" v-for="item in video">
                  <img :src="cover_src+item.image" alt="" @click="video_click(item.id)">
                  <div>{{item.title}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="page" class="paging"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
        name: "min-buy",
        data(){
            return{
              headName:'我的围观',
              start:'1',
              end:'6',
              //围观列表
              questions:[],
              video:[],
              count:''
            }
        },
        components:{
          mineLeft
        },
        mounted(){
          if(this.headName=="我的围观"){
            this.ajax(this.http_url.url+"/user/secretly",{"sinceId":this.start,"maxId":this.end},this.get_wg);
          }
        },
        methods:{
          //tab切换
          mine_buy_title:function(val){
            this.start=1;
            this.end=6;
            this.headName=val;
            if(val=="我的围观"){
              this.ajax(this.http_url.url+"/user/secretly",{"sinceId":this.start,"maxId":this.end},this.get_wg);
            }else{
              this.ajax(this.http_url.url+"/video/buylist",{"sinceId":this.start,"maxId":this.end},this.get_video);
            }
          },
          //分页
          page:function(data){
            var that=this;
            $("#page").paging({
                total: data,
                numberPage: 1
              },
              function(msg) {
                //回调函数 msg为选中页码
                // tab(msg);
                that.start=((msg-1)*6)+1;
                that.end=msg*6;
                if(that.headName=="我的围观"){
                  that.ajax(that.http_url.url+"/user/secretly",{
                    "sinceId":that.start,
                    "maxId":that.end,
                  },that.get_wg_page)
                }else{
                  that.ajax(that.http_url.url+"/video/buylist",{
                    "sinceId":that.start,
                    "maxId":that.end,
                  },that.get_video_page)
                }
              });
          },
          //围观数据
          get_wg:function(data){
              // console.log(data);
            this.questions=data.questions;
            this.count=data.count/6;
            this.page(this.count);
          },
          //分页围观回调
          get_wg_page:function(data){
            this.questions=data.questions;
          },
          //已购视频
          get_video:function(data){
            console.log(data);
            this.video=data.data;
            this.count=data.count/6;
            this.page(this.count);
          },
          //分页已购视频回调
          get_video_page:function(data){
            this.video=data.data;
          },
          //视频点击
          video_click:function(id){
            // console.log(id);
            var that=this;
            function get_vid(data){
              console.log(data);
              that.$router.push({
                name:'video',
                query:{"vid":data.data.vid}
              })
            }
            this.ajax(this.http_url.url+"/video/vid",{"id":id},get_vid);
          }
        }
    }
</script>

<style scoped>
  .mine-buy-body{
    padding:0 1rem;
  }
  .mine-buy-title{
    font-size: 0.875rem;
    color:#666;
    margin-top: 1rem;
  }
  .mine-buy-headname{
    margin-right: 1.875rem;
    position: relative;
    padding-bottom: 0.875rem;
  }
  .mine-buy-headname>span{
    width:1.69rem;
    height:4px;
    background: #2D86FD;
    position: absolute;
    bottom: 0;
    left:0.875rem;
    border-radius: 2px;
  }
  .mine-right{
    min-height: 43.31rem;
    height: auto;
  }
  .mine-buy-video{
    margin: 1rem 0;
  }
  .mine-buy-video>div{
    box-sizing: border-box;
    color:#666;
    font-size: 0.875rem;
    width:31%;
    margin-right: 2%;
    padding: 0.5rem;
    vertical-align: top;
  }
  .mine-buy-video>div>img{
    width:100%;
    height:9rem;
    margin-bottom: 1rem;
  }
  .label>div.statu{
    margin-left: 1.5rem;
  }
</style>
