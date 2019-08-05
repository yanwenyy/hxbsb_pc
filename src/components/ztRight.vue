<template>
    <div>
      <div class="home-model-header">
        <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>本期热门专题:{{zt_name}}</div>
      </div>
      <div>
        <div class="wdk-list" v-for="item in zt">
          <div class="inline-block" @click="list(item.status,item.uuid)">
            <div class="wdk-name">
              <img :src="head_src+item.headImage" alt=""  onerror="javascript:this.src='./static/img/user-img.png';">
              <div class="inline-block user_name">{{get_name(item)}}</div>
              <div class="inline-block user-dj"><img :src="get_score(item.integralScore,item.aision,item.vip)" alt=""></div>
              <div class="home-list-msg-group">
                <div class="inline-block home-list-msg">{{item.content}}</div>
              </div>
              <div class="label box-sizing">
                <div class="inline-block">{{format(item.date)}}</div>
                <div class="inline-block">
                  <div class="see-num inline-block">
                    <!--<img class="home-zan" :src="zan==1? '../../static/img/zan1.png':'../../static/img/zan2.png'" alt="" :data-code="zan" v-on:click="zan_click(zan)" >-->
                    点赞
                    {{item.approveNum}}
                  </div>
                  <div class="see-num inline-block">
                    <!--<img class="home-cai" src="../../static/img/eye.png" alt="">-->
                    围观
                    {{item.lookNum}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "zt-right",
        data () {
            return{
            //专题name
              zt_name:"",
              //主题类型
              zt_topic:"",
              zt:[]
            }
        },
        mounted () {
          //专题
          this.ajax_nodata(this.http_url.url+'/load/getconfig/message',this.get_set);
        },
        methods:{
          //专题
          get_zt:function(data){
            // console.log(data);
            var data=data.data;
            if(data!=''&&data!=null){
              for(var i=0;i<data.length;i++){
                if(data[i].content.length>40){
                  data[i].content=data[i].content.substr(0,40)+"...";
                }
              }
              this.zt=data;
            }
          },
          //配置
          get_set:function(data){
            var that=this;
            // console.log(data);
            this.zt_name=data.columnRecom.description;
            this.zt_topic=data.columnRecom.name;
            that.ajax(this.http_url.url+'/onlook/serarch',{
              "sinceId":1,
              "maxId":5,
              "type":this.zt_topic,
              "typeContent":this.zt_name
            },that.get_zt);
          },
          //list点击
          list(status,id){
            // item.status==1? $router.push({ name: 'answerWacthDetail',query:{'uuid':item.uuid}}): $router.push({ name: 'answerWacth',query: {'url':'answerWacthDetail','uuid':item.uuid,'money':1}})
            if(status==1){
              this.$router.push({ name: 'answerWacthDetail',query:{'uuid':id}});
              this.$emit('zt_method2', id);
            }else{
              this.$router.push({ name: 'answerWacth',query: {'url':'answerWacthDetail','uuid':id,'money':1}});
              this.$emit('zt_method', {'url':'answerWacthDetail','uuid':id,'money':1});
            }

          }
        }
    }
</script>

<style scoped>
  .wdk-name>img{
    margin-right: 4px;
  }
  .user_name{
    font-size: 0.81rem;
  }
  .home-list-msg{
    font-size: 0.875rem;
    line-height:  1.2rem;
  }
  .wdk-name>div:nth-child(5){
    font-size: 0.75rem;
  }
  .see-num{
    margin-left: 0.5rem;
  }
  .home-head-title{
    font-size: 1rem;
  }
  .wdk-name>div:nth-child(5){
    margin: 0.2rem 0;
  }
  .home-list-msg-group{
    margin-top: 0.3rem;
    line-height: 1.25rem;
  }
</style>
