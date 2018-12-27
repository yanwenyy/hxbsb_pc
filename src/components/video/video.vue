<template>
    <div id="cont">

    </div>
</template>
<script>
  import {creatH} from "../../../static/js/get_video"
    export default {
      name: "test",
      mounted () {
        creatH(this.$route.query.vid);
        // alert(this.http_url.url);
        // alert(this.$route.query.name);
      }
    }

</script>

<style scoped>
  @import '../../../static/css/main.css';
  #cont{
    width:100%;
    height:400px;
  }
  #cont div{
    width:100%;
    height:100%;
  }
</style>
