<template>
  <div>
    <div class="container">
      <div class="home-main box-sizing">
        <div class="h-main-left inline-block">
          <div class="queser-grounp">
            <img :src="questionUser.isAnon==1? head_src+questionUser.headImage:'/static/img/user-img.png'"   onerror="javascript:this.src='./static/img/user-img.png';" alt="" class="queser-head">
            <div class="inline-block queser-msg">
              <div class="inline-block user_name">{{get_name(questionUser)}}</div>
              <div class="inline-block user-dj"><img :src="get_score(questionUser.integralScore,questionUser.aision,questionUser.vip)" alt=""></div>
              <div>{{format(questionUser.date)}}</div>
            </div>
            <div class="queser-grounp-content">
              {{questionUser.content}}
            </div>
            <div class="queser-grounp-img">
              <img :src="question_src+item" alt="" v-for="(item,index) in questionUser.images" @click="lookImgFn(questionUser.images,index)">
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
      <div class="answer-group">
        <div>
          <img :src="head_src+answer_msg.headImage" onerror="javascript:this.src='./static/img/user-img.png'" alt="" class="queser-head">
          <div class="inline-block queser-msg" v-if="answer_msg.role==2">
            <div class="inline-block user_name">
              {{answer_msg.role==2? answer_msg.userName:answer_msg.realName}}
              <div class="inline-block zxs-img-show" v-if="answer_msg.role!=1">
                <img src="../../../static/img/zxs-icon.png" alt="">
                {{answer_msg.levelName}}
              </div>
            </div>
            <div  v-if="answer_msg.role!=1">{{answer_msg.counselorDuty}}</div>
          </div>
          <div class="inline-block queser-msg"  v-if="answer_msg.role==1">
            <div class="inline-block user_name">{{answer_msg.realName}}</div>
            <div class="inline-block user-dj"><img :src="get_score(answer_msg.integralSum,answer_msg.aision,answer_msg.vip)" alt=""></div>
          </div>
        </div>
      </div>
          <!--<div class="cwacth-notice">-->
            <!--<span class="gray-line inline-block"></span>-->
            <!--<span class="inline-block">只需1元即可查看答案</span>-->
            <!--<span class="gray-line inline-block"></span>-->
          <!--</div>-->
          <div style="text-align: center">
            <div class="cwatch-weiguan inline-block" @click="weiguan()">一元围观</div>
            <div class="cwatch-weiguan inline-block" @click="weiguan_free()">免费围观 <span>（观看视频）</span></div>
          </div>
          <div v-if="status_365" class="open-365 cursor" @click="open_365">开通365会员卡 (免费围观、免费问）></div>
          <div class="cwatch-list-people">
            <div class="cwatch-list-people-head">
              <img v-for="item in 10" :src="item<look_length? head_src+look_list[item-1].headImage:'./static/img/user-img-moren.png'" onerror="javascript:this.src='./static/img/user-img.png'" alt="">
            </div>
            <div class="cw-people-num">
              <span class="cursor" @click="open_shadow()">{{look_list_num}}人已围观></span>
              <!--<span class="blue" @click="open_shadow()">查看详情</span>-->
            </div>
          </div>
        </div>
        <div class="h-main-right inline-block box-sizing">
          <ztRight @zt_method="zt_method"></ztRight>
        </div>
      </div>
    </div>
    <div class="shadow-box" v-if="shadow_status">
      <div class="wg-people-show">
        <div class="wg-peo-header box-sizing">
          围观列表
          <div class="inline-block close-shadow" @click="close_shadow()"><img src="../../../static/img/close-shadow.png" alt=""></div>
        </div>
        <div class="shodow-body box-sizing">
          <ul>
            <li v-for="item in look_list_detail">
              <img :src="head_src+item.headImage"  onerror="javascript:this.src='./static/img/user-img.png'" alt="">
              <div class="inline-block wgry-list">
                <div class="inline-block wgry-list-usermsg">
                  <div class="wgry-list-name">
                    <span>{{get_name(item)}}</span>
                    <span class="user-zxs" v-if="item.role==2">
                        <img src="../../../static/img/zxs-icon.png" alt="">
                        <span>{{item.levelName}}</span>
                        <span class="interval-line"></span>
                        <span>{{item.counselorDuty}}</span>
                    </span>
                  </div>
                  <div>{{item.onLookTime}}</div>
                </div>
                <div class="inline-block orange wgry-list-money">
                  +{{parseFloat(item.onLookMoney).toFixed(2)}}元
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <look-img v-if="lookImgVisible" ref="lookImg" @refreshMask="maskShow"></look-img>
  </div>
</template>

<script>
    import ztRight from '@/components/ztRight'
    import lookImg from '@/components/lookImg'
    export default {
        name: "answer-wacth",
      components:{
        ztRight,
        lookImg
      },
      data(){
        return{
          lookImgVisible:false,//图片放大组件控制
          //问题者信息
            questionUser:'',
          //弹框显示
            shadow_status:false,
            //围观人员
            look_list:[],
            look_length:0,
            //围观人数
            look_list_num:'',
            //围观详情列表
            look_list_detail:[],
            //回答者信息
            answer_msg:'',
            zt_method_data:'',
            status_365:false,

        }
      },
      mounted (){
          var that=this;
        this.ajax_nodata(this.http_url.url+"/user/message",function(data){
          if(data.tsfTime!=null&&data.tsfTime!=''){
            var tt=new Date().getTime();
            if(tt>data.tsfTime){
              that.status_365=true;
            }else{
              that.status_365=false;
            }
          }else{
            that.status_365=true;
          }
          if(data.aision==0&&data.vip==0){
            that.status_365=false;
          }
        });
          //问题者信息
        this.ajax_nodata(this.http_url.url+"/onlook/wx/onlookAuthorized?uuid="+this.$route.query.uuid,this.que_msg);
          // alert(this.$route.query.questionUuid);
        //围观人员查询
        this.ajax(this.http_url.url+"/onlook/onlookCountDetailList",{
          "questionUuid":this.$route.query.uuid,
          "sinceId":"1",
          "maxId":"1000000",
        },this.look_num);
        //提问者和专家资料显示
        this.ajax(this.http_url.url+"/user/someUserMsg",{"questionUuid":this.$route.query.uuid},this.msg_show);
        },
      methods:{
        open_365:function(){
          var that=this;
          this.$router.push({name:'mine365'})
        },
        //图片放大组件控制
        lookImgFn:function (list,index) {
          this.lookImgVisible = true
          this.$nextTick(() => {
            this.$refs.lookImg.init(list,index)
          })
        },
        //图片放大组件控制
        maskShow:function () {
          this.lookImgVisible = false
        },
        //接收专题的事件
        zt_method(data) {
          this.zt_method_data=data;
          //问题者信息
          this.ajax_nodata(this.http_url.url+"/onlook/wx/onlookAuthorized?uuid="+this.zt_method_data.uuid,this.que_msg);
          // alert(this.$route.query.questionUuid);
          //围观人员查询
          this.ajax(this.http_url.url+"/onlook/onlookCountDetailList",{
            "questionUuid":this.zt_method_data.uuid,
            "sinceId":"1",
            "maxId":"100000",
          },this.look_num);
          //提问者和专家资料显示
          this.ajax(this.http_url.url+"/user/someUserMsg",{"questionUuid":this.zt_method_data.uuid},this.msg_show);
        },
          //问题者信息
        que_msg:function(data){
          // console.log(data);
          this.questionUser=data.questionUser;
        },
          //围观人员
        look_num:function(data){
            // console.log(data);
            this.look_list=data.OnLookCountDetail.slice(0,10);
            this.look_length=this.look_list.length+1;
            this.look_list_detail=data.OnLookCountDetail;
            this.look_list_num=data.OnLookCount;
          },
          //打开弹窗
        open_shadow:function(){
          this.shadow_status=true;
        },
          //关闭弹窗
        close_shadow:function(){
          this.shadow_status=false;
        },
        //一元围观
        weiguan:function(){
          var that=this;
          _czc.push(["_trackEvent","详情一元围观","点击"]);
          var data=encodeURIComponent(JSON.stringify(this.$route.query))||encodeURIComponent(JSON.stringify(this.zt_method_data));
          this.$router.push({
            name:"payMethod",query:{ url:"answerWacthDetail",price: 1 ,source:"围观",data:data}
          })
        },
        //回答者资料显示
        msg_show:function(data){
            // console.log(data);
            this.answer_msg=data.userMsg;
        },
        //免费围观
        weiguan_free:function(data){
          var that=this;
          _czc.push(["_trackEvent","免费围观","点击"]);
          this.ajax_nodata(this.http_url.url+"videoAdvertising",function(data){
            console.log(data);
            if(data.code==1){
              that.$router.push({name:"freeWatch",query:{"vid":data.id,"uuid":that.$route.query.uuid,"mid":data.videoId,"link":data.pageLink}})
              // that.$router.push({name:'freeWatchAd',query:{"uuid":1,"link":'http://test.jieshuibao.com/video_ad/html/ad1.html?'}})
            }
          })
        }
      }
    }
</script>

<style scoped>
  .open-365{
    text-align: center;
    font-size: 0.875rem;
    color:#D19428;
    margin-top: 1.69rem;
  }
  .zxs-img-show>img{
    margin-top: -0.1rem;
  }
  .zxs-img-show{
    font-size: 0.75rem;
    color:#666;
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
    margin-top: 0.8rem;
  }
  .queser-grounp-footer{
    font-size: 0.875rem;
    color:#999;
    margin-top: 1rem;
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
    border-radius:2px;
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
  .cwatch-weiguan>span{
    font-size: 0.68rem;
  }
  .cwatch-weiguan{
    vertical-align: top;
    width:9.37rem;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    color:#fff;
    background:rgba(254,109,39,1);
    border-radius:2px;
    font-size: 0.94rem;
    margin-top:2.31rem ;
    margin-right: 1.875rem;
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
    border-radius: 50%;
  }
</style>
