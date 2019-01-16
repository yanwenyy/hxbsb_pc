<template>
  <div>
    <headerTab msg="私密问"></headerTab>
    <div class="container private_ques box-sizing">
      <img src="../../../static/img/need-downloadapp.png" alt="">
    </div>
  </div>
</template>

<script>
  import headerTab from "@/components/headerTab"
    export default {
        name: "private-question",
        components:{
          headerTab
        },
    }
</script>

<style scoped>
  .private_ques{
    padding:7rem 0;
    height:80vh;
  }
</style>
