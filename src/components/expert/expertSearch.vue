<template>
  <div>
    <headerTab msg="专家"></headerTab>
    <div class="container">
      <div class="expert-search-title">搜索结果</div>
      <div class="home-main box-sizing">
        <div class="h-main-left inline-block">
          <div class="wdk-list-group box-sizing">
            <div class="expert-list box-sizing" v-for="item in expert_list">
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
              <div class="inline-block look-expert cursor" @click="$router.push({name:'expertHomepage',query:{phone:item.phoneNumber}})">查看</div>
            </div>
          </div>
          <div class="no-msg-img" v-show="expert_list==''">
            <img src="../../../static/img/no-expert.png" alt="">
            <div>暂无匹配的专家～</div>
          </div>
        </div>
        <div class="h-main-right inline-block box-sizing">
          <div class="expert-recommend-title">
            <div class="inline-block">专家推荐</div>
            <div class="inline-block cursor" @click="change()">换一批</div>
          </div>
          <div>
            <div class="expert-recommend-list box-sizing cursor"  v-for="item in recommend_list"  @click="$router.push({name:'expertHomepage',query:{phone:item.phoneNumber}})">
              <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
              <div class="inline-block">
                <div class="recommend-name">
                  <span>{{item.userName}}</span>
                  <span>{{item.levelName}}</span>
                </div>
                <div class="recommend-good">擅长：{{item.adept}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="load-more"  v-if="expert_list.length==end">
      <span class="inline-block gray-line"></span>
      <span class="inline-block load-more-btn" @click="load_more()">点击加载更多</span>
      <span class="inline-block gray-line"></span>
    </div>
  </div>
</template>

<script>
  import headerTab from "@/components/headerTab"
    export default {
      name: "expert-search",
      components: {
        headerTab
      },
      data(){
        return{
          expert_list:[],//专家列表
          start:1,
          end:5,
          num:1,
          rstart:1,
          rend:5,
          rnum:1,
          recommend_list:[],//专家推荐s
        }
      },
      mounted(){
        var that=this;
        //专家搜索列表
        this.ajax(this.http_url.url+"/counselor/coun/list",{
          "sinceId":this.start,
          "maxId":this.end,
          "content":this.$route.query.msg
        },function(data){
          that.expert_list=data.data;
        });
        //专家推荐
        this.ajax(this.http_url.url+"/counselor/coun/list",{
          "sinceId":this.rstart,
          "maxId":this.rend,
        },function(data){
          that.recommend_list=data.data;
        });
        //搜索答案按钮点击
        $("body").on("click",".header-search-answer",function(){
          that.list=[];
          var msg=$(".search-input-header>input").val();
          that.ajax(that.http_url.url+'/counselor/coun/list',{
            "sinceId":this.start,
            "maxId":this.end,
            "content":msg,
          },function(data){
            that.expert_list=data.data;
          });
        });
      },
      methods:{
        //点击加载更多
        load_more:function(){
          var that=this;
          this.num+=1;
          this.start=((this.num-1)*5)+1;
          this.end=this.num*5;
          this.ajax(this.http_url.url+'/counselor/coun/list',{
            "sinceId":this.start,
            "maxId":this.end,
            "content":this.$route.query.msg
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
        },
        //换一批推荐
        change:function(){
          var that=this;
          this.rnum+=1;
          this.rstart=((this.rnum-1)*5)+1;
          this.rend=this.rnum*5;
          this.ajax(this.http_url.url+'/counselor/coun/list',{
            "sinceId":this.rstart,
            "maxId":this.rend,
          },function(data){
            that.recommend_list=data.data;
          });
        }
      }
    }
</script>

<style scoped>
  .recommend-good{
    font-size:0.75rem;
    line-height:1.25rem;
    color:#666;
    margin: 0.75rem 0 1.19rem 0;
  }
  .recommend-name>span:nth-child(1){
    font-size: 1rem;
    color:#333;
  }
  .recommend-name{
    font-size: 0.75rem;
    color:#999;
  }
  .expert-recommend-list>div{
    border-bottom: 1px solid #eee;
    width:69%;
  }
  .expert-recommend-list>img{
    width:2.75rem;
    height:2.75rem;
    border-radius: 50%;
    vertical-align: top;
    margin-right: 0.88rem;
  }
  .expert-recommend-list{
    min-height:6.75rem;
    height: auto;
    background: #F6F6F6;
    padding:1.5rem 2rem 0 2rem;
  }
  .h-main-right{
    padding-left: 0;
  }
  .expert-recommend-title{
    height:3.69rem;
    line-height: 3.69rem;
    padding:0 1.5rem;
    background: #F1F1F1;
    font-size: 0.88rem;
    color:#999;
    display: flex;
    justify-content: space-between;
  }
  .expert-recommend-title>div:nth-child(1){
    color:#1A1A1A;
    font-size: 1.25rem;
  }
  .look-expert:hover{
    background: #4872ED;
    color:#fff;
  }
  .look-expert{
    width:5.94rem;
    height:2.3rem;
    line-height: 2.3rem;
    text-align: center;
    position: absolute;
    top:3.18rem;
    right:1.31rem;
    background:rgba(255,255,255,1);
    border:1px solid rgba(72,114,237,0.3);
    border-radius:2px;
    color:#4872ED;
    font-size: 1rem;
  }
  .expert-search-title{
    color:#1A1A1A;
    font-size: 1.5rem;
    margin-top: 2.81rem;
    margin-bottom: 1.5rem;
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
    position: relative;
  }
</style>
