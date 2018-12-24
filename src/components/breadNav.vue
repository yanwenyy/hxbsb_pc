<template>
    <div class="breadNav">
      当前位置：{{breadName}}
    </div>
  </template>
<script>
    export default {

      name: "bread-nav",
      props: {
        breadName: String,
        required: true
      },
      methods: {}
    }
</script>

<style scoped>
  .breadNav{
    color:#999;
    background: #F8F8F8;
    width: 100%;
    line-height: 2rem;
    font-size: 0.875rem;
    padding-left: 0.7rem;
    margin: 1rem 0 1.1rem 0;
  }
</style>
