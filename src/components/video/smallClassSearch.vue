<template>
  <div class="home-body">
    <div class="container" v-if="nomsg">
      <div class="sm-class-video box-sizing">
        <div class="inline-block"v-for="(item,index) in video_list">
          <img :src="cover_src+item.image" alt="" @click="video_click(item)">
          <div>{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="no-msg" v-else>暂无相关内容</div>
    <div id="page" class="paging" v-show="nomsg"></div>
  </div>
</template>

<script>
    export default {
        name: "small-class",
      data () {
        return{
          nomsg:false,//判断有无数据，对应显示div
          video_list:[], //微课封面列表
          sinceId:1,//当前页开始条数
          maxId:15,//当前页结束条数
          type:0,//微课类型
          total:1,//分页页数
          title:null, //搜索框输入的条件
          page_size:15,//每页15条
          vid:null
        }
      },
      mounted () {
        var that=this
        this.title=this.$route.query.msg
        //微课视频列表
        var query={sinceId:this.sinceId,maxId:this.maxId,type:this.type,title:this.title}
        this.ajax(this.http_url.url+'video/search',query,this.get_video);
        //搜索视频按钮点击事件
        $("body").on("click",".header-search-answer",function(e){
          this.title=$(".search-input-header>input").val()
          query.title=this.title
          that.ajax(that.http_url.url+'video/search',query,that.get_video);
        });
      },
        methods:{
          //视频点击
          video_click:function(data){
            var that=this
            this.ajax(this.http_url.url+'video/vid',{id:data.id},function (e) {
              that.vid=e.data.vid
              if(data.ifBuy==1||data.price==0){
                that.$router.push({name:'video',query:{vid:that.vid}})
              }else{
                data={videoId:data.id,source:2,money:data.price,url:'video'}
                data=encodeURIComponent(JSON.stringify(data))
                that.$router.push({ name: 'payMethod',query: {price: data.money ,source:"微课",data:data,}})
              }
            })
          },
          get_video:function (data) {
            this.get_video_list(data)
            this.go_page()
          },
          //获取视频封面列表
          get_video_list:function (data) {
            var data_list=data.videos;
            this.total=Math.ceil(data.count/this.maxId)
            if(data_list.length!=0){
              this.nomsg=true
            }else{
              this.nomsg=false
            }
            for(var i=0;i<data_list.length;i++){
              if(data_list[i].title.length>40){
                data_list[i].title=data_list[i].title.substr(0,35)+"...";
              }
            }
            this.video_list=data_list;
          },
          //分页
          go_page:function () {
            var that=this
            //分页插件初始化
            $("#page").paging({
                total: this.total,
                numberPage: 1
              },
              function(msg) {
                //回调函数 msg为选中页码
                this.sinceId=parseInt(that.page_size*(msg-1)+1)
                this.maxId=parseInt(this.sinceId+that.page_size-1)
                var query={sinceId:this.sinceId,maxId:this.maxId,type:that.type}
                that.ajax(that.http_url.url+'video/search',query,that.get_video_list);
              });
          },
        }
    }
</script>

<style scoped>
  .sm-banner img{
    width: 100%;
  }
  .sm-class-video{
    width: 85%;
    margin: 0 auto;
  }
  .sm-class-video>div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #666;
    font-size: 0.875rem;
    width: 31%;
    margin-right: 2%;
    padding: 0.5rem;
    vertical-align: top;
  }
  .sm-class-video>div>img{
    width:100%;
    height:9.4rem;
    margin-bottom: 1rem;
  }
  #page{
    margin: 50px 0;
  }
</style>
