<template>
  <div>
    <headerTab msg=""></headerTab>
    <router-view></router-view>
  </div>
</template>

<script>
  import headerTab from "@/components/headerTab"
    export default {
        name: "mine",
        components:{
          headerTab
        }
    }
</script>

<style scoped>

</style>
