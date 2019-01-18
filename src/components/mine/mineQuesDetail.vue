<template>
  <div>
    <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的提问"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的提问</div>
        </div>
        <div class="question-progress" v-if="questionUser.quType!=1" @click="go_progress()" v-show="progress">问题进度</div>
        <div class="box-sizing mine-ques-detail">
            <div class="queser-grounp">
              <img :src="questionUser.isAnon==1? head_src+questionUser.headImage:'./static/img/user-img.png'"   onerror="javascript:this.src='./static/img/user-img.png';" alt="" class="queser-head">
              <div class="inline-block queser-msg">
                <div class="inline-block user_name">{{questionUser.isAnon==1? questionUser.realName:'匿名用户'}}</div>
                <div class="inline-block user-dj"><img :src="get_score(questionUser.integralScore,questionUser.aision,questionUser.vip)" alt=""></div>
                <div>{{format(questionUser.date)}}</div>
              </div>
              <div class="queser-grounp-content">
                {{questionUser.content}}
              </div>
              <div class="queser-grounp-img">
                <img :src="question_src+item" alt="" v-for="item in questionUser.images" @click="lookImgFn(questionUser.images)">
              </div>
              <div class="queser-grounp-footer">
                <span>{{questionUser.area}} {{questionUser.quTrade}}</span>
                <!--<span>点赞{{questionUser.approveNum}}</span>-->
                <span>围观{{questionUser.lookNum}}</span>
              </div>
            </div>
            <div class="release_again cursor" @click="release_question()" v-if="questionUser.quType==1">免费重新发布</div>
            <div class="home-model-header home-model-header2"  v-if="questionUser.quType!=1">
              <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>回答</div>
              <div class="error-eidt-btn inline-block" v-if="jc_btn_status"  @click="jc_status=!jc_status"><img src="../../../static/img/error-eidt-btn.png" alt="">我要纠错</div>
            </div>
            <div class="answer-group"  v-if="questionUser.quType!=1" v-for="item in answewrUsers">
              <div  v-if="item.status!=6">
                <div>
                  <img :src="head_src+item.headImage"   onerror="javascript:this.src='./static/img/user-img.png';" alt="" class="queser-head">
                  <div class="inline-block queser-msg">
                    <div class="inline-block user_name">
                      {{item.userName}}
                      <div class="inline-block zxs-img-show">
                        <img src="../../../static/img/zxs-icon.png" alt="">
                        {{item.levelName}}
                      </div>
                    </div>
                    <div>{{item.counselorDuty}}</div>
                  </div>
                  <div class="inline-block best-answer" v-if="item.status==2||item.checkStatus==2||item.status==7">
                    <img src="../../../static/img/best-answer.png" alt="">
                  </div>
                  <div class="inline-block best-answer" v-if="item.status==6">
                    <img src="../../../static/img/error-answer.png" alt="">
                  </div>
                  <div class="inline-block best-answer accept cursor" @click="cn_btn(item)" v-if="item.status==1&&$route.query.status==2&&$route.query.quType!=2">
                    采纳
                  </div>
                </div>
                <div class="answer-group-content">
                  {{item.content}}
                </div>
                <div class="answer-group-class">
                  <div class="inline-block box-sizing" v-for="w in item.tax.split(',')">#{{w}}#</div>
                  <div class="inline-block box-sizing"  v-for="s in item.topic.split(',')">#{{s}}#</div>
                </div>
                <div class="answer-group-footer">
                  <div class="inline-block">{{format(item.date)}}</div>
                  <!--<div class="inline-block cz_group">-->
                    <!--<div class="inline-block">-->
                      <!--<img :src="item.praiseNum>0? './static/img/zan_click.png':zan_src" @click="zan(item.uuid,$event)" alt="">-->
                      <!--<span>{{item.approveNum}}</span>-->
                    <!--</div>-->
                    <!--<div class="inline-block">-->
                      <!--<img  :src="item.treadNum>0? './static/img/cai_click.png':cai_src" @click="cai(item.uuid,$event)" alt="">-->
                      <!--<span>{{item.opposeNum}}</span>-->
                    <!--</div>-->
                  <!--</div>-->
                  <div class="not-agree inline-block cursor" @click="jb_btn(item.uuid)" v-if="item.status==1&&$route.query.status==2&&$route.query.quType!=2">不满意</div>
                </div>
                <div class="evaluate-model box-sizing " v-if="item.status==2||item.status==7">
                  <div class="evaluate-score">
                    评价得分:
                    <div class="inline-block" v-for="s in 5">
                      <img :src="s<=item.score? './static/img/score-sel.png':'../../../static/img/score-unsel.png'" alt="">
                      <!--<img src="../../../static/img/score-unsel.png" alt="">-->
                    </div>
                  </div>
                  <div class="evaluate-content">
                    {{item.appraisal||"暂无评价内容"}}
                  </div>
                  <div v-if="item.score==0" class="go_pj" @click="bu_pj(item)" >去评价</div>
                </div>
              </div>
            </div>
            <div class="answer-group"  v-if="questionUser.quType!=1"  v-for="item in answewrUsers">
              <div v-if="item.status==6">
                <div class="home-model-header" style="margin-bottom: 1.31rem">
                  <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>答案纠错</div>
                </div>
                <div>
                  <img :src="head_src+item.headImage"   onerror="javascript:this.src='./static/img/user-img.png';" alt="" class="queser-head">
                  <div class="inline-block queser-msg">
                    <div class="inline-block user_name">
                      {{item.userName}}
                      <div class="inline-block zxs-img-show">
                        <img src="../../../static/img/zxs-icon.png" alt="">
                        {{item.levelName}}
                      </div>
                    </div>
                    <div>{{item.counselorDuty}}</div>
                  </div>
                  <div class="inline-block best-answer" v-if="item.status==2||item.checkStatus==2||item.status==7">
                    <img src="../../../static/img/best-answer.png" alt="">
                  </div>
                  <div class="inline-block best-answer" v-if="item.status==6">
                    <img src="../../../static/img/error-answer.png" alt="">
                  </div>
                  <div class="inline-block best-answer accept cursor" @click="cn_btn(item)" v-if="item.status==1&&$route.query.status==2&&$route.query.quType!=2">
                    采纳
                  </div>
                </div>
                <div class="answer-group-content">
                  {{item.content}}
                </div>
                <div class="answer-group-class">
                  <div class="inline-block box-sizing" v-for="w in item.tax.split(',')">#{{w}}#</div>
                  <div class="inline-block box-sizing"  v-for="s in item.topic.split(',')">#{{s}}#</div>
                </div>
                <div class="answer-group-footer">
                  <div class="inline-block">{{format(item.date)}}</div>
                  <!--<div class="inline-block cz_group">-->
                    <!--<div class="inline-block">-->
                      <!--<img :src="item.praiseNum>0? './static/img/zan_click.png':zan_src" @click="zan(item.uuid,$event)" alt="">-->
                      <!--<span>{{item.approveNum}}</span>-->
                    <!--</div>-->
                    <!--<div class="inline-block">-->
                      <!--<img  :src="item.treadNum>0? './static/img/cai_click.png':cai_src" @click="cai(item.uuid,$event)" alt="">-->
                      <!--<span>{{item.opposeNum}}</span>-->
                    <!--</div>-->
                  <!--</div>-->
                  <div class="not-agree inline-block cursor" @click="jb_btn(item.uuid)" v-if="item.status==1&&$route.query.status==2&&route.query.quType!=2">不满意</div>
                </div>
              </div>
          </div>
            <div v-if="changerAnswer!=''&&changerAnswer!=null">
              <div class="home-model-header">
                <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的纠错</div>
              </div>
              <div class="answer-group" v-for="item in changerAnswer">
                <div>
                  <img :src="head_src+all_usermsg.headImage"   onerror="javascript:this.src='./static/img/user-img.png';" alt="" class="queser-head">
                  <div class="inline-block queser-msg" v-if="all_usermsg.role==2">
                    <div class="inline-block user_name">
                      {{all_usermsg.userName}}
                      <div class="inline-block zxs-img-show">
                        <img src="../../../static/img/zxs-icon.png" alt="">
                        {{all_usermsg.levelName}}
                      </div>
                    </div>
                    <div>{{all_usermsg.counselorDuty}}</div>
                  </div>
                  <div class="inline-block queser-msg" v-if="all_usermsg.role==1">
                    <div class="inline-block user_name">{{all_usermsg.realName}}</div>
                    <div class="inline-block user-dj"><img :src="get_score(all_usermsg.integralScore,all_usermsg.aision,all_usermsg.vip)" alt=""></div>
                  </div>
                </div>
                <div class="answer-group-content">
                  {{item.content}}
                </div>
                <div class="answer-group-class">
                  <div class="inline-block box-sizing" v-for="w in item.tax.split(',')">#{{w}}#</div>
                  <div class="inline-block box-sizing"  v-for="s in item.topic.split(',')">#{{s}}#</div>
                </div>
                <div class="answer-group-footer">
                  <div class="inline-block">{{format(item.date)}}</div>
                  <!--<div class="inline-block cz_group">-->
                    <!--<div class="inline-block">-->
                      <!--<img :src="item.praiseNum>0? './static/img/zan_click.png':zan_src" @click="zan(item.uuid,$event)" alt="">-->
                      <!--<span>{{item.approveNum}}</span>-->
                    <!--</div>-->
                    <!--<div class="inline-block">-->
                      <!--<img  :src="item.treadNum>0? './static/img/cai_click.png':cai_src" @click="cai(item.uuid,$event)" alt="">-->
                      <!--<span>{{item.opposeNum}}</span>-->
                    <!--</div>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
    <div class="shadow-box" v-if="jc_status">
      <div class="jc_body">
        <div class="jc_title">
          我要纠错
          <div class="inline-block"  @click="jc_status=!jc_status"><img src="../../../static/img/close-shadow.png" alt=""></div>
        </div>
        <div class="jc_main box-sizing">
          <textarea name="" class="box-sizing" id="content" cols="30" rows="10"></textarea>
          <div class="jc_main_title">所属专题：</div>
          <select name="" id="topicId" v-model="topicId" >
            <option disabled value="">请选择</option>
            <option value="" v-for="item in hy" v-bind:value="item.name">{{item.name}}</option>
          </select>
          <div class="jc_main_title">所属税种：</div>
          <div class="sz-model">
            <div class="inline-block"  v-for="item in sz">{{item.name}}</div>
          </div>
          <ul class="notice">
            <li><span class="inline-block">提示：</span>1、纠错答案采纳后将公开显示供其他用户参考。</li>
            <li><span class="inline-block"></span>2、如果填写的答案与他人的重复则按提交先后判定。</li>
          </ul>
        </div>
        <div class="jc_sub cursor" @click="sub_jc()">提交</div>
      </div>
    </div>
    <div class="shadow-box" v-if="pj_status">
      <div class="cn_body">
        <div class="jc_title">
          评价
          <div class="inline-block"  @click="pj_status=!pj_status"><img src="../../../static/img/close-shadow.png" alt=""></div>
        </div>
        <div class="cn_main box-sizing">
          <div>
            <img :src="head_src+pj_msg.headImage"   onerror="javascript:this.src='./static/img/user-img.png';" alt="" class="queser-head">
            <div class="inline-block queser-msg">
              <div class="inline-block user_name">
                {{pj_msg.userName}}
                <div class="inline-block zxs-img-show">
                  <img src="../../../static/img/zxs-icon.png" alt="">
                  {{pj_msg.levelName}}
                </div>
              </div>
              <div>{{pj_msg.counselorDuty}}</div>
            </div>
          </div>
          <div class="cn-pj">
            评价得分:
            <div class="inline-block" v-for="s in 5">
              <img :src="s<=cn_score? './static/img/score-sel.png':'./static/img/score-unsel.png'" @click="cn_score_click(s)" alt="">
              <!--<img src="../../../static/img/score-unsel.png" alt="">-->
            </div>
          </div>
          <textarea v-model="pj_content" class="cn_textare box-sizing" placeholder="写下您对咨询师的评价吧（30字内）" id="" cols="30" rows="10"></textarea>
          <div class="cn-pj-sub cursor" @click="pj_sub(pj_msg.uuid)">提交</div>
        </div>
      </div>
    </div>
    <look-img v-if="lookImgVisible" ref="lookImg" @refreshMask="maskShow"></look-img>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
  import lookImg from '@/components/lookImg'
    export default {
      name: "mine-ques-detail",
      components:{
        mineLeft,
        lookImg
      },
      data(){
        return{
          lookImgVisible:false,//图片放大组件控制
          // //是否重新发布
          // release_again:false,
          // release_no:true,
          //评价内容
          pj_content:'',
          //评价框信息
          pj_msg:'',
          //采纳分数
          cn_score:0,
          //用户所有信息
          all_usermsg:'',
          //评价框状态
          pj_status:false,
          //纠错框状态
          jc_status:false,
          jc_btn_status:false,
          //提问者信息
          questionUser:'',
          //回答者信息
          answewrUsers:'',
          //我的纠错
          changerAnswer:"",
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
          more_msg:"点击加载更多",
          //赞的src
          zan_src:"./static/img/zan.png",
          //踩的src
          cai_src:"./static/img/cai.png",
          hy:[],
          sz:[],
          //选择的税种
          sz_selece:[],
          //专题id
          topicId:'',
          //是否显示问题进度
          progress:true
        }
      },
      mounted(){
        var that=this;
        // alert(this.$route.query.status);
        //已采纳已纠错不显示问题进度按钮
        if(this.$route.query.status=="3"||this.$route.query.status=="4"||this.$route.query.status=="9"){
          this.progress=false
        };
        //用户所有信息
        this.ajax_nodata(this.http_url.url+"/user/message",function(data){
          console.log(data);
          that.all_usermsg=data;
        });
        // var data=JSON.parse(sessionStorage.getItem("userMessage"));
        // this.all_usermsg=data;
        //回答者和提问者信息
        this.ajax(this.http_url.url+"/question/acceptAnswer",{
          "status":this.$route.query.status,
          "questionUuid":this.$route.query.uuid,
          "sinceId":1,
          "maxId":10
        },this.que_msg);
        //行业,税种,专题
        this.ajax_nodata(this.http_url.url+'/category/tree',this.get_tree);
        //删除数组内某项的构造函数
        Array.prototype.indexOf = function(val) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
          }
          return -1;
        };
        Array.prototype.remove = function(val) {
          var index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        $("body").on("click",".sz-model>div",function(){
          if($(this).hasClass("sz-model-act")){
            $(this).removeClass("sz-model-act");
            that.sz_selece.remove($(this).html());
          }else{
            $(this).addClass("sz-model-act");
            that.sz_selece.push($(this).html());
          }
        })
      },
      methods:{
        //图片放大组件控制
       lookImgFn:function (list) {
         this.lookImgVisible = true
         this.$nextTick(() => {
           this.$refs.lookImg.init(list)
         })
       },
        //图片放大组件控制
        maskShow:function () {
          this.lookImgVisible = false
        },
        //重新发布问题
        release_question:function(){
        var that=this;
          this.ajax(this.http_url.url+"/question/againReleaseQuestion",{
            "questionUuid":this.$route.query.uuid
          },function(data){
              if(data.code==1){
                alert("发布成功");
                that.$router.push({name:"mineQuestion"})
              }else{
                alert(data.des);
              }
          })
        },
        //点击问题进度
        go_progress:function (uuid) {
          this.$router.push({name:'questionProgress',query:{uuid:this.$route.query.uuid}})
        },
        //评价按钮点击
        pj_sub:function(val){
          if(this.pj_content==""){
            return false;
          }else{
            this.ajax(this.http_url.url+"/answer/score",{
              "score":this.cn_score,
              "uuid":val,
              "appraisal":this.pj_content
            },function(data){
              if(data.code==1){
                alert("评价成功");
                window.location.reload();
              }else{
                alert(data.des);
              }
            });
          }
        },
        //采纳评价分数点击
        cn_score_click:function(val){
          this.cn_score=val;
        },
        //举报按钮点击
        jb_btn:function(val){
          this.ajax(this.http_url.url+"/answer/updateStatus",{
            "status":"3","answerUuid":val
          },function(data){
            if(data.code==1){
              alert("操作成功");
              window.location.reload();
            }else{
              alert(data.des);
            }
          });
        },
        //补交评价
        bu_pj(val){
          var that=this;
          this.pj_msg=val;
          that.pj_status=true;
        },
        //采纳按钮点击
        cn_btn:function(val){
          var that=this;
          this.pj_msg=val;
          this.ajax(this.http_url.url+"/answer/updateStatus",{
            "status":"2","answerUuid":val.uuid
          },function(data){
              if(data.code==1){
                alert("操作成功");
                that.pj_status=true;
              }else{
                alert(data.des);
              }
          });
        },
        //回答者和提问者信息
        que_msg:function(data){
          // console.log(data);
          var that=this;
          this.questionUser=data.question;
          this.answewrUsers=data.answerUsers;
          this.changerAnswer=data.changerAnswer;
          for(var i=0;i<data.answerUsers.length;i++){
            if(data.answerUsers[i].type==0){
              if(data.answerUsers[i].status==2||data.answerUsers[i].status==6||data.answerUsers[i].status==7){
                that.comment_id=data.answerUsers[i].uuid;
              }
              if(data.answerUsers[i].status==2){
                that.jc_btn_status=true;
              }
            }
          };
        },
        //赞
        zan:function(val,e){
          var that=this,span=e.currentTarget.nextElementSibling,event=e.currentTarget;
          this.ajax(this.http_url.url+"/answer/proveAndpose",{
            "answerUuid": val, "status": 1
          },function(data){

            if(data.code==1){
              event="/static/img/zan_click.png";
              span.innerHTML=Number(span.innerHTML)+1;
            }else{
              alert(data.des);
            }
          })
        },
        //踩
        cai:function(val,e){
          var that=this,span=e.currentTarget.nextElementSibling,event=e.currentTarget;
          this.ajax(this.http_url.url+"/answer/proveAndpose",{
            "answerUuid": val, "status":2
          },function(data){
            if(data.code==1){
              event.src="/static/img/cai_click.png";
              span.innerHTML=Number(span.innerHTML)+1;
            }else{
              alert(data.des);
            }
          })
        },
        //行业,税种,专题
        get_tree:function(data){
          // console.log(data);
          var categorys=data.categorys;
          this.hy=this.get_category(categorys,"行业");
          this.sz=this.get_category(categorys,"税种");
        },
        //提交纠错
        sub_jc:function(val){
          var that=this;
          this.ajax(this.http_url.url+"/changerError/answer/add",{
            "content":$("#content").val(),
            "taxId":this.sz_selece.join(","),
            "topicId":this.topicId,
            "uuid":that.comment_id
          },function(data){
            console.log(data);
            if(data.code==1){
              alert("提交成功");
              window.location.reload();
            }else{
              alert(data.des);
            }
          })
        }
      }
    }
