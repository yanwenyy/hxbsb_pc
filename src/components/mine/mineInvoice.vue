<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="开具发票"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>开具发票</div>
        </div>
        <div class="mine-right-body">
          <div class="mine-invoice">
            <img src="../../../static/img/kfp-bg.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
        name: "mine-invoice",
        components:{
          mineLeft
        },
    }
</script>

<style scoped>
.mine-invoice{
  padding:8.375rem 5.69rem;
}
</style>
