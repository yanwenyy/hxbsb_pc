<template>
  <div>
    <headerTab msg="首页"></headerTab>
    <div class="container">
      <BreadNav :breadName="title"></BreadNav>
      <div class="home-main box-sizing">
        <div class="h-main-left inline-block">
            <div class="inline-block home-head-title">
              <span class="inline-block span-blue-line"></span>问题内容
              <div class="ask-head-title ask-price">提问金额：<i :class="vip?'no-v':''">￥{{money_show}}</i><span class="orange-font" v-show="vip">会员免费</span></div>
            </div>
            <div class="textarea-box">
              <textarea placeholder="请详细描述您的问题，可附上图片。针对税企争议，方案设计，棘手问题，创新模式等类问题不适用快速咨询请选择联系我们，我们会分配相应的咨询师为您服务。" v-model="content" name="content"></textarea>
            </div>
            <div class="ask-img-box">
              <div class="ask-head-title">添加图片(最多3张)</div>
              <div class="upload-img-box">
                <div class="upload-img inline-block" v-for="(item,index) in imgArr" >
                  <div class="close-btn" @click="delimg(index)" v-if="item.src!=''&&item.src!=null&&item.src!=undefined" >
                    <img src="../../../static/img/ask-close-img.png"  onerror="javascript:this.src='./static/img/ask-close-img.png';" />
                  </div>
                  <img :src="item.src?item.src:mrsrc">
                  <input type="file" class="file-img" @change="addPic"  :class="'file'+index" name="images"/>
              </div>
            </div>
          </div>
          <div class="ask-trade-box">
            <div class="ask-head-title">问题涉及行业：</div>
            <!--<input type="text" placeholder="请选择" readonly v-on:click="dropdown"  v-model="trade" />
            <span class="select-icon"  :class="down_icon ? 'up-icon' : 'down-icon' " ></span>-->
            <ul>
              <li v-for="(item,index) in trade_list"  v-on:click="seleced_trade(item.name,index)" :class="{sld_trade:index==current}">{{item.name}}</li>
            </ul>
          </div>
          <div class="aks-submit">
            <input type="button" class="submit-btn cursor" @click="check_sub" value="提交"/>
            <div class="ask-anonymity-box checkbox-box" :class="check_icon ? 'checked-icon' : 'checkbox-icon' ">
              <label class="inline-block icon"></label>
              <!-- 0是匿名 1是不匿名 -->
              <input type="checkbox" v-model="isAnon" :value="check_icon ? '0' : '1' " @click="check_icon = !check_icon;" name="isAnon"/><span>匿名提问</span>
            </div>
          </div>
          <input type="hidden" name="payType" :value="vip?'free':null" />
        </div>
        <div class="h-main-right inline-block box-sizing">
          <div class="inline-block home-head-title"><img src="../../../static/img/ask-rule-alarm.png" alt="">悬赏规则</div>
          <div class="rules">
            <ol type="1">
              <li>您的问题最多被两位咨询师抢答。</li>
              <li>收到答案后，您需要采纳一个最佳答案，如果两个答案都不采纳，您将不能继续提问；两个答案都不满意可免费发布此问题仅限一次。</li>
              <li>采纳答案后，您的问题和您采纳的答案将会被公开供平台其他用户围观。</li>
              <li>发布的问题只要上过推荐和热点有分成。分成规则为去除提问成本之后，提问者分围观金额收入的10%。</li>
              <li>咨询师24小时无应答，将按支付路径全额退款。</li>
            </ol>
          </div>
        </div>
      </div>
      <Diglog v-show="show"></Diglog>
    </div>
    <vipDateOut :type="vip_type" v-if="vipdateout"></vipDateOut>
  </div>
