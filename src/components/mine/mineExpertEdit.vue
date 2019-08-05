<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="编辑信息"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>编辑信息</div>
        </div>
        <div class="mine-right-body">
          <div class="msg-notice">
            <div class="inline-block">提示：</div>
            <div class="inline-block msg-notice-detail">
              <div>1. 开通咨询师须持有本人平台指定的有效证书，注册会计师证、税务师及律师证书；</div>
              <div>2.证书照片可传1-3张，确保证书个人信息、发证日期及发证单位（印鉴）显示完整；</div>
              <div>3.拍摄时确保证书边框完整，字体清晰，亮度均匀；</div>
              <div>4.图片大小超过3M。</div>
            </div>
          </div>
          <div class="msg-detail box-sizing">
            <div class="inline-block head-msg">
              <img :src="user.headImage&&user.headImage.indexOf('base64')==-1?head_src+user.headImage:user.headImage" onerror="javascript:this.src='./static/img/expert-head.png';" alt="">
              <div>
                上传真实的头像
                <input type="file" class="file-head" @change="img_upload('.file-head','headImage')">
              </div>
            </div>
            <ul class="inline-block msg-ul">
              <li class="msg-li box-sizing">
                <span><span class="orange">* </span>昵称：</span>
                <div class="inline-block">
                  <input type="text" class="short-input box-sizing" v-model="user.realName" maxlength="5" placeholder="昵称不超过5个字符">
                </div>
                <span><span class="orange">* </span>真实姓名：</span>
                <div class="inline-block">
                  <input type="text" class="short-input box-sizing" v-model="user.userName" maxlength="5" placeholder="真实姓名不超过5个字符">
                </div>
              </li>
              <li class="msg-li box-sizing">
                <span>性别：</span>
                <div class="inline-block">
                  <select name="" class="short-input" v-model="user.gender" style="width:10.5rem">
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>
                <span>出生日期：</span>
                <div class="inline-block">
                  <input  type="date" v-model="user.birthday" class="short-input box-sizing">
                </div>
              </li>
              <li class="msg-li">
                <span><span class="orange">* </span>所在地：</span>
                <div class="inline-block">
                  <v-distpicker :province="user.province=='北京'||user.province=='上海'||user.province=='天津'||user.province=='重庆'?user.province+'市':user.province+'省'" :city="user.province=='北京'||user.province=='上海'||user.province=='天津'||user.province=='重庆'?user.province+'城区':user.address+'市'" :area="user.province=='北京'||user.province=='上海'||user.province=='天津'||user.province=='重庆'?user.address:''"  @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                </div>
              </li>
              <li class="msg-li">
                <span>职务：</span>
                <div class="inline-block">
                  <input type="text" v-model="user.position" class="long-input box-sizing" maxlength="5" placeholder="职务名称长度不超过五个字符">
                </div>
              </li>
              <li class="msg-li">
                <span><span class="orange">*</span>企业名称：</span>
                <div class="inline-block">
                  <input type="text" v-model="user.companyName" class="long-input box-sizing" maxlength="30" placeholder="企业名称不超过30个字符">
                </div>
              </li>
              <li class="msg-li">
                <span>公司所在行业：</span>
                <div class="inline-block">
                  <select name="" v-model="user.trade" class="long-input">
                    <option value="" v-for="item in hy" :value="item.name">{{item.name}}</option>
                  </select>
                </div>
              </li>
              <li class="msg-li">
                <span  style="vertical-align: top">个人经历：</span>
                <div class="inline-block">
                  <textarea name="" id="" v-model="user.experience" class="long-textarea box-sizing"></textarea>
                </div>
              </li>
              <li class="msg-li">
                <span  style="vertical-align: top">经典案例：</span>
                <div class="inline-block">
                  <textarea name="" id="" v-model="user.classicalCase" class="long-textarea box-sizing"></textarea>
                </div>
              </li>
              <li class="msg-li">
                <span>经典案例图片：</span>
                <div class="inline-block jdal-img-show" v-for="item in user.cases">
                  <img :src="user.cases&&item.indexOf('base64')==-1?cert_src+item:item" alt="">
                  <span class="cursor" @click="remove(user.cases,item)">x</span>
                </div>
                <div class="inline-block jdal-img-add cursor"  v-show="user.cases?user.cases.length<3:true">
                  +
                  <input type="file" class="jdal-upload" @change="img_upload('.jdal-upload','cases')">
                </div>
              </li>
              <li class="msg-li">
                <span style="vertical-align: top"><span class="orange">*</span>擅长领域：</span>
                <div class="inline-block">
                  <div class="ly-div box-sizing">
                    <span class="inline-block">专题：</span>
                    <div class="inline-block box-sizing zt">
                      <span :title="adep&&adep.indexOf(item.uuid)!=-1?'点击取消':'点击选中'" class="inline-block ly-list cursor" :class="adep&&adep.indexOf(item.uuid)!=-1?'blue':''" v-for="item in zt" @click="checkbox_click($event,'.zt',item)">
                        <!--<input type="checkbox" :checked="adep.indexOf(item.uuid)!=-1" @change="$event.target.checked?adep.push(item.uuid):remove(adep,item.uuid)" class="zt">-->
                       {{item.name}}
                      </span>
                    </div>
                  </div>
                  <div class="ly-div box-sizing">
                    <span class="inline-block">税种：</span>
                    <div class="inline-block box-sizing sz">
                       <span :title="adep&&adep.indexOf(item.uuid)!=-1?'点击取消':'点击选中'" class="inline-block ly-list cursor" :class="adep&&adep.indexOf(item.uuid)!=-1?'blue':''" v-for="item in sz" @click="checkbox_click($event,'.sz',item)">
                        <!--<input type="checkbox" :checked="adep.indexOf(item.uuid)!=-1" @change="$event.target.checked?adep.push(item.uuid):remove(adep,item.uuid)" class="zt">-->
                       {{item.name}}
                      </span>
                      <!--<span class="inline-block ly-list" v-for="item in sz">-->
                        <!--<input type="checkbox" :checked="adep.indexOf(item.uuid)!=-1" @change="$event.target.checked?adep.push(item.uuid):remove(adep,item.uuid)">-->
                        <!--{{item.name}}-->
                      <!--</span>-->
                    </div>
                  </div>
                  <div class="ly-div box-sizing">
                    <span class="inline-block">行业：</span>
                    <div class="inline-block box-sizing hy">
                       <span :title="adep&&adep.indexOf(item.uuid)!=-1?'点击取消':'点击选中'" class="inline-block ly-list cursor" :class="adep&&adep.indexOf(item.uuid)!=-1?'blue':''" v-for="item in hy" @click="checkbox_click($event,'.hy',item)">
                        <!--<input type="checkbox" :checked="adep.indexOf(item.uuid)!=-1" @change="$event.target.checked?adep.push(item.uuid):remove(adep,item.uuid)" class="zt">-->
                       {{item.name}}
                      </span>
                      <!--<span class="inline-block ly-list" v-for="item in hy">-->
                        <!--<input type="checkbox" :checked="adep.indexOf(item.uuid)!=-1" @change="$event.target.checked?adep.push(item.uuid):remove(adep,item.uuid)">-->
                        <!--{{item.name}}-->
                      <!--</span>-->
                    </div>
                  </div>
                </div>
              </li>
              <li class="msg-li">
                <span><span class="orange">*</span>身份证号：</span>
                <div class="inline-block">
                  <input type="text" v-model="user.idCard" class="long-input box-sizing" maxlength="18" placeholder="身份证号长度不得超过18个字符">
                </div>
              </li>
              <li class="msg-li">
                <span style="vertical-align: top"><span class="orange">*</span>身份证照片：</span>
                <div class="sfz-show inline-block box-sizing" v-show="user.idCardFront!=''">
                  <img :src="user.idCardFront&&user.idCardFront.indexOf('base64')==-1?cert_src+user.idCardFront:user.idCardFront" alt="">
                  <span class="inline-block cursor" @click="user.idCardFront=''">x</span>
                </div>
                <div class="inline-block sfz-pic box-sizing" v-show="user.idCardFront==''">
                  <img src="../../../static/img/sfz-front.png" alt="">
                  <div>点击上传身份证正面</div>
                  <input type="file" class="sfz1" @change="img_upload('.sfz1','idCardFront')">
                </div>
                <div class="sfz-show inline-block box-sizing" v-show="user.idCardBack!=''">
                  <img :src="user.idCardBack&&user.idCardBack.indexOf('base64')==-1?cert_src+user.idCardBack:user.idCardBack" alt="">
                  <span class="inline-block cursor" @click="user.idCardBack=''">x</span>
                </div>
                <div class="inline-block sfz-pic box-sizing" v-show="user.idCardBack==''">
                  <img src="../../../static/img/sfz-back.png" alt="">
                  <div>点击上传身份证反面</div>
                  <input type="file" class="sfz2" @change="img_upload('.sfz2','idCardBack')">
                </div>
              </li>
              <li class="msg-li">
                <span style="vertical-align: top"><span class="orange">*</span>上传证书：</span>
                <div class="inline-block box-sizing">
                  <div class="zs-list">
                    注册会计师
                    <div>
                      <div class="kjs-up kjs-show inline-block box-sizing" v-for="item in user.accountants">
                        <img :src="user.accountants&&item.indexOf('base64')==-1?cert_src+item:item" alt="">
                        <span class="inline-block cursor" @click="remove(user.accountants,item)">x</span>
                      </div>
                      <div class="kjs-up inline-block box-sizing" v-show="user.accountants?user.accountants.length<3:true">
                        <img src="../../../static/img/zs-upload.png" class="zs-upload-img" alt="">
                        <div class="zs-upload-btn">点击上传</div>
                        <input type="file" class="zs-upload-input kjs" @change="img_upload('.kjs','accountants')">
                      </div>
                    </div>
                  </div>
                  <div class="zs-list">
                    税务师
                    <div>
                      <div class="kjs-up kjs-show inline-block box-sizing" v-for="item in user.taxs">
                        <img :src="user.taxs&&item.indexOf('base64')==-1?cert_src+item:item" alt="">
                        <span class="inline-block cursor" @click="remove(user.taxs,item)">x</span>
                      </div>
                      <div class="kjs-up inline-block box-sizing" v-show="user.taxs?user.taxs.length<3:true">
                        <img src="../../../static/img/zs-upload.png" class="zs-upload-img" alt="">
                        <div class="zs-upload-btn">点击上传</div>
                        <input type="file" class="zs-upload-input sws" @change="img_upload('.sws','taxs')">
                      </div>
                    </div>
                  </div>
                  <div class="zs-list">
                    律师
                    <div>
                      <div class="kjs-up kjs-show inline-block box-sizing" v-for="item in user.lawyers">
                        <img :src="user.lawyers&&item.indexOf('base64')==-1?cert_src+item:item" alt="">
                        <span class="inline-block cursor" @click="remove(user.lawyers,item)">x</span>
                      </div>
                      <div class="kjs-up inline-block box-sizing" v-show="user.lawyers?user.lawyers.length<3:true">
                        <img src="../../../static/img/zs-upload.png" class="zs-upload-img" alt="">
                        <div class="zs-upload-btn">点击上传</div>
                        <input type="file" class="zs-upload-input ls" @change="img_upload('.ls','lawyers')">
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="sub-btn-group">
            <div class="inline-block btn-sub cursor" @click="sub()">提交</div>
            <div class="inline-block btn-back cursor" @click="$router.push({name:'mineRobAnswer'})">返回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
  import VDistpicker from 'v-distpicker'
    export default {
      name: "mine-expert-edit",
      components:{
        mineLeft
      },
      data(){
        return{
          user:{
            headImage:'',//头像
            realName:'',//昵称
            userName:'',//真实姓名
            gender:'',//性别
            birthday:'',//出生日期
            province:'',//省
            address:'',//市
            position:'',//职务
            companyName:'',//企业名称
            trade:'',//公司所在行业
            experience:'',//个人经历
            classicalCase:'',//经典案例
            cases:'',//经典案例图片
            adepts:'',//擅长领域
            idCard:'',//身份证号
            idCardFront:'',//身份证照片前
            idCardBack:'',//身份证照片后
            accountants:'',//注册会计师
            taxs:'',//税务师
            lawyers:''//律所
          },//用户基本信息
          hy:[],//行业列表
          sz:[],//税种
          zt:[],//专题
          hy_list:[],//行业列表
          sz_list:[],//税种
          zt_list:[],//专题
          adep:[],//擅长领域
        }
      },
      mounted(){
        var that=this;
        // this.user=JSON.parse(sessionStorage.getItem("userMessage"));
        this.ajax_nodata(this.http_url.url+"/user/message",function(data){
          that.user=data;
          for(var i in data.adepts){
            that.adep.push(i);
          };
          that.user.cases=that.img_show(that.user.cases);
          that.user.accountants=that.img_show(that.user.accountants);
          that.user.taxs=that.img_show(that.user.taxs);
          that.user.lawyers=that.img_show(that.user.lawyers);
          // that.user.idCardFront=that.cert_src+data.idCardFront;
          // that.user.idCardBack=that.cert_src+data.idCardBack;
        });
        this.ajax_nodata(this.http_url.url+"/category/tree",function(data){
          that.hy=that.get_category(data.categorys,"行业");
          that.sz=that.get_category(data.categorys,"税种");
          that.zt=that.get_category(data.categorys,"专题");
        })
      },
      methods:{
        //省市选择
        onChangeProvince(a){
          // console.log(a);
          // // this.province=a;
          this.user.province=a.value.indexOf("市")!=-1?a.value.split('市')[0]:a.value.split('省')[0];
        },
        //城市选择
        onChangeCity(a){
          // // console.log(a)
          // this.city=a.value;
          if(this.user.province=="北京"||this.user.province=="上海"||this.user.province=="天津"||this.user.province=="重庆"){
            return;
          }else{
            this.user.address=a.value.split('市')[0];
          }
        },
        //区域选择
        onChangeArea(a){
          // console.log(a)
          // this.area=a.value;
          if(this.user.province=="北京"||this.user.province=="上海"||this.user.province=="天津"||this.user.province=="重庆"){
            this.user.address=a.value
          }
        },
        //提交按钮点击
        sub:function(){
          var that=this;
          if(this.user.headImage==''||this.user.headImage==null){
            this.$myToast.error("请上传用户头像")
          }else if(this.user.realName==''||this.user.realName==null){
            this.$myToast.error("请填写昵称")
          }else if(this.user.userName==''||this.user.userName==null){
            this.$myToast.error("请填写真实姓名")
          }else if(this.user.province==''||this.user.province==null||this.user.address==''||this.user.address==null){
            this.$myToast.error("请选择所在地区")
          }else if(this.adep==''||this.adep==null){
            this.$myToast.error("请选择擅长领域")
          }else if(this.user.companyName==''||this.user.companyName==null){
            this.$myToast.error("请填写企业名称")
          }else if(this.user.idCard==''||this.user.idCard==null){
            this.$myToast.error("请填写身份证号")
          }else if(this.user.idCardFront==''||this.user.idCardFront==null){
            this.$myToast.error("请上传身份证照片")
          }else if(this.user.idCardBack==''||this.user.idCardBack==null){
            this.$myToast.error("请上传身份证照片")
          }else if((this.user.accountants==null||this.user.accountants=='')&&(this.user.taxs==null||this.user.taxs=='')&&(this.user.lawyers==null||this.user.lawyers=='')){
            this.$myToast.error("三证必须上传一种")
          }else{
            this.ajax(this.http_url.url+"/user/counselor",{
              "headImage":this.user.headImage.indexOf("base64")==-1? null:this.change_base(this.user.headImage),
              "adep":this.adep.join(","),
              "position":this.user.position,
              "companyName":this.user.companyName,
              "trade":this.user.trade,
              "experience":this.user.experience,
              "classicalCase":this.user.classicalCase,
              "caseImages":this.change_base(this.user.cases)||[],
              "accountantImage":this.change_base(this.user.accountants)||[],
              "taxImage":this.change_base(this.user.taxs)||[],
              "lawyerImage":this.change_base(this.user.lawyers)||[],
              "userName":this.user.userName,
              "realName":this.user.realName,
              "sex":this.user.gender=="男"?1:2,
              "birthdayDate":this.user.birthday,
              "address":this.user.address,
              "province":this.user.province,
              "idCard":this.user.idCard,
              "idCardFront":this.user.idCardFront.indexOf("base64")==-1? null:this.change_base(this.user.idCardFront),
              "idCardBack":this.user.idCardBack.indexOf("base64")==-1? null:this.change_base(this.user.idCardBack)
            },function(data){
              if(data.code==1){
                that.$myToast.success(data.des);
                that.$router.push({name:'mineWorkbench'});
              }else{
                that.$myToast.error(data.des);
              }
            })
          }

        },
        //上传图片事件
        img_upload:function(elm,name){
          var that=this;
          var file = $(elm).get(0).files[0];
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload=function(e){
            // console.log(e.target.result);
           switch (name){
             case 'headImage':
               that.user.headImage=e.target.result;
               break;
             case 'idCardFront':
               that.user.idCardFront=e.target.result;
               break;
             case 'idCardBack':
               that.user.idCardBack=e.target.result;
               break;
             case 'cases':
               if(that.user.cases==null||that.user.cases==''){
                 that.user.cases=[];
               }
               that.user.cases.push(e.target.result);
               break;
             case 'accountants':
               if(that.user.accountants==null||that.user.accountants==''){
                 that.user.accountants=[];
               }
               that.user.accountants.push(e.target.result);
               break;
             case 'taxs':
               if(that.user.taxs==null||that.user.taxs==''){
                 that.user.taxs=[];
               }
               that.user.taxs.push(e.target.result);
               break;
             case 'lawyers':
               if(that.user.lawyers==null||that.user.lawyers==''){
                 that.user.lawyers=[];
               }
               that.user.lawyers.push(e.target.result);
               break;
             default:return;
           }
          };
        },
        //找对象里是否有某个值
        find:function(val,obj){
          for(var i in obj){
            if(i==val){
              return true;
            }
          }
        },
        //数组删除item
        indexOf:function(item,val){
          for (var i = 0; i < item.length; i++) {
            if (item[i] == val) return i;
          }
          return -1;
        },
        remove:function (item,val) {
          var index = this.indexOf(item,val);
          if (index > -1) {
            item.splice(index, 1);
          }
        },
        //转换base图片
        change_base:function(list){
          if(typeof list=="object"&&list){
            var list_s=[];
            for(var i=0;i<list.length;i++){
              if(list[i].indexOf("base64")!=-1){
                list_s.push(list[i].split(",")[1]);
              }else{
                list_s.push(list[i])
              }
            }
            return list_s;
          }else if(typeof list=="string"&&list){
            return list=list.split(",")[1];
          }else{
            return null;
          }
        },
        //限制擅长领域个数
        checkbox_click:function(e,elm,item){
          if(e.target.className.indexOf("blue")!=-1){
            this.remove(this.adep,item.uuid)
          }else{
            if($(elm).find(".blue").size()>2){
              alert("当前领域最多选择3个")
            }else{
              this.adep.push(item.uuid)
            }
          }
          //adep.push(item.uuid):remove(adep,item.uuid)
        },
        //经典案例,会计师,律师,税务师图片回显
        img_show:function(arr){
          var that=this,arr_list=[];
          if(arr&&arr!=null&arr!=''){
            for(var i=0;i<arr.length;i++){
              that.main(that.cert_src+arr[i],function(base64){
                arr_list.push(base64);
              })
            }
            // that.base64_del(arr);
          }
          return arr_list;
        },
        getBase64Image:function(img,arr){
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          var dataURL = canvas.toDataURL("image/png");  // 可选其他值 image/jpeg
          return dataURL;
        },
        main:function(src, cb,arr){
          var image = new Image(),that=this;
          image.src = src + '?v=' + Math.random(); // 处理缓存
          image.crossOrigin = "*";  // 支持跨域图片
          image.onload = function(){
            var base64 = that.getBase64Image(image);
            // arr.push(base64)
            cb && cb(base64);
          };
          return image;
        },
        //删除非base64图片
        base64_del:function(arr){
          for(var i=0;i<arr.length;i++){
            if(arr[i].indexOf("base64")==-1){
              this.remove(arr,arr[i])
            }
          }
          return arr;
        },
      }
    }
