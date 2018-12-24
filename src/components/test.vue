<template>
    <div id="cont">

    </div>
</template>
<script>
  import {creatH} from "../../static/js/get_video"
    export default {
      name: "test",
      mounted () {
        creatH("06B54E01D0950E8C9C33DC5901307461");
        // alert(this.http_url.url);
        // alert(this.$route.params.name);
      }
    }

</script>

<style scoped>
  @import '../../static/css/main.css';
  #cont{
    width:100%;
    height:400px;
  }
  #cont div{
    width:100%;
    height:100%;
  }
</style>
