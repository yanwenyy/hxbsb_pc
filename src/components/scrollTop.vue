<template>
    <div class="go-top" v-if="show" @click="go_top()"></div>
</template>

<script>
    export default {
        name: "scroll-top",
        data () {
          return{
            show:false
          }
        },
        mounted () {
          var that=this;
          window.addEventListener('scroll',function(){
            var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
            //console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);
            if(scrollTop>800){   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部
              //滚动条到达底部
              //alert(3);
              that.show=true;
            }else if(scrollTop<800){
              //滚动条到达顶部
              that.show=false;
            }
          });
        },
      methods:{
          go_top:function(){
            window.location.href="#";
          }
      }
    }
</script>

<style scoped>

</style>
