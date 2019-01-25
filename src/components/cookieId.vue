<template>
  <div></div>
</template>

<script>
    export default {
        name: "cookie-id",
        mounted(){
          var that=this;
          $.ajax({
            type:"POST",
            url:this.http_url.url+"/wx/user/aision",
            dataType: "json",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json;charset=utf-8",
              "version":"1"
            },
            data:JSON.stringify({
              "code":'pc',
              "source":this.getUrlParms("source"),
              "data":this.getUrlParms("data")
            }),
            success:function(data){
              console.log(data);
              if(data.code==1){
                console.log(111);
                //that.$router.push({name:"Home"});
                sessionStorage.setItem("cookieId",data.data);
                if(sessionStorage.getItem("cookieId")){
                  that.$router.push({name:"askQuestion"});
                }
                console.log(sessionStorage.getItem("cookieId"));
              }else{
                alert(data.des);
              }
            },
            error:function(){
              console.log("程序出错,请重试");
            }
          })
        }
    }
</script>

<style scoped>

</style>
