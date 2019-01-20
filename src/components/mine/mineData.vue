<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的资料"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="mine-data-head box-sizing">
          <div class="home-model-header">
            <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的资料</div>
          </div>
          <div class="mine-data-user-msg">
            <div class="inline-block mine-data-user-img">
              <img :src="user_img" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
              <input type="file" class="img-file cursor" @change="head_img_sel()">
              <div>上传头像</div>
            </div>
            <div class="inline-block mine-data-user-duty">
              <div class="mine-data-user-name">{{user_name}}</div>
              <div class="mine-data-user-duty-img">
                <img :src="dj_img" alt="">
              </div>
              <div v-if="usermsg.aision==0&&usermsg.vip==0" class="mine-data-user-duty-date">快速问免费 有效期至 {{format(hangxin_date)}}</div>
              <div v-if="usermsg.aision==0&&usermsg.vip==1" class="mine-data-user-duty-date">航信会员已过期</div>
            </div>
          </div>
        </div>
        <div class="mine-data-body box-sizing">
            <ul>
              <li>
                <span class="inline-block">
                  <span class="orange">*</span>昵   称：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入昵称" v-model="user_name">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  真实姓名：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入真实姓名" v-model="user_realNanme">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  出生日期：
                </span>
                <div class="inline-block">
                  <input type="date" v-model="birthday">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  手机号：
                </span>
                <div class="inline-block">
                  {{phoneNumber}}
                </div>
              </li>
              <li>
                <span class="inline-block">
                  企业名称：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入企业名称" v-model="companyName">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  公司所在行业：
                </span>
                <div class="inline-block company-industry">
                  <input type="text" placeholder="请输入公司所在行业" @click="hy_show=!hy_show" v-model="hy_msg">
                  <img src="../../../static/img/input-sel.png" alt="" class="input-sel">
                  <div class="company-industry-list" v-if="hy_show">
                    <ul class="box-sizing">
                      <li v-for="items in hy" @click="hy_sel(items.name)">{{items.name}}</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <span class="inline-block">
                  <span class="orange">*</span>所在城市：
                </span>
                <div class="inline-block">
                  <v-distpicker :province="province" :city="city" :area="area"  @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                </div>
              </li>
              <li>
                <span class="inline-block">

                </span>
                <div class="inline-block mine-data-btn">
                  <div class="data-sub-btn inline-block cursor" @click="sub_msg()">保存</div>
                  <div class="data-reset-btn inline-block cursor">取消</div>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
  import VDistpicker from 'v-distpicker'
    export default {
        name: "mine-data",
        components:{
          mineLeft,
          VDistpicker
        },
      data() {
        return {
          usermsg:'',
          //公司所在行业
          hy:[],
          hy_show:false,
          //行业显示
          hy_msg:'',
          //用户头像
          user_img:'../../../static/img/mine-data-img.png',
          //用户名字
          user_name:'',
          //用户真实姓名
          user_realNanme:'',
          //用户出生日期
          birthday:'',
          //等级img
          dj_img:'',
          //航信会员有效期
          hangxin_date:'',
          //用户手机号
          phoneNumber:'',
          //公司名称
          companyName:'',
          //省
          province:'',
          //市
          city:'',
          //区
          area:'',
          //性别
          gender:'',
          //职位
          position:''

        }
      },
      mounted(){
        //行业,税种,专题
        this.ajax_nodata(this.http_url.url+'/category/tree',this.get_tree);
        //用户信息
        this.ajax_nodata(this.http_url.url+'/user/message',this.get_usermessge);
      },
      methods: {
          //获取所有用户资料
        get_usermessge:function(data){
          var that=this;
          console.log(data);
          this.usermsg=data;
          this.user_img=this.head_src+data.headImage;
          console.log(this.user_img);
          this.user_name=data.realName;
          this.dj_img=this.get_score(data.integralScore,data.aision,data.vip);
          this.hangxin_date=data.vipTime;
          this.user_realNanme=data.userName;
          this.birthday=data.birthday;
          this.phoneNumber=data.phone;
          this.companyName=data.companyName;
          this.hy_msg=data.trade;
          this.gender=data.gender;
          this.position=data.position;
          if(data.province=="北京市"||data.province=="上海市"||data.province=="天津市"||data.province=="重庆市"){
            this.province=data.province;
            this.city=data.province.split("市")[0]+"城区";
            this.area=data.address;
          }else if(data.province=="北京"||data.province=="上海"||data.province=="天津"||data.province=="重庆"){
            this.province=data.province+"市";
            this.city=data.province+"城区";
            this.area=data.address;
          }else{
            if(data.province.indexOf("省")!=-1){
              this.province=data.province;
              this.city=data.address;
            }else{
              this.province=data.province+"省";
              this.city=data.address;
            }
            this.city=data.address+"市";
          }
        },
       //省市选择
        onChangeProvince(a){
          // console.log(a);
          // this.province=a;
          this.province=a.value;
        },
        //城市选择
        onChangeCity(a){
          // console.log(a)
          this.city=a.value;
        },
        //区域选择
        onChangeArea(a){
          // console.log(a)
          this.area=a.value;
        },
        //公司所在行业
        get_tree:function(data){
          var categorys=data.categorys;
          this.hy=this.get_category(categorys,"行业");
        },
        hy_sel:function(val){
          this.hy_msg=val;
          this.hy_show=false;
        },
        //用户头像选择
        head_img_sel:function(){
          var that=this;
          var file = $('.img-file').get(0).files[0];
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload=function(e){
            // console.log(e.target.result);
            that.user_img=e.target.result;
          };
        },
        //提交用户信息
        sub_msg:function(){
          var that=this,address='',gender='',headImage='';
          if(that.province=="北京市"||that.province=="上海市"||that.province=="天津市"||that.province=="重庆市"){
            address=this.area;
          }else{
            address=this.city.split("市")[0];
          }
          if(that.gender=="女"){
            gender=2;
          }else{
            gender=1;
          }
          if(this.user_img.indexOf("/showImg/head/")!=-1){
            headImage=null;
          }else{
            headImage=this.user_img.split(",")[1];
          }
          function edit_user_msg(data){
            if(data.code==1){
              alert(data.des);
              location.reload();
            }else{
              alert(data.des)
            }
          }
          if(that.user_name==""){
            alert("昵称不能为空")
          }else if(that.province=="省"||address==""){
            alert("请完善所在城市信息")
          }else{
            that.ajax(that.http_url.url+"/user/editUser",{
              "headImage":headImage,
              "realName":that.user_name,
              "userName":that.user_realNanme,
              "sex":gender,
              "province":that.province,
              "trade":that.hy_msg,
              "address":address,
              "companyName":that.companyName,
              "birthdayDate":that.birthday,
              "position":that.position
            },edit_user_msg)
          }
        }
      },
    }
