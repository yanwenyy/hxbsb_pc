<template>
  <div class="main">
    <Header></Header>
      <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/header'
  import Footer from '@/components/footer'
    export default {
        name: "main",
        components:{
          Header,
          Footer
        },

    }
</script>

<style scoped>


</style>
