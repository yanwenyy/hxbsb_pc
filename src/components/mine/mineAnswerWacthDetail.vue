<template>
  <div class="container">
    <div class="home-main box-sizing">
      <div class="h-main-left inline-block">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>问题详情</div>
        </div>
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
        <div class="jc_main box-sizing">
          <textarea name="" v-model="answerContent" class="box-sizing" id="content" cols="30" rows="10"></textarea>
          <div class="jc_main_title">所属专题：</div>
          <select name="" id="topicId" v-model="topicId" >
            <option disabled value="">请选择</option>
            <option value="" v-for="item in zt" v-bind:value="item.name">{{item.name}}</option>
          </select>
          <div class="jc_main_title">所属税种：</div>
          <div class="sz-model">
            <div class="inline-block" :class="sz_selece.indexOf(item.name)!=-1? 'sz-model-act':''" @click="sz_click(item)"  v-for="item in sz">{{item.name}}</div>
          </div>
        </div>
        <div class="sub-btn cursor" @click="sub()">
          提交
        </div>
      </div>
      <div class="h-main-right inline-block box-sizing answer-rule">
        <div>抢答规则</div>
        <ul>
          <li>
            1. 抢答名额宝贵，请认真作答，若未回答或者遭到提问者投诉，您将可能被停用账号。
          </li>
          <li>
            2.采纳后赏金七天后到账。
          </li>
          <li>
            3.回答有误被纠错，后台审核后赏金会扣除奖励给救错人，同时评分也扣除。
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mine-answer-wacth-detail",
    data(){
      return{
        //问题者信息
        questionUser:'',
        answerContent:'',//回答信息
        zt:[],
        sz:[],
        //选择的税种
        sz_selece:[],
        //专题id
        topicId:'',
      }
    },
    mounted(){
      var that=this;
      this.ajax(this.http_url.url+'/answer/grab/details/question',{"uuid":this.$route.query.id},function(data){
        // console.log(data);
        that.questionUser=data.data;
      });
      //行业,税种,专题
      this.ajax_nodata(this.http_url.url+'/category/tree',this.get_tree);
    },
    methods:{
      //行业,税种,专题
      get_tree:function(data){
        // console.log(data);
        var categorys=data.categorys;
        this.zt=this.get_category(categorys,"专题");
        this.sz=this.get_category(categorys,"税种");
        for(var i=0;i<this.sz.length;i++){
          this.sz[i].show=1;
        }
      },
      sz_click:function(item){
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
        if(this.sz_selece.indexOf(item.name)!=-1){
          this.sz_selece.remove(item.name);
        }else{
          this.sz_selece.push(item.name);
        }
      },
      //提交答案
      sub:function(){
        var that=this;
        if($("#content").val()==""){
          // alert("请输入内容");
          that.$myToast.error("请输入内容");
        }else if(this.sz_selece==""){
          // alert("税种不能为空")
          that.$myToast.error("税种不能为空");
        }else if(this.topicId==""){
          // alert("专题不能为空")
          that.$myToast.error("专题不能为空");
        }else{
          this.ajax(this.http_url.url+"/answer/openQuestion",{
            "questionUuid":this.$route.query.id,
            "answerContent":this.answerContent,
            "taxId":this.sz_selece.join(","),
            "topicId":this.topicId
          },function(data){
            console.log(data);
            if(data.code==1){
              // that.$myToast.success(data.des);
              that.$router.push({name:'mineAnswer'})
            }else{
              that.$myToast.error(data.des);
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .sub-btn{
    width: 15rem;
    text-align: center;
    height:3rem;
    line-height: 3rem;
    color:#fff;
    background: #2D86FD;
    border-radius: 4px;
    margin: 2rem auto;
    font-size: 1.125rem;
  }
  .answer-rule>div{
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
  .answer-rule>ul li{
    font-size: 0.875rem;
    margin-bottom: 1rem;
    line-height: 1.2rem ;
  }
  .home-main{
    margin-bottom: 2rem;
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
  .notice>li{
    margin-bottom: 0.5rem;
  }
  .notice>li>span{
    width:10%;
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
    padding:1rem;
    font-size: 1rem;
  }
  .jc_main{
    height:auto!important;
    margin-top: 2rem;
  }
  .jc_title>div{
    position: absolute;
    right:1rem;
    top:1.125rem;
  }
  .error-eidt-btn>img{
    margin-right: 0.375rem;
  }
  .cz_group>div{
    margin-left: 1.81rem;
  }
  .zxs-img-show>img{
    margin-top: -0.1rem;
  }
  .home-head-title{
    font-size: 1rem;
  }
  .comment-list>.wdk-list>div{
    padding-bottom: 1rem;
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
  .evaluate-score >>>img{
    width:1.19rem;
    height:1.31rem;
    vertical-align: middle;
    margin-right: 0.44rem;
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
  .cwacth-notice>span{
    vertical-align: middle;
    color:#999;
  }
  .cwatch-list-people-head>img{
    width:1.875rem;
    height:1.875rem;
    margin-right: 0.2rem;
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
  .sz-model-act{
    border-color:#2D86FD!important;
    color:#2D86FD!important;
  }
</style>
