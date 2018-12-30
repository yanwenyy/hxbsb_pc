export default{
  install:function(Vue,options)
  {
    //接口变量
    Vue.prototype.http_url = {
      test:'http://test.jieshuibao.com/jsb_webserver/',
      formal: "https://api.jieshuibao.com/",
      url:  "http://test.jieshuibao.com/jsb_webserver/",
    };
    //头像变量
    Vue.prototype.head_src = Vue.prototype.http_url.url+"showImg/head/";
    //问题图片
    Vue.prototype.question_src = Vue.prototype.http_url.url+"showImg/question/";
    //会员卡图片
    Vue.prototype.showImg_src = Vue.prototype.http_url.url+"showImg/card/";
    //视频封面图片
    Vue.prototype.cover_src = Vue.prototype.http_url.url+"showImg/cover/";
    //证件图片
    Vue.prototype.cert_src = Vue.prototype.http_url.url+"showImg/cert/";
    Vue.prototype.ajax=function(url,data,succ){
      $.ajax({
        type:"POST",
        url:url,
        dataType: "json",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=utf-8",
          "cookieId":"oPUdI0pZbHIYBCHUn_aQPCJAmRIU",
          "version":"1"
        },
        data:JSON.stringify(data),
        success:function(data){
          if(data.code=="2"){
            alert(data.des);
            // window.location.href="../html/register-next.html"
          }else{
            succ(data);
          }

        },
        error:function(){
          console.log("程序出错,请重试");
        }
      })
    }
    Vue.prototype.ajax_nodata=function(url,succ){
      $.ajax({
        type:"POST",
        url:url,
        dataType: "json",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=utf-8",
          "cookieId":"oPUdI0pZbHIYBCHUn_aQPCJAmRIU",
          "version":"1"
        },
        success:function(data){
          if(data.code=="2"){
            alert(data.des);
            // window.location.href="../html/register-next.html"
          }else{
            succ(data);
          }

        },
        error:function(){
          console.log("程序出错,请重试");
        }
      })
    }
    //日期转换
    Vue.prototype.format=function(shijianchuo){
      function add0(m){return m<10?'0'+m:m };
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
    //用户等级
    Vue.prototype.get_score=function(data,aision,vip){
      var score_img;
      if(aision==0){
        if(vip==0){
          score_img="/static/img/hangxin_vip.png"
        }else{
          score_img="/static/img/hangxin_vip_dateout.png"
        }
      }else{
        if(0<=data&&data<6){
          score_img="/static/img/icon-pthy.png"
        }else if(6<=data&&data<20){
          score_img="/static/img/icon-pthy.png"
        }else if(20<=data&&data<50){
          score_img="/static/img/icon-yphy.png"
        }else if(50<=data&&data<100){
          score_img="/static/img/icon-jphy.png"
        }else if(100<=data&&data<500){
          score_img="/static/img/icon-bjhy.png"
        }else if(500<=data){
          score_img="/static/img/icon-zshy.png"
        }
      }
      return score_img;
    }
    //行业,税种,专题
    Vue.prototype.get_category=function(data,key){
      var categorys='';
      for(var i=0;i<data.length;i++){
        if(data[i].name==key){
          categorys=data[i].children;
        }
      }
      return categorys;
    }
  }
}

