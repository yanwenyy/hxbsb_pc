<template>
    <div class="container">
      <div class="home-main box-sizing">
        <div class="h-main-left inline-block">
          <div class="home-model-header">
            <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>搜索结果</div>
          </div>
          <!--<div class="no-msg out">暂无相关内容</div>-->
          <div class="no-msg-img" v-show="list==''&&typeContent==undefined">
            <img src="../../../static/img/no-msg-img.png" alt="">
            <div>没有搜到相关内容哦～</div>
          </div>
          <div class="wdk-list-group box-sizing">
            <div class="wdk-list" v-for="item in list"  @click="weiguan(item.uuid,item.status)">
              <div class="inline-block">
                <div class="wdk-name">
                  <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
                  <div class="inline-block user_name">{{get_name(item)}}</div>
                  <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
                  <div class="home-list-msg-group">
                    <div class="inline-block home-list-msg">{{item.content}}</div>
                    <div class="inline-block weiguan" :class="item.status==1? 'weiguan_also':''">{{item.status==1? '已围观':'围观'}}</div>
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
          <div class="load-more out"  v-if="list.length==end">
            <span class="inline-block gray-line"></span>
            <span class="inline-block load-more-btn" @click="load_more()">点击加载更多</span>
            <span class="inline-block gray-line"></span>
          </div>
        </div>
        <div class="h-main-right inline-block box-sizing">
          <ztRight></ztRight>
        </div>
      </div>
    </div>
</template>

<script>
  import ztRight from '@/components/ztRight'
    export default {
        name: "answer-search",
        components:{
          ztRight
        },
        data () {
          return{
            //列表数据
            list:[],
            //没有数据
            nomsg:false,
            msg:'',
            type:'',
            typeContent:'',
            start:1,
            end:10,
            num:1,
            first:true,
          }
        },
        mounted () {
          var that=this;
          this.msg=this.$route.query.msg;
          this.type=this.$route.query.type;
          this.typeContent=this.$route.query.typeContent;
          //搜索答案按钮点击
          $("body").on("click",".header-search-answer",function(){
            that.list=[];
            this.msg=$(".search-input-header>input").val();
            that.ajax(that.http_url.url+'/onlook/serarch',{
              "sinceId":1,
              "maxId":10,
              "content":this.msg,
              "type":this.type,
              "typeContent":this.typeContent
            },function(data){
              var data=data.data;
              if(data!=null&data!=""){
                $(".no-msg").hide();
                $(".load-more").show();
                for(var i=0;i<data.length;i++){
                  if(data[i].content.length>40){
                    data[i].content=data[i].content.substr(0,40)+"...";
                  }
                }
                that.list=data;
              }else{
                that.first=false;
                $(".no-msg").show();
                $(".load-more").hide();
              }
            });
          });
          setTimeout(function(){
            that.ajax(that.http_url.url+'/onlook/serarch',{
              "sinceId":1,
              "maxId":10,
              "content":that.msg,
              "type":that.type,
              "typeContent":that.typeContent
            },that.get_list);
          },1500);
        },
        methods:{
          //一元围观
          weiguan:function(val,status){
            //用户所有信息
            _czc.push(["_trackEvent","一元围观","点击"]);
            var that=this;
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
          //列表
          get_list:function(data){
            var that=this;
            //console.log(data);
            var data=data.data;
            if(data!=null&data!=""){
              $(".no-msg").hide();
              $(".load-more").show();
              for(var i=0;i<data.length;i++){
                if(data[i].content.length>40){
                  data[i].content=data[i].content.substr(0,40)+"...";
                }
              }
              this.list=data;
            }else{
              $(".no-msg").show();
              $(".load-more").hide();
            }
          },
          get_list_more:function(data){
            // console.log(data);
            var data=data.data;
            if(data!=""&&data!=null){
              $(".load-more").show();
              for(var i=0;i<data.length;i++){
                if(data[i].content.length>40){
                  data[i].content=data[i].content.substr(0,40)+"...";
                }
                console.log(data);
                this.list.push(data[i]);
              }
            }else{
              $(".load-more").hide();
            }
          },
          //点击加载更多
          load_more:function(){
            this.num+=1;
            this.count_start=((this.num-1)*10)+1;
            this.count_end=this.num*10;
            this.ajax(this.http_url.url+'/onlook/serarch',{
              "sinceId":this.count_start,
              "maxId":this.count_end,
              "content":this.msg||undefined,
              "type":this.type||undefined,
              "typeContent":this.typeContent||undefined
            },this.get_list_more);
          }
        }
    }
</script>

<style scoped>
  .h-main-right{
    margin-top: 0rem;
  }
</style>
