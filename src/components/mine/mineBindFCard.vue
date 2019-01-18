<template>
    <div class="mine-body box-sizing">
      <div class="container">
        <div class="mine-left inline-block box-sizing">
          <mineLeft msg="财税问答卡"></mineLeft>
        </div>
        <div class="mine-right inline-block box-sizing">
          <div class="home-model-header">
            <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>绑定财税问答卡</div>
          </div>
          <div class="mine-right-body">
            <ul class="mine-edit-password-ul">
              <li>
                <span class="inline-block">卡号:</span>
                <input v-model="cardNumber" type="number" placeholder="请输入卡号" class="box-sizing">
              </li>
              <li>
                <span class="inline-block">兑换码:</span>
                <input v-model="cardPass" type="password" placeholder="请输入兑换码" class="box-sizing">
              </li>
              <li>
                <span class="inline-block"></span>
                <div class="sub-password inline-block cursor" @click="sub()">绑  定</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
        name: "mine-bind-f-card",
        components:{
          mineLeft
        },
        data(){
            return{
              cardNumber:'',
              cardPass:''
            }
        },
        mounted(){

        },
        methods:{
          //提交
          sub:function(){
            var that=this;
            if(this.cardNumber==""||this.cardPass==""){
              alert("请完善信息")
            }else{
              this.ajax(this.http_url.url+"/bindingQACard",{
                "id":this.cardNumber,
                "securityCode":this.cardPass
              },function(data){
                if(data.code==1){
                  that.$router.push({
                    name:'mineFinanceCard'
                  })
                }else{
                  alert(data.des);
                }
              })
            }
          }
        }
    }
</script>

<style scoped>
  .mine-edit-password-ul{
    margin-top: 1rem;
  }
.mine-edit-password-ul>li{
  text-align: center;
  margin-bottom: 0.875rem;
  width: 80%;
}
.mine-edit-password-ul>li>span{
  width:20%;
  color:#666;
  font-weight: 400;
  font-size: 0.875rem;
  vertical-align: middle;
  text-align: right;
}
.mine-edit-password-ul>li>input{
  width:12.31rem;
  height:2.25rem;
  padding:0 0.875rem;
  border:1px solid rgba(221,221,221,1);
  border-radius: 2px;
  font-size: 0.875rem;
}
  .sub-password{
    width:12.31rem;
    height:2.25rem;
    line-height: 2.25rem;
    text-align: center;
    background: #2D86FD;
    color:#fff;
    font-size: 0.875rem;
    border-radius:2px
  }
</style>
