<template>
  <div>
    <headerTab msg="问答库"></headerTab>
    <router-view></router-view>
  </div>

</template>

<script>
  import headerTab from "@/components/headerTab"
    export default {
        name: "ask",
        components:{
          headerTab
        }
    }
</script>

<style scoped>

</style>