</script>

<style scoped>
  .kjs-up{
    margin-top: 1rem;
    border:1px solid rgba(238,238,238,1);
    border-radius:2px;
    width:7rem;
    height:7rem;
    text-align: center;
    position: relative;
    vertical-align: top;
  }
  .kjs-show>img{
    width:100%;
    height:100%;
  }
  .kjs-show{
    width:7rem;
    height:7rem;
    margin-right: 0.8rem;
  }
  .sfz-show>span,.kjs-show>span{
    width:1rem;
    height:1rem;
    line-height: 1rem;
    text-align: center;
    color:#fff;
    background: rgba(0,0,0,.5);
    border-radius: 2px;
    position: absolute;
    top:0;
    right:0;
  }
  .sfz-show{
    vertical-align: top;
    position: relative;
    width:11.75rem;
    height:9.75rem;
    text-align: center;
    font-size: 0.88rem;
    color:#666;
    border:1px solid rgba(238,238,238,1);
    border-radius:2px;
    margin-right: 1.75rem;
  }
  .sfz-show>img{
    width:100%;
    height:100%;
  }
  .jdal-upload{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
  }
  .jdal-img-add{
    font-size: 2rem;
    width:4rem;
    height:4rem;
    line-height: 4rem;
    text-align: center;
    border:1px solid #eee;
    border-radius: 2px;
    position: relative;
  }
  .jdal-img-show{
    width:4rem;
    height:4rem;
    position: relative;
    vertical-align: top;
  }
  .jdal-img-show>img{
    width:100%;
    height:100%;
  }
  .jdal-img-show>span{
    width:1rem;
    height:1rem;
    line-height: 1rem;
    text-align: center;
    display: inline-block;
    border-radius: 1px solid #eee;
    background: rgba(0,0,0,.5);
    color:#fff;
    position: absolute;
    top:0;
    right:0;
  }
  .btn-sub{
    background:rgba(66,106,245,1);
    color:#fff;
    margin-right: 2.13rem;
  }
  .btn-back{
    background:rgba(238,238,238,1);
    color:#666;
  }
  .sub-btn-group>div{
    width:7.5rem;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    border-radius:2px;
    font-size: 1rem;
  }
  .sub-btn-group{
    border-top:1px solid #eee;
    margin-bottom: 4.38rem;
    text-align: center;
    padding-top:2.31rem ;
  }
  .zs-upload-input{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
  }
  .zs-upload-img{
    margin: 1.5rem 0 0.94rem 0;
    width:1.69rem;
    height:1.44rem;
  }
  .zs-upload-btn{
    width:4.5rem;
    height:1.5rem;
    line-height: 1.5rem;
    text-align: center;
    border:1px solid rgba(66,106,245,1);
    border-radius:2px;
    color:#426AF5;
    font-size: 0.75rem;
    margin: 0 auto;
  }
  .zs-list{
    margin-bottom: 2.56rem;
    font-size: 0.94rem;
    color:#333;
  }
  .sfz-pic>input{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
  }
  .sfz-pic{
    vertical-align: top;
    position: relative;
    width:11.75rem;
    height:9.75rem;
    text-align: center;
    padding:1rem 0;
    font-size: 0.88rem;
    color:#666;
    border:1px solid rgba(238,238,238,1);
    border-radius:2px;
    margin-right: 1.75rem;
  }
  .sfz-pic>img{
    width:9.13rem;
    height:5.44rem;
    margin-bottom: 1.19rem;
  }
  .distpicker-address-wrapper >>>select{
    width:9rem;
    height:2.25rem;
    margin-right: 0.5rem;
    padding:0;
    padding-left: 0.94rem;
    border:1px solid rgba(238,238,238,1);
    border-radius:2px;
  }
  .ly-list{
    margin: 0 1.6rem 0.94rem 0;
    }
  .long-input{
    width:28.4rem;
    height:2.25rem;
    padding-left: 0.94rem;
    border:1px solid rgba(238,238,238,1);
    border-radius:2px;
  }
  .ly-div{
    width:28.4rem;
    word-break: break-all;
    font-size: 0.88rem;
  }
  .ly-div>span{
    width:10%;
    vertical-align: top;
  }
  .ly-div>div{
    width:88%;
  }
  .long-textarea{
    width:28.4rem;
    height:8.8rem;
    padding: 0.94rem;
    border:1px solid rgba(238,238,238,1);
    border-radius:2px;
  }
  .msg-ul{
    margin-top:0.3rem;
    margin-left: 2rem;
  }
  .short-input{
    width:10.5rem;
    height:2.25rem;
    padding-left: 0.94rem;
    border:1px solid rgba(238,238,238,1);
    border-radius:2px;
  }
  .msg-li{
    margin-bottom: 1.125rem;
  }
  .msg-li>span{
    width:7rem;
    vertical-align: middle;
    text-align: right;
    display: inline-block;
    color:#999;
    font-size: 1rem;
  }
  .file-head{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
  }
  .head-msg{
    vertical-align: top;
    text-align: center;
  }
  .head-msg>img{
    width:5.69rem;
    height:5.69rem;
    border-radius: 50%;
    margin-bottom: 1rem;
  }
  .head-msg>div{
    position: relative;
    width:8rem;
    height:1.88rem;
    line-height: 1.88rem;
    text-align: center;
    color:#333;
    font-size: 0.81rem;
    background:rgba(246,246,246,1);
    border:1px solid rgba(229,229,229,1);
    border-radius:2px;
  }
  .msg-notice{
    font-size: 0.88rem;
    color:#999;
    margin: 1.88rem 4rem;
  }
  .msg-notice>div{
    vertical-align: top;
  }
  .msg-notice-detail>div{
    margin-bottom: 0.5rem;
  }
  .msg-detail{
    padding:1.63rem 0 1.63rem 2rem;
  }
  .msg-li input,.msg-li select,>>>.distpicker-address-wrapper>select{
    font-size: 0.88rem!important;
  }
</style>