</template>
<script>
  import BreadNav from '@/components/breadNav'
  import Diglog from '@/components/askQuestion/sucDialog'
  import headerTab from "@/components/headerTab"
  import vipDateOut from '@/components/vipDateOut'
    export default {
        name: "ask-question",
        components: {
          BreadNav,
          Diglog,
          headerTab,
          vipDateOut
        },
      data () {
        return {
          current:undefined,
          vip:false,//判断是否vip
          down_icon:false,//仿select做上下三角样式
          trade:null,//行业名
          trade_list:[],//问题涉及行业列表
          check_icon:false,//是否匿名
          title:"",//给面包屑传值
          mrsrc:'./static/img/ask_up_img.png',//默认上传图片
          imgArr: [''],//预览图片列表
          show:false,//发布成功
          content:null,//问题内容
          isAnon:1,//是否匿名 0 是 1否
          payType:null,//支付类型
          images:[],//提交图片参数bsae64
          vip_type:1,//会员类型
          vipdateout:false,
          money_show:0,//快速问金额
        }
      },
      mounted (){
          var that=this;
        //面包屑
        this.title='首页 > '+this.$route.meta.title;
        //调用接口-问题涉及行业
        this.ajax_nodata(this.http_url.url+'category/tree',this.get_trade);
        //获取登录账号的个人信息
        this.ajax_nodata(this.http_url.url+'user/message',this.get_aision);
        //获取金额
        this.ajax_nodata(this.http_url.url+"/load/getconfig/message",function(data){
          that.money_show=data.questionMoney;
        })
      },
      methods:{
        //判断是否为航信会员航信会员
        get_aision:function(data){
          this.trade=data.trade
          if(data.aision==0){
            if(data.vip==0){
              this.vip=true
              this.payType='free'
            }else if(data.vip==1&&localStorage.getItem("no_vipDateout")!="yes"){
              this.vipdateout=true;
              this.vip_type=1;
            }
          }else if(data.aision==2){
            this.vip=true
            this.payType='free'
          }
         if(data.tsfTime!=""&&data.tsfTime!=null&&data.tsfTime>new Date().getTime()){
            this.vip=true
            this.payType='free'
          }
          // else if(data.vip==1&&data.tsfTime!=""&&data.tsfTime!=null&&data.tsfTime<new Date().getTime()){
          //   if(localStorage.getItem("no_vipDateout")!="yes"){
          //     this.vipdateout=true;
          //     this.vip_type=2;
          //   }
          // }
          for(var i=0;i<$(".ask-trade-box li").length;i++){
            if($(".ask-trade-box li").eq(i).text()===this.trade){
              this.current=i
            }
          }
        },
        //获取问题涉及行业列表
        get_trade:function(data){
          // console.log(data);
          var categorys=data.categorys;
          this.trade_list=this.get_category(categorys,"行业");
        },
        //选择问题涉及行业select
        seleced_trade:function (trade,index) {
          if($(".ask-trade-box li").eq(index).attr("class")=="sld_trade"){
            this.trade='';
            this.current=undefined;
          }else{
            this.trade=trade;
            this.current=index;
          }
        },
        //删除图片
        delimg:function (e) {
          this.images.splice(e,1)
          var vm = this;
          for(var i = 0;i<vm.imgArr.length;i++){
            if(vm.imgArr[i]==''||vm.imgArr[i]==null||typeof(vm.imgArr[i])==undefined){
              vm.imgArr.splice(i,1);
              i=i-1;
            }
          }
          this.imgArr = this.imgArr.filter(function(elem, index,arr){
            return index!=e
          })
          this.imgArr.push("");
        },
        //上传图片
        addPic:function(e){
          var vm = this;
          for(var i = 0;i<vm.imgArr.length;i++){
            if(vm.imgArr[i]==''||vm.imgArr[i]==null||typeof(vm.imgArr[i])==undefined){
              vm.imgArr.splice(i,1);
              i=i-1;
            }
          }
            var files = e.target.files[0];
            var imglet=$(".upload-img").length
            for (var i = 0; i < imglet; i++) {
              var reader = new FileReader();
              reader.readAsDataURL(files);
              reader.onload = function () {
                if(imglet>3){
                  $(".upload-img").eq(imglet-1).remove()
                }
                if (vm.imgArr.length < 2) {
                  vm.imgArr.push({src: this.result,index:i});
                  vm.imgArr.push("");
                  var result=this.result.split(",")[1];
                  vm.images.push(result);
                } else if (vm.imgArr.length == 2) {
                  vm.imgArr.push({src: this.result,index:i});
                  var result=this.result.split(",")[1];
                  vm.images.push(result);
                }
              };
            }
        },
        //提交 + 表单验证
        check_sub:function () {
          var query={url:"mineQuestion",content:this.content,isAnon:Number(this.isAnon),money:this.money_show,payType:this.payType,trade:this.trade,images:this.images};
          if(this.vip){
            if (this.content!=null&&this.content!="") {
              $(".submit-btn").attr("disabled","true");
              _czc.push(["_trackEvent","航信会员免费发布问题","点击"]);
              this.ajax(this.http_url.url+'question/releaseQuestion',query,this.show_dialog)
            }else{
              $("textarea").focus();
              // alert("请输入问题");
              this.$myToast.error("请输入您要提问的内容");
            }

          }else{
            if (this.content!=null&&this.content!="") {
              $(".submit-btn").attr("disabled","true");
              _czc.push(["_trackEvent","普通会员发布问题","点击"]);
              this.go_pay(query)
            }else{
              $("textarea").focus();
              this.$myToast.error("请输入您要提问的内容");
            }
          }

        },
        //显示Dialog
        show_dialog:function (data) {
          var that=this;
          if(data.code==1){
            this.show=true
          }else{
            $(".submit-btn").attr("disabled","false")
            // alert(data.des);
            that.$myToast.error(data.des);
          }
        },
        //跳转支付（带参）
        go_pay:function (data) {
          data=encodeURIComponent(JSON.stringify(data));
          this.$router.push({ name: 'payMethod',query: {url:'mineQuestion',price: this.money_show ,source:"我要提问",data:data}})
        }
      }
    }

</script>

