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
          <div class="invoice-notice">发票记录（消费达到100元可以申请开发票）<span class="cursor blue" @click="$router.push({name:'mineInvoiceMsg'})">【编辑发票信息】</span></div>
          <!--<div class="mine-invoice">-->
            <!--<img src="../../../static/img/kfp-bg.png" alt="">-->
          <!--</div>-->
          <table class="mine-ques-table box-sizing" v-if="purchaseOrders!=''">
            <tr>
              <td width="25">消费内容</td>
              <td width="25">消费金额</td>
              <td width="20">消费时间</td>
              <td width="20">操作</td>
            </tr>
            <tr class="mine-ques-tr box-sizing"  v-for="item in purchaseOrders">
              <td>{{item.productType}}</td>
              <td>{{item.currentPrice}}</td>
              <td>{{format(item.paymentDate)}}</td>
              <td>
                <span class="cursor blue" v-if="item.invoiceStatus==-1" @click="$router.push({name:'mineInvoiceEdit',query:{'msg':item}})">开发票</span>
                <span v-show="item.invoiceStatus!=-1&&item.invoiceStatus!=0">已开发票</span>
                <span v-if="item.invoiceStatus==0">开发票中</span>
              </td>
            </tr>
          </table>
          <div class="no-msg-img" v-show="purchaseOrders==''">
            <img src="../../../static/img/answer-nomsg.png" alt="">
            <div>您还没有发票记录～</div>
          </div>
          <div id="page" class="paging"></div>
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
        data(){
          return{
            start:1,
            end:10,
            purchaseOrders:[],//发票列表
          }
        },
        mounted(){
          var that=this;
          this.ajax_nodata(this.http_url.url+'/pay/isInvoice',function(data){
            // console.log(data);
            if(data.code==4){
              that.$router.push({name:'mineInvoiceMsg'});
            }
          });
          this.ajax(this.http_url.url+"/pay/purchaseOrder",{
            "sinceId":this.start,
            "maxId":this.end},function(data){
            // console.log(data);
            that.purchaseOrders=data.purchaseOrders;
            that.page(data.count/10)
          });
        },
        methods:{
          //分页
          page:function(data){
            var that=this;
            $("#page").paging({
                total: data,
                numberPage: 1
              },
              function(msg) {
                //回调函数 msg为选中页码
                // tab(msg);
                that.start=((msg-1)*10)+1;
                that.end=msg*10;
                that.ajax(that.http_url.url+"/pay/purchaseOrder",{
                  "sinceId":that.start,
                  "maxId":that.end,
                },that.page_msg)
              });
          },
          //分页回调
          page_msg:function(data){
            this.purchaseOrders=data.purchaseOrders;
          },
        }
    }
</script>

<style scoped>
.mine-invoice{
  padding:8.375rem 5.69rem;
}
  .invoice-notice{
    font-size: 0.88rem;
  }
</style>