</script>

<style scoped>
  .img-file{
    position: absolute;
    top:0;
    left:0;
    width: 5.375rem;
    height: 5.375rem;
    opacity: 0;
  }
  .company-industry-list li{
    text-align: center;
    height:2rem;
    line-height: 2rem;
  }
  .company-industry-list>ul{
    width: 100%;
    border:1px solid #eee;
  }
  .company-industry-list{
    width: 100%;
    position: absolute;
    top: 2.4rem;
    background: #fff;
    height:6.125rem;
    overflow: auto;
  }
  >>>.distpicker-address-wrapper>select{
    width:7.125rem;
    height:2.25rem;
    color:#999;
    font-size: 0.75rem;
    margin-right: 1rem;
  }
  .data-reset-btn{
    background: #DDDDDD;
    color:#666;
  }
  .data-sub-btn{
    background: #2D86FD;
    color:#fff;
  }
  .mine-data-btn{
    margin-top: 2rem;
  }
  .mine-data-btn>div{
    width:6.25rem;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    border-radius: 2px;
    font-size: 0.75rem;
    margin-right: 1.32rem;
  }
  .company-industry{
    position: relative;
  }
  .input-sel{
    position: absolute;
    top:1rem;
    right:1rem;
  }
  .mine-data-body li input{
    width:12.31rem;
    height:2.25rem;
    padding-left: 0.625rem;
    border:1px solid rgba(221,221,221,1);
    border-radius: 2px;
    outline: #BCD5FF;
  }
  .mine-data-body>ul>li{
    font-size: 0.75rem;
    color:#333;
    margin-bottom: 1rem;
  }
  .mine-data-body li>span{
    width: 15%;
    text-align: right;
  }
  .mine-data-user-duty-img>img{
      width:4.06rem;
      height:1.19rem;
  }
  .mine-data-user-name{
    font-size: 1rem;
    color:#333;
    font-weight: 400;
  }
  .mine-data-user-duty>div{
    margin-top: 0.6rem;
  }
  .mine-data-user-duty{
    font-size: 0.75rem;
    color:#999;
    margin-left: 0.625rem;
  }
  .mine-data-user-img>div{
    text-align: center;
    font-size: 0.75rem;
    color:#333;
  }
  .mine-data-user-duty,.mine-data-user-img{
    vertical-align: top;
  }
  .mine-data-user-img>img{
    width:5.375rem;
    height:5.375rem;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
  .mine-data-user-img{
    position: relative;
  }
  .mine-right{
    background: #F4F6F8;
    box-shadow:none;
  }
  .mine-data-head{
    height:10.75rem;
    width:100%;
    background: #fff;
    box-shadow:0px 1px 8px 0px rgba(54,177,255,0.1);
    border-radius:4px;
    margin-bottom: 1rem;
    padding:0 0.875rem;
  }
  .mine-data-body{
    height:30.69rem;
    width:100%;
    background: #fff;
    box-shadow:0px 1px 8px 0px rgba(54,177,255,0.1);
    border-radius:4px;
    padding:1.5rem 0;
  }
</style>