</script>

<style scoped>
  .go_pj{
    position: absolute;
    top:1rem;
    right:1rem;
    color:#2D86FD;
    cursor: pointer;
  }
  .release_again{
    background: #FE6D27;
    color:#fff;
    font-size: 1rem;
    width:8.75rem;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    border-radius: 2px;
    margin: 2.25rem auto;
  }
  .question-progress{
    width:7.5rem;
    height:2rem;
    line-height: 2rem;
    text-align: center;
    background: #2D86FD;
    color:#fff;
    font-size: 0.875rem;
    border-radius: 2px;
    margin-left: 1rem;
  }
  .cn-pj-sub{
    margin: 0 auto;
    background: #2D86FD;
    color:#fff;
    font-size: 0.94rem;
    width:7.5rem;
    height:2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 4px;
  }
  .cn_textare{
    width:100%;
    height:7.81rem;
    border:1px solid #eee;
    border-radius: 2px;
    margin: 1.19rem 0 1.75rem 0;
    font-size: 0.875rem;
    color:#999;
    padding:1.125rem 0.69rem;
  }
  .cn-pj img{
    width:1.19rem;
    height:1.31rem;
    vertical-align: middle;
    margin-right: 0.44rem;
  }
  .cn-pj{
    font-size: 0.875rem;
    color:#666;
    margin-top: 1.75rem;
  }
  .cn_main{
    padding:1.19rem 3rem;
  }
  .cn_body{
    background: #fff;
    width:34.81rem;
    height:24.62rem;
    border-radius: 0.625rem;
    margin: 10% auto;
  }
  .not-agree{
    float: right;
  }
  .accept{
    width:4.25rem;
    height:1.75rem;
    line-height: 1.75rem;
    text-align: center;
    color:#fff;
    background: #FE6D27;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  .home-model-header2{
    border-bottom: 1px solid #eee;
  }
  .mine-ques-detail{
    padding:0 6.25rem 0 1.75rem;
  }
  #content{
    padding:1.125rem;
    font-size: 0.875rem;
    color:#999;
  }
  .sz-model-act{
    border-color:#2D86FD!important;
    color:#2D86FD!important;
  }
  .notice>li{
    margin-bottom: 0.5rem;
  }
  .notice>li>span{
    width:10%;
  }
  .notice{
    color:#999;
    font-size: 0.75rem;
  }
  .jc_sub{
    margin: 0 auto;
    width: 7.5rem;
    height:2.25rem;
    color:#fff;
    font-size: 0.94rem;
    line-height: 2.25rem;
    text-align: center;
    background: #2D86FD;
    border-radius: 4px;
    margin-top: 0.69rem;
  }
  .sz-model>div{
    width:6rem;
    height:1.875rem;
    line-height: 1.875rem;
    text-align: center;
    border-radius: 4px;
    border:1px solid #ddd;
    font-size: 0.815rem;
    color:#333;
    margin-right:0.625rem;
    margin-bottom: 0.75rem;
  }
  .jc_main>select{
    width:9.38rem;
    height:2rem;
  }
  .jc_main_title{
    font-size: 0.875rem;
    color:#333;
    margin: 1.56rem 0 1rem 0;
  }
  .jc_main>textarea{
    width: 100%;
    height: 7.81rem;
  }
  .jc_main{
    padding:1.19rem 2.25rem;
    height:26.94rem;
    overflow: auto;
  }
  .jc_title>div{
    position: absolute;
    right:1rem;
    top:1.125rem;
  }
  .jc_title{
    text-align: center;
    position: relative;
    width:100%;
    height:2.94rem;
    line-height: 2.94rem;
    color:#333;
    font-size: 1rem;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }
  .jc_body{
    width:34.8rem;
    height:34.5rem;
    background: #fff;
    border-radius: 0.625rem;
    margin: 5% auto;
  }
  .error-eidt-btn>img{
    margin-right: 0.375rem;
  }
  .error-eidt-btn{
    float: right;
  }
  .best-answer{
    vertical-align: middle;
    float: right;
  }
  .cz_group>div{
    margin-left: 1.81rem;
  }
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
    position:relative;
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
  /*.answer-group{*/
    /*border-bottom: 1px solid #eee;*/
  /*}*/
</style>
