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
          <div class="search-group" v-if="false">
            <input type="text" placeholder="请输入提问内容" class="mine-ques-input">
            <div class="search-condition">
              <div class="inline-block">
                <span>状态:</span>
                <select name="" id="" class="box-sizing">
                  <option value="已回答">已回答</option>
                  <option value="未回答">未回答</option>
                  <option value="已采纳">已采纳</option>
                  <option value="未采纳">未采纳</option>
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
          </div>
          <table class="mine-ques-table box-sizing">
            <tr>
              <td width="65">提问内容</td>
              <td width="15">提问日期</td>
              <td width="10">状态</td>
              <td width="10">操作</td>
            </tr>
            <tr class="mine-ques-tr box-sizing" v-for="item in questions">
              <td>{{item.content}}</td>
              <td>{{format(item.time)}}</td>
              <td class="time-msg" :data-time="item.status==1? item.endDate:''" :data-status="item.status">{{cn_status(item.status)}}</td>
              <td><img src="../../../static/img/table-look.png" alt="" ><span class="blue" @click="$router.push({'name':'mineQuesDetail',query:{'uuid':item.uuid,'status':item.status}})">查看</span></td>
            </tr>
          </table>
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
          mineLeft,
        },
      data(){
          return{
            start:'1',
            end:'10',
            //提问列表
            questions:[],
            no_msg:true
          }
      },
      mounted(){
          var that=this;
          //我的提问列表
        this.ajax(this.http_url.url+"/question/admireList",{
          "sinceId":this.start,"maxId":this.end
        },this.get_list);
        // setInterval(function(){
        //   $(".time-msg").each(function(){
        //     var t=$(this);
        //     if(t.attr("data-time")){
        //       t.html(that.get_djs(t.attr("data-time")));
        //     }
        //   })
        // },1000);
      },
      methods:{
          //我的提问列表
        get_list:function(data){
          var that=this;
          console.log(data);
          this.questions=data.questions;
          //分页插件初始化
          $("#page").paging({
              total: data.count/10,
              numberPage: 1,
            },
            function(msg) {
              //回调函数 msg为选中页码
              // tab(msg);
              if(that.no_msg){
                that.start=((msg-1)*10)+1;
                that.end=msg*10;
                that.ajax(that.http_url.url+"/question/admireList",{
                  "sinceId":that.start,"maxId":that.end
                },that.page_msg)
              }
            });
          setInterval(function(){
            $(".time-msg").each(function(){
              var t=$(this);
              if(t.attr("data-time")){
                t.html(that.get_djs(t.attr("data-time")));
              }else{
                t.html(that.cn_status(t.attr("data-status")));
              }
            })
          },1000);
        },
        //采纳倒计时
        get_djs:function(endTime){
            //取设定的活动结束时间距1970年1月1日之间的毫秒数
            var time_string="";
            var end=endTime;
        //取当前时间距1970年1月1日之间的毫秒数
            var nowTime=new Date().getTime();
        //结束时间与当前时间之间的毫秒差
            var difference=Number(end-nowTime);
            // console.log(nowTime);
            if (difference>0) {
        //将毫秒差换算成天数
              var days=Math.floor(difference/86400000);
              difference=difference-days*86400000;
        //换算成小时
              var hours=Math.floor(difference/3600000);
              difference=difference-hours*3600000;
        //换算成分钟
              var minutes=Math.floor(difference/60000);
              difference=difference-minutes*60000;
        //换算成秒数
              var seconds=Math.floor(difference/1000);
        //不足10时，进行补零操作
              if(hours<10){
                hours="0"+hours;
              }
              if(minutes<10){
                minutes="0"+minutes;
              }
              if(seconds<10){
                seconds="0"+seconds;
              }
              // $(".tis1").html(days);
              // $(".tis3").html(hours);
              // $(".tis5").html(minutes);
              // $(".tis7").html(seconds);
              time_string="倒计时: "+hours+":"+minutes+":"+seconds;
            } else {
        //设定若是过了设置的活动结束时间，全部写成0天0时0分0秒
        //                 $(".tis1").html(0);
        //                 $(".tis3").html(0);
        //                 $(".tis5").html(0);
        //                 $(".tis7").html(0);
              time_string="未采纳";
            }
            return time_string;
          },
        //采纳状态
        cn_status:function(val){
          var sstatus='';
          if(val==1){
            status="未采纳";
          }if(val==2){
            status="未采纳";
          }else if(val==3){
            status="已采纳";
          }else if(val==4){
            status="已采纳";
          }else if(val==5){
            status="已过期";
          }else if(val==6){
            status="已退款";
          }else if(val==7){
            status="退款异常";
          }else if(val==8){
            status="退款异常";
          }else if(val==9){
            status="已纠错";
          }
          return status;
        },
        //分页回调
        page_msg:function(data){
          var that=this;
          if(data.questions!=""||data.questions!=null){
            this.questions=data.questions;
          }else{
            this.no_msg=false;
          }
          setInterval(function(){
            $(".time-msg").each(function(){
              var t=$(this);
              if(t.attr("data-time")){
                t.html(that.get_djs(t.attr("data-time")));
              }else{
                t.html(that.cn_status(t.attr("data-status")));
              }
            })
          },1000);
        }
      }
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
