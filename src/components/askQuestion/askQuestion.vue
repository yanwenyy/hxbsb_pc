<template>
    <div class="container">
      <BreadNav :breadName="title"></BreadNav>
      <div class="home-main box-sizing">
        <div class="h-main-left inline-block">
            <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>问题内容</div>
            <div class="textarea-box">
              <textarea placeholder="请详细描述您的问题，可附上图片。针对税企争议，方案设计，棘手问题，创新模式等类问题不适用快速咨询请选择私密问或联系客服。" v-model="content" name="content"></textarea>
            </div>
            <div class="ask-img-box">
              <div class="ask-head-title">添加图片(最多3张)</div>
              <div class="upload-img-box">
                <div class="upload-img inline-block" v-for="(item,index) in imgArr" >
                  <div class="close-btn" @click="delimg(index)" v-if="item.src!=''&&item.src!=null&&item.src!=undefined" >
                    <img src="/static/img/ask-close-img.png">
                  </div>
                  <img :src="item.src?item.src:mrsrc">
                  <input type="file" class="file-img" @change="addPic"  :class="'file'+index" name="images"/>
                </div>
              </div>
            </div>
            <div class="ask-trade-box">
              <div class="ask-head-title">问题涉及行业：</div>
              <input type="text" placeholder="请选择" readonly v-on:click="dropdown"  v-model="trade" />
              <span class="select-icon"  :class="down_icon ? 'up-icon' : 'down-icon' " ></span>
              <ul v-if="down_icon">
                <li v-for="item in trade_list"  v-on:click="seleced_trade(item.name)">{{item.name}}</li>
              </ul>
            </div>
            <div class="ask-head-title ask-price">提问金额：<i :class="vip?'no-v':''">￥15</i><span class="orange-font" v-show="vip">航信会员免费</span></div>
            <div class="ask-anonymity-box checkbox-box" :class="check_icon ? 'checked-icon' : 'checkbox-icon' ">
              <label class="inline-block icon"></label>
              <!-- 0是匿名 1是不匿名 -->
              <input type="checkbox" v-model="isAnon" :value="check_icon ? '0' : '1' " @click="check_icon = !check_icon;" name="isAnon"/><span>匿名提问</span>
            </div>
            <div class="aks-submit">
              <input type="button" class="submit-btn" @click="check_sub" value="提交"/>
            </div>
            <input type="hidden" name="payType" :value="vip?'free':null" />
        </div>
        <div class="h-main-right inline-block box-sizing">
          <div class="inline-block home-head-title">悬赏规则</div>
          <div class="rules">
            <ol type="1">
              <li>您的问题最多被两位咨询师抢答。</li>
              <li>收到答案后，您需要采纳一个最佳答案，如果两个答案都不采纳，您将不能继续提问回答不满意您可以举报后再提问。</li>
              <li>采纳答案后，您的问题和您采纳的答案将会被公开供平台其他用户围观。</li>
              <li>发布的问题只要上过推荐和热点有分成。分成规则为去除提问成本之后，提问者分围观金额收入的10%。</li>
              <li>咨询师24小时无应答，将按支付路径全额退款。</li>
            </ol>
          </div>
        </div>
      </div>
      <Diglog v-show="show"></Diglog>
    </div>
</template>
<script>
  import BreadNav from '@/components/breadNav';
  import Diglog from '@/components/askQuestion/sucDialog'
    export default {
        name: "ask-question",
        components: {
          BreadNav,
          Diglog
        },
      data () {
        return {
          vip:false,//判断是否vip
          down_icon:false,//仿select做上下三角样式
          trade:null,//行业名
          trade_list:[],//问题涉及行业列表
          check_icon:false,//是否匿名
          title:"",//给面包屑传值
          mrsrc:'../../../static/img/ask_up_img.png',//默认上传图片
          imgArr: [''],//预览图片列表
          show:false,//发布成功
          content:null,//问题内容
          isAnon:1,//是否匿名 0 是 1否
          payType:null,//支付类型
          images:[]//提交图片参数bsae64
        }
      },
      mounted (){
        //面包屑
        this.title='首页 > '+this.$route.meta.title;
        //调用接口-问题涉及行业
        this.ajax_nodata(this.http_url.url+'category/tree',this.get_trade);
        //获取登录账号的个人信息
        this.ajax_nodata(this.http_url.url+'user/message',this.get_vip);

      },
      methods:{
        //判断是否为航信会员航信会员
        get_vip:function(data){
          this.trade=data.trade
          if(data.vip==1){
            this.vip=false
          }else{
            this.vip=true
            this.payType='free'
          }
        },
        //问题涉及行业列仿select下拉图标
        dropdown:function(){
          if(this.down_icon==false){
            this.down_icon=true;
          }else{
            this.down_icon=false;
          }
        },
        //获取问题涉及行业列表
        get_trade:function(data){
          // console.log(data);
          var categorys=data.categorys;
          this.trade_list=this.get_category(categorys,"行业");
        },
        //选择问题涉及行业select
        seleced_trade:function (trade) {
          this.trade=trade;
          this.dropdown()
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
                  vm.images.push(this.result);
                } else if (vm.imgArr.length == 2) {
                  vm.imgArr.push({src: this.result,index:i});
                  vm.images.push(this.result);
                }
              };
            }
        },
        //提交 + 表单验证
        check_sub:function () {
          var query={url:"mineQuestion",content:this.content,isAnon:this.isAnon,money:15,payType:this.payType,trade:this.trade,images:this.images}
          if(this.vip){
            if (this.content!=null&&this.content!="") {
              this.ajax(this.http_url.url+'question/releaseQuestion',query,this.show_dialog)
            }else{
              $("textarea").focus()
            }

          }else{
            if (this.content!=null&&this.content!="") {
              this.go_pay(query)
            }else{
              $("textarea").focus()
            }
          }

        },
        //显示Dialog
        show_dialog:function (data) {
          if(data.code==1){
            this.show=true
          }
        },
        //跳转支付（带参）
        go_pay:function (data) {
          this.$router.push({ name: 'payMethod',query: {price: 15 ,source:"我要提问",data:data}})
        }
      }
    }

</script>

<style scoped>
  .h-main-right{
    margin-top: 0;
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
  .ask-head-title{
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #333;
  }
  .ask-price i{
    font-style: normal;
    margin-right: 5px;
  }
  .ask-price i.no-v{
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
    width: 8.565rem;
    height: 2rem;
    border: 1px solid #F2F2F2;
    color: #333333;
    padding-left: 0.81rem;
    cursor: default;
    font-size: 0.875rem;
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
    width: 9.325rem;
    height: 10rem;
    border: 1px solid #F2F2F2;
    overflow-y: scroll;
    margin-top: 1px;
    position: absolute;
    background: #fff;
    z-index: 2;
  }
  .ask-trade-box ul li{
    height: 2rem;
    line-height: 2rem;
    cursor: default;
    padding-left: 0.81rem;
    color: #333333;
  }
  .ask-trade-box ul li:hover{
    background: #F2F2F2;
    color: #2D86FD;
  }
  .checkbox-box{
    font-size: 0.875rem;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    position: relative;

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
