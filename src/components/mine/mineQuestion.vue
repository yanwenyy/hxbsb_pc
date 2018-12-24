<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的提问"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的提问</div>
        </div>
        <div class="mine-right-body">
          <div class="search-group">
            <input type="text" placeholder="请输入提问内容" class="mine-ques-input">
            <div class="search-condition">
              <div class="inline-block">
                <span>状态:</span>
                <select name="" id="" class="box-sizing">
                  <option value="未采纳">未采纳</option>
                  <option value="已采纳">已采纳</option>
                </select>
              </div>
              <div class="inline-block">
                <span>提问日期:</span>
                <input type="date" class="box-sizing">
                <span class="inline-block gray-line"></span>
                <input type="date" class="box-sizing">
              </div>
              <div class="inline-block">
                <span class="blue">搜索</span>
              </div>
            </div>
            <table class="mine-ques-table box-sizing">
              <tr>
                <td width="65">提问内容</td>
                <td width="15">提问日期</td>
                <td width="10">状态</td>
                <td width="10">操作</td>
              </tr>
              <tr class="mine-ques-tr box-sizing">
                <td>汇算清缴预付卡的费用取得的发票是否可以在企业所得税前扣除？汇款的 清缴卡的费用取得的发票是否可以在企业所得税前扣除？汇款的..</td>
                <td>2018-10-21  13:00</td>
                <td>已采纳 </td>
                <td><img src="../../../static/img/table-look.png" alt=""><span class="blue">查看</span></td>
              </tr>
              <tr class="mine-ques-tr box-sizing">
                <td>汇算清缴预付卡的费用取得的发票是否可以在企业所得税前扣除？汇款的 清缴卡的费用取得的发票是否可以在企业所得税前扣除？汇款的..</td>
                <td>2018-10-21  13:00</td>
                <td>已采纳 </td>
                <td><img src="../../../static/img/table-look.png" alt=""><span class="blue">查看</span></td>
              </tr>
              <tr class="mine-ques-tr box-sizing">
                <td>汇算清缴预付卡的费用取得的发票是否可以在企业所得税前扣除？汇款的 清缴卡的费用取得的发票是否可以在企业所得税前扣除？汇款的..</td>
                <td>2018-10-21  13:00</td>
                <td>已采纳 </td>
                <td><img src="../../../static/img/table-look.png" alt=""><span class="blue">查看</span></td>
              </tr>
              <tr class="mine-ques-tr box-sizing">
                <td>汇算清缴预付卡的费用取得的发票是否可以在企业所得税前扣除？汇款的 清缴卡的费用取得的发票是否可以在企业所得税前扣除？汇款的..</td>
                <td>2018-10-21  13:00</td>
                <td>已采纳 </td>
                <td><img src="../../../static/img/table-look.png" alt=""><span class="blue">查看</span></td>
              </tr>
            </table>
          </div>
        </div>
        <div id="page" class="paging"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import mineLeft from '@/components/mineLeft'
    export default {
        name: "mine-question",
        components:{
          mineLeft
        },
      mounted(){
        //分页插件初始化
        $("#page").paging({
            total: 20,
            numberPage: 1
          },
          function(msg) {
            //回调函数 msg为选中页码
            // tab(msg);
          });
      },
    }
</script>

<style scoped>
  .search-condition>div input,.search-condition>div select{
    width:8rem;
    height:2.25rem;
  }
  .search-condition{
    margin: 0.5rem;
    font-size: 0.875rem;
    color:#666666
  }
  .search-condition>div{
    margin-right: 1.44rem;
  }
 .search-condition>div span{
   vertical-align: middle;
 }
  .mine-ques-input{
    width:70%;
    height:2rem;
    background: #F6F6F6;
    color:#999;
    font-size: 0.875rem;
    padding-left: 1rem;
    border: none;
    margin: 0.5rem;
  }
</style>