<style scoped>
  .home-head-title>img{
    width:1.19rem;
    height: 1.19rem;
    margin-right: 0.56rem;
    margin-top: -0.2rem;
  }
  .h-main-right{
    margin-top: 0;
    height:25.38rem;
    padding:1.56rem 2rem;
    box-sizing: border-box;
    background: url('../../../static/img/ask-rule-bg.png') no-repeat;
    background-size: 100% 100%;
  }
  .h-main-right .home-head-title{
    color: #666;
  }
  .textarea-box textarea{
    margin-top: 1.1rem;
    width: 100%;
    height: 6.13rem;
    padding: 0.5rem 0.7rem;
    border: 1px solid #EEEEEE;
    font-size: 0.875rem;
    line-height: 1.45;
  }
  .textarea-box textarea::placeholder{
    color:#999;
  }
  .rules{
    margin-top: 1.1rem;
  }
  .rules ol li{
    list-style:decimal;
    margin-left: 15px;
    line-height: 1.4;
    font-size: 0.875rem;
    color: #999;
    margin-top: 0.6rem
  }
  .orange-font{
    color: #FE6D27;
  }
  .home-head-title{
    width: 100%;
  }
  .ask-head-title{
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #333;
  }
  .home-head-title .ask-head-title{
    font-size: 0.875rem;
    color: #333;
    float: right;
    line-height: 18px;
    margin: 0;
  }
  .ask-price i{
    font-style: normal;
    margin-right: 5px;
    color: #FE6D27;
  }
  .ask-price i.no-v{
    color: #333333;
    text-decoration: line-through;
  }
  .upload-img-box  >>> .upload-img{
    width:5.5rem;
    height: 5.5rem;
    border:1px solid rgba(242,242,242,1);
    border-radius:2px;
    position: relative;
    margin-right: 0.55rem;
  }
  .upload-img-box >>>  .upload-img img{
    width:5.5rem;
    height: 5.5rem;
    position: absolute;
    margin:auto;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .upload-img-box  >>>  .upload-img p{
    width: 100%;
    position: absolute;
    text-align: center;
    margin:auto;
    top:3.5rem;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 0.625rem;
    color: #999;
    cursor: default;
  }
/*  .upload-img-box  >>>  .close-btn{
    display: none;
  }*/
  .upload-img-box  >>>  .close-btn,.upload-img-box  >>>  .close-btn  img{
    width: 1.44rem;
    height: 1.44rem;
    position: absolute;
    right: -0.3rem;
    top: -0.3rem;
    z-index: 2;
  }
  .upload-img-box  >>>  .file-img{
    position: absolute;
    top: 0;
    left: 0;
    width:5.5rem;
    height: 5.5rem;
    opacity: 0;
    z-index: 1;
  }
  .ask-trade-box input{
    width: 100%;
    height: 28px;
    color: #333333;
    padding-left: 0.81rem;
    cursor: default;
    font-size: 0.875rem;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .ask-trade-box span{
    width: 0.81rem;
    height: 0.44rem;
    display: inline-block;
    position: relative;
    left: -1.44rem;
  }
  .ask-trade-box span.down-icon{
    background: url("../../../static/img/header-down.png") no-repeat center;
  }
  .ask-trade-box span.up-icon{
    transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    background: url("../../../static/img/header-down.png") no-repeat center;
  }
  .ask-trade-box input::placeholder{
    color: #999999;
  }
  .ask-trade-box ul{
    margin-top: 1px;
    background: #fff;
    z-index: 2;
    width: 90%;
  }
  .ask-trade-box ul li{
    padding: 0 1rem;
    display: inline-block;
    height:28px;
    line-height: 28px;
    cursor: default;
    color: #333333;
    border:1px solid rgba(221,221,221,1);
    border-radius:2px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    position: relative;
  }
  .ask-trade-box ul li:hover,.ask-trade-box ul li.sld_trade{
    border: 1px solid #2D86FD;
    color: #2D86FD;
  }
  .checkbox-box{
    font-size: 0.875rem;
    position: relative;
    display: inline-block;
    margin-left: 1rem;
  }
  .checkbox-icon{
    color: #999;
  }
  .checkbox-icon{
    color: #666;
  }
  .checkbox-box input,.checkbox-box label{
    width: 0.875rem;
    height: 0.875rem;
    margin-right: 1rem;
    position: absolute;
  }
  .checkbox-box input{
    z-index: 1;
    opacity: 0;
  }
  .checkbox-box.checkbox-icon label{
    background:url("../../../static/img/label-checkbox-icon.png") no-repeat center;
    background-size: 100% 100%;
  }
  .checkbox-box.checked-icon label{
    background:url("../../../static/img/label-checked-icon.png") no-repeat center;
    background-size: 100% 100%;
  }
  .checkbox-box span{
    margin-left: 1.2rem;
  }
  .submit-btn{
    width: 7.625rem;
    height: 2.25rem;
    background:rgba(0,133,238,1);
    border: none;
    border-radius:2px;
    font-size: 0.875rem;
    color: #fff;
  }
  .aks-submit{
    margin-bottom: 80px;
  }
</style>
