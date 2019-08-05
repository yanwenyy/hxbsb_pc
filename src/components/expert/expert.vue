<template>
  <div class="home-body">
    <headerTab msg="专家"></headerTab>
    <!--<Swiper></Swiper>-->
    <div class="container">
      <div class="home-main box-sizing">
        <div class="inline-block">
          <div class="wdk-select-group">
            <ul>
              <!--<li>-->
                <!--<div class="wdk-select-name inline-block">全部类型:</div>-->
                <!--<div class="wdk-select-msg inline-block">-->
                  <!--<div class="inline-block blue" @click="load_list()">全部</div>-->
                <!--</div>-->
              <!--</li>-->
              <li>
                <div class="wdk-select-name inline-block">选择省市:</div>
                <div class="wdk-select-msg inline-block">
                  <div :class="sel.province==''? 'blue':''" class="inline-block wdk-select-msg-div" @click="sel.province='';sel.city=''">全部</div>
                  <div :class="sel.province==item.name? 'blue':''" class="inline-block wdk-select-msg-div" @click="province_click(item);sel.province=item.name;sel.city=''" v-for="item in self_city" >{{item.name}}</div>
                  <div class="city-show" v-show="sel.province!=''">
                    <img src="../../../static/img/city-bg.png" alt="">
                    <div>
                      <div :class="sel.city==item.name? 'blue':''" class="inline-block city-list" @click="sel.city=item.name" v-for="item in city_list" >{{item.name}}</div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="wdk-select-name inline-block">行业类型:</div>
                <div class="wdk-select-msg inline-block">
                  <div :class="sel.tradeId.name==''? 'blue':''" class="inline-block wdk-select-msg-div" @click="sel.tradeId={name:'',id:''}">全部</div>
                  <div :class="sel.tradeId.name==item.name? 'blue':''" class="inline-block wdk-select-msg-div" @click="sel.tradeId={name:item.name,id:item.uuid}" v-for="item in hy" data-type="trade">{{item.name}}</div>
                </div>
              </li>
              <li>
                <div class="wdk-select-name inline-block">专题类型:</div>
                <div class="wdk-select-msg inline-block">
                  <div :class="sel.topicId.name==''? 'blue':''" class="inline-block wdk-select-msg-div" @click="sel.topicId={name:'',id:''}">全部</div>
                  <div :class="sel.topicId.name==item.name? 'blue':''" class="inline-block wdk-select-msg-div" @click="sel.topicId={name:item.name,id:item.uuid}"  v-for="item in zt" data-type="topic">{{item.name}}</div>
                </div>
              </li>
              <li>
                <div class="wdk-select-name inline-block">税种类型:</div>
                <div class="wdk-select-msg inline-block">
                  <div :class="sel.taxId.name==''? 'blue':''" class="inline-block wdk-select-msg-div" @click="sel.taxId={name:'',id:''}">全部</div>
                  <div :class="sel.taxId.name==item.name? 'blue':''" class="inline-block wdk-select-msg-div" @click="sel.taxId={name:item.name,id:item.uuid}"  v-for="item in sz" data-type="tax">{{item.name}}</div>
                </div>
              </li>
            </ul>
            <div class="sel-show box-sizing">
              <div class="inline-block">当前选择：</div>
              <div class="inline-block">
                <span class="inline-block box-sizing" v-show="sel.city==''&&sel.province!=''">{{sel.province}} <b class="cursor" @click="sel.province=''">X</b></span>
                <span class="inline-block box-sizing" v-show="sel.city!=''">{{sel.city}} <b class="cursor" @click="sel.city=''">X</b></span>
                <span class="inline-block box-sizing" v-show="sel.topicId.name!=''">{{sel.topicId.name}} <b class="cursor" @click="sel.topicId={name:'',id:''}">X</b></span>
                <span class="inline-block box-sizing" v-show="sel.taxId.name!=''">{{sel.taxId.name}} <b class="cursor" @click="sel.taxId={name:'',id:''}">X</b></span>
                <span class="inline-block box-sizing" v-show="sel.tradeId.name!=''">{{sel.tradeId.name}} <b class="cursor" @click="sel.tradeId={name:'',id:''}">X</b></span>
              </div>
            </div>
          </div>
          <!--<div><span v-for="item in sel"  @click="remove(sel,item)" class="cursor" style="margin-right: 1rem">{{item}}</span></div>-->
          <div>
            <div class="home-model-header">
              <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>专家</div>
              <div class="inline-block">为您筛选到以下专家信息</div>
            </div>
            <div class="wdk-list-group box-sizing">
              <div class="expert-list box-sizing cursor" v-for="item in expert_list" @click="$router.push({name:'expertHomepage',query:{phone:item.phoneNumber}})">
                <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
                <div class="inline-block">
                  <div class="user-expert">
                    <span class="inline-block expert-name">{{item.userName}}</span>
                    <span class="inline-block expert-duty">{{item.province}}-{{item.levelName}}</span>
                  </div>
                  <div class="expert-position">
                    <img src="../../../static/img/expert-bs.png" alt="">
                    <span class="orange">{{item.counselorDuty}}</span>
                  </div>
                  <div class="expert-company">{{item.companyName}}</div>
                  <div class="expert-good">擅长领域：{{item.adept}}</div>
                </div>
                <div class="look-expert cursor">查看</div>
              </div>
            </div>
            <div class="no-msg-img" v-show="expert_list==''">
              <img src="../../../static/img/no-expert.png" alt="">
              <div>暂无匹配的专家～</div>
            </div>
          </div>
          <div class="load-more"  v-if="expert_list.length==end">
            <span class="inline-block gray-line"></span>
            <span class="inline-block load-more-btn" @click="load_more()">点击加载更多</span>
            <span class="inline-block gray-line"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from '@/components/swiper'
  import headerTab from "@/components/headerTab"
    export default {
      name: "export",
      components: {
        Swiper,
        headerTab
      },
      data(){
        return{
          //行业
          hy:[],
          //税种
          sz:[],
          //主题
          zt:[],
          sel:{
            province:'',
            city:'',
            topicId:{
              name:'',
              id:''
            },
            taxId:{
              name:'',
              id:''
            },
            tradeId:{
              name:'',
              id:''
            },
          },//选中的类
          city_list:[],//选中省份的城市,
          expert_list:[],//专家列表
          start:1,
          end:5,
          num:1,
        }
      },
      mounted(){
        var that=this;
        //行业,税种,专题
        this.ajax_nodata(this.http_url.url+'/category/tree',this.get_tree);
        //专家列表
        this.ajax(this.http_url.url+"/counselor/coun/list",{
          "sinceId":this.start,
          "maxId":this.end,
          "province":this.sel.province,
          "city":this.sel.city,
          "topicId":this.sel.topicId.id,
          "taxId":this.sel.taxId.id,
          "tradeId":this.sel.tradeId.id
        },function(data){
          that.expert_list=data.data;
        })
      },
      methods:{
        //行业,税种,专题
        get_tree:function(data){
          // console.log(data);
          var categorys=data.categorys;
          this.hy=this.get_category(categorys,"行业");
          this.sz=this.get_category(categorys,"税种");
          this.zt=this.get_category(categorys,"专题");
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
        //省份点击
        province_click:function(val){
          this.city_list=val.sub;
        },
        //点击加载更多
        load_more:function(){
          var that=this;
          this.num+=1;
          this.start=((this.num-1)*5)+1;
          this.end=this.num*5;
          this.ajax(this.http_url.url+'/counselor/coun/list',{
            "sinceId":this.start,
            "maxId":this.end,
            "province":this.sel.province,
            "city":this.sel.city,
            "topicId":this.sel.topicId.id,
            "taxId":this.sel.taxId.id,
            "tradeId":this.sel.tradeId.id
          },function(data){
            var data=data.data;
            if(data!=""&&data!=null){
              for(var i=0;i<data.length;i++){
                that.expert_list.push(data[i]);
              }
            }else{
              $(".load-more").hide();
            }
          });
        }
      },
      watch:{
        sel:{//深度监听，可监听到对象、数组的变化
          handler(val, oldVal){
            this.start=1;
            this.end=5;
            this.num=1;
            var that=this;
            //专家列表
            this.ajax(this.http_url.url+"/counselor/coun/list",{
              "sinceId":this.start,
              "maxId":this.end,
              "province":this.sel.province,
              "city":this.sel.city,
              "topicId":this.sel.topicId.id,
              "taxId":this.sel.taxId.id,
              "tradeId":this.sel.tradeId.id
            },function(data){
              that.expert_list=data.data;
            })
          },
          deep:true
        }
      }
    }
</script>

<style scoped>
  .look-expert:hover{
    color:#fff;
    background:#4872ED;
  }
  .look-expert{
    width:5.94rem;
    height:2.3rem;
    line-height: 2.3rem;
    text-align: center;
    color:#4872ED;
    font-size: 1rem;
    border:1px solid rgba(72,114,237,0.3);
    border-radius:2px;
    float: right;
    margin-top: 2.38rem;
  }
  .expert-good{
    color:#999;
    font-size: 1rem;
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
    width:11.25rem;
    height:11.25rem;
    margin-right: 1.94rem;
    vertical-align: top;
  }
  .expert-list{
    height:15rem;
    border:1px solid rgba(238,238,238,1);
    border-radius:6px;
    margin-top: 2rem;
    padding:2rem 3rem;
  }
  .sel-show span{
    border:1px solid rgba(247,86,94,0.3);
    color:#F7565E;
    border-radius:4px;
    height:2rem;
    vertical-align: middle;
    text-align: center;
    padding:0.56rem;
    margin-right: 0.68rem;
  }
  .city-list{
    margin-right: 0.875rem;
  }
  .city-show>div{
    background: #EEEEEE;
    padding:0 1.5rem 1rem 1.5rem;
  }
  .city-show>img{
    width: 100%;
    height:1.25rem;
    position: absolute;
    top:-1.25rem;
  }
  .city-show{
    position: relative;
    width:100%;
    margin-top: 1.25rem;
  }
  .sel-show>div:nth-child(1){
    height:2rem;
    line-height: 2rem;
    vertical-align: middle;
  }
  .sel-show{
    height:4rem;
    /*line-height: 4rem;*/
    vertical-align: middle;
    font-size: 0.88rem;
    padding-left:2.44rem ;
    padding-top: 1rem;
  }
  .wdk-select-group>ul{
    background: #F6F6F6;
    padding:2.19rem 2.44rem 1rem 2.44rem;
  }
  .wdk-select-group{
    margin-top: 1.0625rem;
    color:#666;
    font-size: 0.875rem;
    border:1px solid rgba(229,229,229,1);
  }
  .wdk-select-msg{
    color:#333;
    width: 93%;
    vertical-align: top;
    line-height: 1.81rem;
  }
  .home-main{
    margin-bottom: 5rem;
  }
  .wdk-select-name{
    margin-right: 0.6rem;
    vertical-align: top;
    line-height: 1.81rem;
  }
  .wdk-select-group li{
    margin-bottom: 1rem;
  }
  .wdk-select-msg>div{
    margin-right: 0.875rem;
  }
  .wdk-select-msg-div:hover,.city-list:hover{
    color:#2D86FD;
  }
</style>
