<template>
  <div>
    <headerTab msg="专家"></headerTab>
    <div class="container">
      <div class="expert-list box-sizing cursor">
        <img :src="head_src+users.headImage" alt=""  onerror="javascript:this.src='./static/img/expert-head.png';">
        <div class="expert-msg inline-block">
          <div class="user-expert">
            <span class="inline-block expert-name">{{users.userName}}</span>
            <span class="inline-block expert-duty">{{users.province}}-{{users.levelName}}</span>
          </div>
          <div class="expert-position">
            <img src="../../../static/img/expert-bs.png" alt="">
            <span class="orange">{{users.counselorDuty}}</span>
          </div>
          <div class="expert-company">{{users.companyName}}</div>
          <div class="expert-good">
            擅长领域：<span v-for="item in users.adepts">{{item}}</span>
          </div>
        </div>
        <span class="expert-line inline-block"></span>
        <div class="expert-score inline-block box-sizing">
          <div>
            <div class="inline-block score-list">
              <div>{{parseFloat(users.grScore).toFixed(1)}}</div>
              <div>采纳评分</div>
            </div>
            <div class="inline-block score-list">
              <div>{{parseFloat(users.adScore).toFixed(1)}}</div>
              <div>咨询评分</div>
            </div>
          </div>
          <div class="follow" @click="follow()" v-show="self!=1&&isAttention!=1">关注</div>
          <div class="follow follow-also" @click="delet_follow()" v-show="self!=1&&isAttention==1">取消关注</div>
        </div>
      </div>
      <div class="expert-detail-msg">
        <div>
          <span class="expert-msg-title">个人经历：</span>
          <div class="inline-block msg-small">{{users.experience||'暂无相关信息'}}</div>
        </div>
        <div v-show="small">
          <div>
            <span class="expert-msg-title">经典案例：</span>
            <div class="inline-block msg-small">{{users.classicalCase&&users.classicalCase.length>58?users.classicalCase.slice(0,58)+"...":"暂无相关信息"}}</div>
            <div class="inline-block look-more blue cursor" v-show="users.classicalCase&&users.classicalCase.length>58" @click="big=true;small=false">查看更多</div>
          </div>
        </div>
        <div v-show="big">
          <div>
            <span class="expert-msg-title">经典案例：</span>
            <div class="inline-block msg-small">{{users.classicalCase||"暂无相关信息"}}</div>
            <div class="inline-block look-more blue cursor" style="vertical-align: bottom" @click="big=false;small=true">收起</div>
          </div>
        </div>
      </div>
      <div class="expert-answer">
        <div class="expert-answer-title">被采纳的问题</div>
        <div class="box-sizing">
          <div class="expert-answer-list box-sizing inline-block cursor" v-for="item in answer"   @click="weiguan(item.uuid,item.status)">
            <div>
              <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';" class="expert-answer-head">
              <div class="inline-block expert-answer-name">{{get_name(item)}} <img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
              <div class="inlien_block blue expert-answer-go">去围观<img src="../../../static/img/espert-go.png" alt=""></div>
            </div>
            <div class="expert-answer-msg">{{item.content.length>50? item.content.slice(0,50)+"...":item.content}}</div>
            <div class="expert-answer-date">{{format(item.date)}} 点赞{{item.approveNum}} 围观{{item.lookNum}}</div>
          </div>
          <div class="no-msg-img" v-show="answer==''">
            <img src="../../../static/img/no-msg-img.png" alt="">
            <div>暂无内容</div>
          </div>
        </div>
      </div>
      <div class="load-more"  v-if="answer&&answer.length==end">
        <span class="inline-block gray-line"></span>
        <span class="inline-block load-more-btn" @click="load_more()">点击加载更多</span>
        <span class="inline-block gray-line"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import headerTab from "@/components/headerTab"
    export default {
      name: "expert-homepage",
      components: {
        headerTab
      },
      data(){
        return{
          small:true,//经典案例少版
          big:false,//经典案例多版
          users:'',
          self:'',//是否是自己的主页
          isAttention:'',//是否已关注
          answer:[],//被采纳的问题
          start:1,
          end:8,
          num:1,
        }
      },
      mounted(){
        var that=this;
        this.ajax(this.http_url.url+"/personal/home",{"phone":this.$route.query.phone},function(data){
          that.users=data.users;
          that.self=data.self;
          that.isAttention=data.isAttention;
        });
        this.ajax(this.http_url.url+"/personal/user/adop",{
          "uuid":this.$route.query.phone,
          "sinceId":this.start,
          "maxId":this.end
        },function(data){
          that.answer=data.data;
        });
      },
      methods:{
        //点击加载更多
        load_more:function(){
          var that=this;
          this.num+=1;
          this.start=((this.num-1)*8)+1;
          this.end=this.num*8;
          this.ajax(this.http_url.url+'/personal/user/adop',{
            "uuid":this.$route.query.phone,
            "sinceId":this.start,
            "maxId":this.end
          },function(data){
            var data=data.data;
            if(data!=""&&data!=null){
              for(var i=0;i<data.length;i++){
                that.answer.push(data[i]);
              }
            }else{
              $(".load-more").hide();
            }
          });
      },
        //关注按钮点击
        follow:function(){
          var that=this;
          this.ajax(this.http_url.url+"/attention/user",{
            "phoneNum":this.$route.query.phone,"isAttention":1
          },function(data){
              if(data.code==1){
                location.reload();
              }else{
                that.$myToast.error(data.des);
              }
          });
        },
        //取消关注按钮点击
        delet_follow:function(){
          var that=this;
          if(confirm("确定不再关注吗?")==true){
            this.ajax(this.http_url.url+"/attention/user",{
              "phoneNum":this.$route.query.phone,"isAttention":0
            },function(data){
              if(data.code==1){
                location.reload();
              }else{
                that.$myToast.error(data.des);
              }
            })
          }
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
      }
    }
</script>

<style scoped>
  .expert-answer-date{
    font-size: 0.81rem;
    color:#999;
  }
  .expert-answer-msg{
    margin: 1.06rem 0 1.125rem 0;
    font-size: 1rem;
    color:#333;
    line-height:1.38rem;
    height:2.75rem;
  }
  .expert-answer-go{
    font-size: 0.81rem;
    float: right;
    margin-top: 0.5rem;
  }
  .expert-answer-go>img{
    margin-left: 0.5rem;
  }
  .expert-answer-head{
    width:2rem;
    height:2rem;
    vertical-align: middle;
    border-radius: 50%;
  }
  .expert-answer-name{
    font-size: 0.88rem;
    color:#444;
  }
  .expert-answer-name>img{
    width:3.19rem;
    height:1rem;
    vertical-align: middle;
  }
  .expert-answer-list{
    width:49%;
    height:11.8rem;
    border:1px dotted rgba(229,229,229,1);
    border-radius:2px;
    margin-bottom: 1.69rem;
    padding:2.125rem 2rem;
    vertical-align: top;
  }
  .expert-answer-list:nth-child(odd){
    margin-right: 2%;
  }
  .expert-answer-title{
    font-size:1.5rem;
    color:#1A1A1A;
    font-weight: bold;
    margin-bottom: 1.8rem;
  }
  .expert-answer{
    margin-top: 4.25rem;
  }
  .expert-msg-title{
    color:#666;
    font-weight: bold;
  }
  .look-more{
    vertical-align: top;
    margin-top: 0.3rem;
  }
  .msg-small{
    width:83%;
    margin-right: 3%;
    line-height: 1.5rem;
    vertical-align: top;
    word-break: break-all;
    margin-top: -0.2rem;
  }
  .expert-detail-msg{
    background:rgba(248,248,248,1);
    padding:1.75rem 1.38rem;
    font-size: 1rem;
  }
  .expert-detail-msg>div:nth-child(1){
    margin-bottom:1.19rem ;
  }
  .follow{
    width:6.38rem;
    height:2.25rem;
    line-height: 2.25rem;
    margin: 2.25rem auto;
    text-align: center;
    background:rgba(72,114,237,1);
    border:1px solid rgba(229,229,229,1);
    border-radius:2px;
    color:#fff;
    font-size: 1rem;
  }
  .follow-also{
    background: #eee;
  }
  .score-list>div:nth-child(1){
    font-size: 2rem;
    color:#333;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .score-list{
    font-size: 0.88rem;
    color:#999;
  }
  .score-list:nth-child(1){
    margin-right: 3rem;
  }
  .expert-line{
    width:2px;
    height:5rem;
    background:rgba(229,229,229,.4);
    margin-top: 4rem;
  }
  .expert-score{
    width: 20%;
    height:10rem;
    text-align: center;
    padding-top: 2.38rem;
  }
  .expert-msg{
    width:55%;
  }
  .expert-good{
    color:#999;
    font-size: 1rem;
    word-break: break-all;
    line-height: 1.625rem;
    width:90%;
  }
  .expert-good>span{
    margin-right: 0.5rem;
  }
  .expert-company{
    color:#1A1A1A;
    font-size: 1.125rem;
    margin-bottom: 1.25rem;
  }
  .expert-position>img{
    width:1rem;
    height:1.125rem;
    vertical-align: middle;
  }
  .expert-position{
    font-size: 1.125rem;
    margin-bottom: 1.06rem;
  }
  .user-expert{
    height:3.38rem;
    line-height: 3.38rem;
    margin-bottom: 1rem;
  }
  .expert-duty{
    font-size: 1rem;
    color:#666;
  }
  .expert-name{
    font-size: 1.5rem;
    color:#1A1A1A;
    border-bottom: 2px solid #E5E5E5;
  }
  .expert-list>div{
    vertical-align: top;
  }
  .expert-list>img{
    width:12.25rem;
    height:12.25rem;
    margin-right: 1.94rem;
    vertical-align: top;
  }
  .expert-list{
    height:15rem;
    border-radius:6px;
    margin-top: 2rem;
  }
</style>
