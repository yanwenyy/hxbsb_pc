<template>
  <div>
    <div class="container">
      <div class="home-main box-sizing">
        <div class="h-main-left inline-block">
          <div class="queser-grounp">
            <img :src="questionUser.isAnon==1? head_src+questionUser.headImage:'/static/img/user-img.png'"   onerror="javascript:this.src='/static/img/user-img.png';" alt="" class="queser-head">
            <div class="inline-block queser-msg">
              <div class="inline-block user_name">{{questionUser.isAnon==1? questionUser.realName:'匿名用户'}}</div>
              <div class="inline-block user-dj"><img :src="get_score(questionUser.integralScore,questionUser.aision,questionUser.vip)" alt=""></div>
              <div>{{format(questionUser.date)}}</div>
            </div>
            <div class="queser-grounp-content">
              {{questionUser.content}}
            </div>
            <div class="queser-grounp-img">
              <img :src="question_src+item" alt="" v-for="item in questionUser.images">
            </div>
            <div class="queser-grounp-footer">
              <span>{{questionUser.area}} {{questionUser.quTrade}}</span>
              <span>点赞{{questionUser.approveNum}}</span>
              <span>围观{{questionUser.lookNum}}</span>
            </div>
          </div>
          <div class="home-model-header">
            <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>回答</div>
          </div>
          <div class="answer-group" v-for="item in answewrUsers">
            <div>
              <img :src="head_src+item.headImage"   onerror="javascript:this.src='/static/img/user-img.png';" alt="" class="queser-head">
              <div class="inline-block queser-msg">
                <div class="inline-block user_name">
                  {{item.realName}}
                  <div class="inline-block zxs-img-show">
                    <img src="../../../static/img/zxs-icon.png" alt="">
                    {{item.levelName}}
                  </div>
                </div>
                <div>{{item.counselorDuty}}</div>
              </div>
            </div>
            <div class="answer-group-content">
              {{item.content}}
            </div>
            <div class="answer-group-class">
              <div class="inline-block box-sizing">#{{item.tax.replace(",",' ')}}#</div>
              <div class="inline-block box-sizing">#{{item.topic.replace(",",' ')}}#</div>
            </div>
            <div class="answer-group-footer">{{format(item.date)}}</div>
            <div class="evaluate-model box-sizing " v-if="item.status==2||item.status==6||item.status==7">
              <div class="evaluate-score">
                评价得分:
                <div class="inline-block" v-for="s in 5">
                  <img :src="s<=item.score? '../../../static/img/score-sel.png':'../../../static/img/score-unsel.png'" alt="">
                  <!--<img src="../../../static/img/score-unsel.png" alt="">-->
                </div>
              </div>
              <div class="evaluate-content">
                {{item.appraisal||"暂无评价内容"}}
              </div>
            </div>
          </div>
          <!--<div class="user-operation">-->
            <!--<div class="inline-block zan">-->
              <!--<img src="../../../static/img/zan.png" alt="">-->
              <!--<span>13</span>-->
            <!--</div>-->
            <!--<div class="inline-block cai">-->
              <!--<img src="../../../static/img/cai.png" alt="">-->
              <!--<span>13</span>-->
            <!--</div>-->
          <!--</div>-->
          <div class="comment-group">
            <input type="text" v-model="commit_msg" placeholder="请输入您的评论" class="box-sizing">
            <div class="inline-block comment-sub" @click="sub_commit()">提交</div>
          </div>
          <div class="home-model-header">
            <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>精彩评论</div>
          </div>
          <div class="comment-list">
            <div class="wdk-list" v-for="item in discussUsers">
              <div class="inline-block">
                <div class="wdk-name">
                  <img :src='head_src+item.headImage' onerror="javascript:this.src='../../static/img/user-img.png';">
                  <div class="inline-block user_name">{{item.realName}}</div>
                  <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
                  <div class="home-list-msg-group">
                    <div class="inline-block home-list-msg">{{item.content}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="load-more">
            <span class="inline-block gray-line"></span>
            <span class="inline-block load-more-btn" @click="load_more()">{{more_msg}}</span>
            <span class="inline-block gray-line"></span>
          </div>
        </div>
        <div class="h-main-right inline-block box-sizing">
          <ztRight></ztRight>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ztRight from '@/components/ztRight'
  export default {
    name: "answer-wacth",
    components:{
      ztRight
    },
    data(){
      return{
        //提问者信息
        questionUser:'',
        //回答者信息
        answewrUsers:'',
        //评论者id
        comment_id:'',
        start:1,
        end:10,
        num:1,
        //评论者信息
        discussUsers:'',
        //评论内容
        commit_msg:'',
        no_more:true,
        more_msg:"点击加载更多"
      }
    },
    mounted(){
      //回答者和提问者信息
      this.ajax_nodata(this.http_url.url+"/onlook/wx/onlookAuthorized?uuid="+this.$route.query.uuid,this.que_msg);
    },
    methods:{
      //回答者和提问者信息
      que_msg:function(data){
        // console.log(data);
        var that=this;
        this.questionUser=data.questionUser;
        this.answewrUsers=data.answewrUsers;
        for(var i=0;i<data.answewrUsers.length;i++){
          if(data.answewrUsers[i].type==0){
            if(data.answewrUsers[i].status==2||data.answewrUsers[i].status==6||data.answewrUsers[i].status==7){
              that.comment_id=data.answewrUsers[i].uuid;
            }
          }
        };
        this.ajax(this.http_url.url+"/discuss/all",{
          "sinceId":this.start, "maxId":this.end, "answerUuid":that.comment_id
        },function(data){
            // console.log(data);
          that.discussUsers=data.discussUsers;
        })
      },
      //评论加载更多
      load_more:function(){
        var that=this;
        this.num+=1;
        this.start=((this.num-1)*10)+1;
        this.end=this.num*10;
        this.ajax(this.http_url.url+"/discuss/all",{
          "sinceId":this.start, "maxId":this.end, "answerUuid":that.comment_id
        },function(data){
          // console.log(data);
          if(data.discussUsers!=""&&data.discussUsers!=null&&that.no_more){
            that.discussUsers=that.discussUsers.concat(data.discussUsers);
            // console.log(that.discussUsers);
          }else{
            that.no_more=false;
            that.more_msg="没有更多数据了"
          }
        })
      },
      //提交评论
      sub_commit:function(){
        var that=this;
        if(this.commit_msg==""){
          alert("请输入评论内容");
        }else{
          this.ajax(this.http_url.url+"/discuss/edit",{
            "answerUuid":that.comment_id,
            "discussContent":that.commit_msg
          },function(data){
              alert(data.des);
              if(data.code==1){
                that.ajax(that.http_url.url+"/discuss/all",{
                  "sinceId":that.start, "maxId":that.end, "answerUuid":that.comment_id
                },function(data){
                  that.discussUsers=data.discussUsers;
                });
                that.commit_msg="";
              }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .comment-group{
    margin-top:2.25rem ;
  }
  .home-list-msg:hover{
    color:#333;
  }
  .zxs-img-show>img{
    margin-top: -0.1rem;
  }
  .zxs-img-show{
    font-size: 0.75rem;
    color:#666;
  }
  .home-head-title{
    font-size: 1rem;
  }
  .home-list-msg{
    font-size: 0.875rem;
  }
  .comment-list>.wdk-list:before{
    display: table;
    content: '';
  }
  .comment-list>.wdk-list>div{
    padding-bottom: 1rem;
  }
  .comment-sub{
    width:5.56rem;
    height:2.25rem;
    line-height: 2.25rem;
    color:#fff;
    background:#2D86FD;
    text-align: center;
    font-size: 0.875rem;
    vertical-align: top;
    margin-left: 1.25rem;
  }
  .comment-group>input{
    width:34.94rem;
    height:2.25rem;
    border:1px solid #2D86FD;
    color:#333;
    font-size: 0.875rem;
    padding-left: 0.75rem;
    vertical-align: top;
  }
  .user-operation{
    margin: 2.375rem 0;
    text-align: center;
  }
  .zan>img{
    margin-top: 0.3rem;
  }
  .cai>img{
    margin-top: 0.6rem;
  }
  .user-operation>div{
    width:7.5rem;
    height:2.25rem;
    line-height: 2.25rem;
    border:1px solid #eee;
    color:#666;
    font-size:0.75rem ;
    margin-right: 1rem;
  }
  .zan_act{
    background: #FE6D27;
    color:#fff;
  }
  .cai_act{
    background: #BBBBBB;
    color:#fff;
  }
  .evaluate-content{
    color:#666;
    font-size: 0.875rem;
    margin-top: 0.6rem;
  }
  .evaluate-score >>>img{
    width:1.19rem;
    height:1.31rem;
    vertical-align: middle;
    margin-right: 0.44rem;
  }
  .evaluate-score{
    font-size: 0.875rem;
    color:#666;
    font-weight: bold;
    margin-top: 0.875rem;
  }
  .evaluate-model{
    width:100%;
    min-height:4.81rem;
    height:auto;
    background: #F6F6F6;
    padding:0 0.69rem;
  }
  .evaluate-model:before{
    display:table;
    content: '';
  }
  .queser-grounp{
    padding-top:1.19rem;
  }
  .queser-head{
    width:2.5rem;
    height:2.5rem;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 0.2rem;
  }
  .queser-msg{
    vertical-align: middle;
    color:#999;
    font-size:0.75rem ;
  }
  .queser-msg>div:last-child{
    margin-top: 0.5rem;
  }
  .user_name{
    font-size: 0.875rem;
    color:#333;
    font-weight: 400;
  }
  .queser-grounp-content{
    font-size: 1.125rem;
    font-weight: 400;
    color:#333;
    line-height: 1.6rem;
    margin-top: 0.4rem;
  }
  .queser-grounp-footer{
    font-size: 0.875rem;
    color:#999;
    margin-top: 0.6rem;
  }
  .queser-grounp-footer>span{
    margin-right: 1rem;
  }
  .queser-grounp-img{
    margin-top: 0.6rem;
  }
  .queser-grounp-img>img{
    width:6.25rem;
    height:6.25rem;
    margin-right: 0.625rem;
  }
  .answer-group{
    margin-top: 1.31rem;
  }
  .cwacth-notice{
    text-align: center;
    margin:2.44rem 0 1.18rem 0;
    font-size: 0.875rem;
  }
  .cwacth-notice>span{
    vertical-align: middle;
    color:#999;
  }
  .cwacth-notice>.gray-line{
    width:5.5rem;
  }
  .cwatch-weiguan{
    width:7.5rem;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    color:#fff;
    background:rgba(254,109,39,1);
    border-radius:2px;
    font-size: 1rem;
    margin: 0 auto;
  }
  .cwatch-list-people{
    text-align: center;
    margin-top: 2.5rem;
  }
  .cw-people-num{
    font-size: 0.875rem;
    margin-top: 1rem;
  }
  .cwatch-list-people-head>img{
    width:1.875rem;
    height:1.875rem;
    margin-right: 0.2rem;
  }
  .answer-group-content{
    font-size: 1rem;
    color:#333;
    line-height:1.625rem ;
    margin: 1rem 0;
  }
  .answer-group-class>div{
    padding:0 0.375rem;
    background:#F6F6F6 ;
    height: 1.56rem;
    line-height: 1.56rem;
    text-align: center;
    color:#999;
    font-size: 0.875rem;
    margin-right: 0.5rem;
  }
  .answer-group-footer{
    color:#999;
    font-size: 0.875rem;
    margin: 1rem 0;
  }
  .answer-group{
    border-bottom: 1px solid #eee;
  }
</style>
