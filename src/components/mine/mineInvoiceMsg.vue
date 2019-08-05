<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="开具发票"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>发票信息</div>
        </div>
        <div class="mine-right-body">
          <div class="mine-data-body box-sizing">
            <ul>
              <li>
                <span class="inline-block">
                  发票类型：
                </span>
                <div class="inline-block">
                  {{invoice.taxType}}
                </div>
              </li>
              <li>
                <span class="inline-block">
                  <span class="orange">*</span>公司抬头：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入公司抬头" v-model="invoice.companyName">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  <span class="orange">*</span>公司税号：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入公司税号" v-model="invoice.taxNum">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  <span class="orange">*</span>开票人手机号码：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入开票人手机号码" v-model="invoice.receiverPhoneNum">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  <span class="orange">*</span>邮箱：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入邮箱" v-model="invoice.email">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  银行账号：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入银行账号" v-model="invoice.accountNumber">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  开户银行：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入开户银行" v-model="invoice.accountBank">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  公司电话：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入公司电话" v-model="invoice.companyTell">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  公司地址：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入公司地址" v-model="invoice.companyAddress">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  收件人：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入收件人" v-model="invoice.receiverName">
                </div>
              </li>
              <li>
                <span class="inline-block">
                  邮寄地址：
                </span>
                <div class="inline-block">
                  <input type="text" placeholder="请输入邮寄地址" v-model="invoice.address">
                </div>
              </li>
            </ul>
          </div>
          <div class="msg-sub-btn">
            <div class="inline-block msg-sub-btn-succ cursor" @click="sub()">提交</div>
            <div class="inline-block msg-sub-btn-back cursor" @click="$router.push({name:'mineInvoice'})">返回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
        name: "mine-invoice-msg",
        components:{
          mineLeft
        },
        data(){
          return{
            invoice:{//发票信息
              taxType:'增值税电子普通发票',//发票类型
              companyName:'',//公司抬头
              taxNum:'',//税号
              receiverPhoneNum:'',//收件人手机号
              email:'',//邮箱
              accountNumber:'',//银行账号
              accountBank:'',//开户银行
              companyTell:'',//公司电话
              companyAddress:'',//公司地址
              receiverName:'',//收件人
              address:'',//邮寄地址
            },
          }
        },
        mounted(){
          var that=this;
          this.ajax_nodata(this.http_url.url+"/pay/editInvoice",function(data){
            console.log(data);
            if(data.invoice){
              that.invoice=data.invoice;
            }
          })
        },
        methods:{
          //提交发票信息接口
          sub:function(){
            var that=this;
            if(this.invoice.companyName==''||this.invoice.taxNum==''||this.invoice.receiverPhoneNum==''||this.invoice.email==''){
              this.$myToast.error("必填项不能为空")
            }else{
              this.ajax(this.http_url.url+"/pay/addInvoice",{
                "companyName":this.invoice.companyName,
                "receiverName":this.invoice.receiverName,
                "receiverPhoneNum":this.invoice.receiverPhoneNum,
                "address":this.invoice.address,
                "taxNum":this.invoice.taxNum,
                "taxType":this.invoice.taxType||'增值税电子普通发票',
                "accountBank":this.invoice.accountBank,
                "accountNumber":this.invoice.accountNumber,
                "companyTell":this.invoice.companyTell,
                "companyAddress":this.invoice.companyAddress,
                "email":this.invoice.email,
              },function(data){
                console.log(data);
                if(data.code==1){
                  that.$myToast.success("提交成功");
                  that.$router.push({name:'mineInvoice'});
                }else{
                  that.$myToast.error(data.des);
                }
              })
            }
          }
        }
    }
</script>

<style scoped>
  .mine-data-body{
    padding: 1.5rem 0;
  }
  .mine-data-body>ul>li{
    font-size: 0.75rem;
    color: #333;
    margin-bottom: 1rem;
  }
  .mine-data-body li>span{
    width: 15%;
    text-align: right;
  }
  .mine-data-body li input{
    width: 12.31rem;
    height: 2.25rem;
    padding-left: 0.625rem;
    border: 1px solid rgba(221,221,221,1);
    border-radius: 2px;
    outline: #BCD5FF;
  }
  .msg-sub-btn{
    margin-left: 4rem;
  }
  .msg-sub-btn>div{
    width: 6.25rem;
    height: 2.25rem;
    line-height: 2.25rem;
    text-align: center;
    border-radius: 2px;
    font-size: 0.75rem;
    margin-right: 2rem;
    color:#fff;
  }
  .msg-sub-btn-succ{
    background: #2D86FD;
  }
  .msg-sub-btn-back{
    background: #ddd;
  }
</style>
