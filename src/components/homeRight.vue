<template>
    <div>
      <!--<div class="home-zt-img">-->
        <!--<img src="../../static/img/zt_banner.jpg" alt="">-->
      <!--</div>-->
      <div class="selected-zt box-sizing">
        <div class="selected-zt-title">
          <!--<span class="span-blue-line"></span>-->
          专题类型
        </div>
        <div class="selected-zt-msg">
          <div class="inline-block box-sizing" v-for="item in jxzt" @click="jxzt_click('topic',item.name)">{{item.name}}</div>
        </div>
        <div class="selected-zt-title">
          <!--<span class="span-blue-line"></span>-->
          税种类型
        </div>
        <div class="selected-zt-msg">
          <div class="inline-block box-sizing" v-for="item in sz" @click="jxzt_click('tax',item.name)">{{item.name}}</div>
        </div>
        <div class="selected-zt-title">
          <!--<span class="span-blue-line"></span>-->
          行业类型
        </div>
        <div class="selected-zt-msg">
          <div class="inline-block box-sizing" v-for="item in hy" @click="jxzt_click('trade',item.name)">{{item.name}}</div>
        </div>
        <!--<div class="zt-look-more" @click="look_btn_click()">-->
          <!--<span>{{look_btn}}</span>-->
          <!--<img src="../../static/img/zt-xl.png" alt="">-->
        <!--</div>-->
      </div>
      <!--<div class="hx-qr-code box-sizing">-->
        <!--<div class="title-notice">想体验更多功能,请使用移动端</div>-->
        <!--<div class="qr-title">刷刷</div>-->
        <!--<div class="qr-code-img-group">-->
          <!--<div class="inline-block">-->
            <!--<img src="../../static/img/qr-weixin.png" alt="">-->
            <!--<div class="qr-code-footer">-->
              <!--<div>扫描二维码</div>-->
              <!--<div>关注微信公众号</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="inline-block">-->
            <!--<img src="../../static/img/qr-app.png" alt="">-->
            <!--<div class="qr-code-footer">-->
              <!--<div>扫描二维码</div>-->
              <!--<div>下载刷刷APP</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "home-right",
        data (){
          return{
            //精选专题
            jxzt:[],
            jxzt_all:[],
            look_btn:"查看更多",
            //税种
            sz:[],
            sz_all:[],
            //行业
            hy:[],
            hy_all:[],
          }
        },
        mounted () {
          //行业,税种,专题
          var that=this;
          function get_name(data){
            that.userName=data.realName;
          }
          this.ajax_nodata(this.http_url.url+'/category/tree',this.get_tree);
        },
        methods:{
          //精选专题
          get_tree:function(data){
            // console.log(data);
            var categorys=data.categorys;
            this.jxzt_all=this.get_category(categorys,"专题");
            this.sz_all=this.get_category(categorys,"税种");
            this.hy_all=this.get_category(categorys,"行业");
            this.jxzt=this.jxzt_all.slice(0,14);
            this.sz=this.sz_all.slice(0,16);
            this.hy=this.hy_all.slice(0,10);
          },
          //专题查看更多
          look_btn_click:function(){
            if(this.look_btn=="查看更多"){
              this.look_btn="收起";
              this.jxzt=this.jxzt_all;
            }else{
              this.look_btn="查看更多";
              this.jxzt=this.jxzt_all.slice(0,6);
            }
          },
          //精选专题点击
          jxzt_click:function(type,typeContent){
            this.$router.push({
              name:"answerSearch",
              query:{type:type,typeContent:typeContent}
            })
          }
        }

    }
</script>

<style scoped>

  .title-notice{
    text-align: center;
    margin-bottom: 0.5rem;
  }
</style>
