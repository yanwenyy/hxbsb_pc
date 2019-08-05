<template>
  <div id="sharingrouter">
    <headerTab msg="机构"></headerTab>
    <div class="container">
      <div class="city-position">
        <img src="../../../static/img/position.png" alt="">
        <div class="inline-block">选择地点：</div>
        <div class="city-sel inline-block">
          <div class="sel-show" @click="city_position_status=!city_position_status">
            <span>{{position.province==''?'全国':position.province}}</span>
            <span>{{position.city}}</span>
            <img src="../../../static/img/position-sel.png" alt="">
          </div>
          <div class="city-option box-sizing" v-if="city_position_status">
            <div class="opstion-show">
              <span v-show="position.province!=''" class="cursor">{{position.province}}</span>
              <span v-show="position.city!=''" class="cursor">{{position.city}} <b class="cursor" @click="sel_province='';position.city=''">X</b></span>
            </div>
            <div class="option-list" v-show="sel_province==''">
              <div  :class="position.province==''?'blue':''" class="inline-block  cursor box-sizing"  @click="sel_province='';position.province='';position.city='';marker_msg='';city_position_status=false">全国</div>
              <div :class="position.province==item.province?'blue':''" class="inline-block cursor box-sizing" v-for="item in city_list" @click="sel_province=item.agency;position.province=item.province;position.city='';marker_msg=''">{{item.province.length>5?item.province.slice(0,4)+'..':item.province}}</div>
            </div>
            <div class="option-list" v-show="sel_province!=''">
              <div :class="position.city==item.city?'blue':''" class="inline-block cursor box-sizing" v-for="item in sel_province" @click="position.city=item.city;sel_province='';marker_msg='';city_position_status=false">{{item.city}}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="container" class="inline-block" ref="container"></div>
      <div class="mechanism-detail inline-block">
        <div class="m-detail-no" v-show="marker_msg==''">
          <img src="../../../static/img/merchism-zwt.png" alt="">
        </div>
        <div class="m-detail" v-show="marker_msg!=''"  @click="$router.push({name:'mechanismDetail',query:{'msg':JSON.stringify(marker_msg)}})">
          <img :src="cover_src+marker_msg.videoCover" class="mechanism-img" alt="">
          <div class="mlist-name">{{marker_msg.name}}</div>
          <div class="mlist-msg">
            <span><img src="../../../static/img/sqfws.png" alt=""></span>
            <span v-show="marker_msg.views!=''&&marker_msg.views!=null">{{marker_msg.views}}人浏览</span>
            <span>{{marker_msg.contactNo}}</span>
          </div>
          <div class="mlist-adress"><img src="../../../static/img/mop-position.png" alt="">{{marker_msg.address}}</div>
        </div>
      </div>
      <div class="mechanism-group">
        <div class="mechanism-title">机构列表</div>
        <div style="width: 105%;margin-left: -2.5%" class="box-sizing">
          <div class="mechanism-list box-sizing inline-block" v-for="item in mechanismlist" @click="item.videoId!=''?$router.push({name:'mechanismDetail',query:{'msg':JSON.stringify(item)}}):''">
            <img :src="cover_src+item.videoCover" class="mechanism-img" alt="">
            <div class="mlist-name">{{item.name}}</div>
            <div class="mlist-msg">
              <span><img src="../../../static/img/sqfws.png" alt=""></span>
              <span v-show="item.views!=''&&item.views!=null">{{item.views}}人浏览</span>
              <span>{{item.contactNo}}</span>
            </div>
            <div class="mlist-adress"><img src="../../../static/img/mop-position.png" alt="">{{item.address}}</div>
            <div class="video-hover" v-if="item.videoId&&item.videoId!=''"><img src="../../../static/img/video-hover.png" alt=""></div>
          </div>
        </div>
        <div class="no-msg-img" v-show="mechanismlist==''">
          <img src="../../../static/img/no-msg-img.png" alt="">
          <div>没有搜到相关内容哦～</div>
        </div>
        <div class="load-more"  v-if="mechanismlist.length==end">
          <span class="inline-block gray-line"></span>
          <span class="inline-block load-more-btn" @click="load_more()">点击加载更多</span>
          <span class="inline-block gray-line"></span>
        </div>
      </div>
      <!--<div id="panel"></div>-->
    </div>
    <!--<div class="navigation cursor" v-on:click="navigation">导航</div>-->
  </div>
</template>

<script>
  import headerTab from "@/components/headerTab"
    // import AMap from 'AMap'
    export default {
      name: "mechanismlist",
      components:{
        headerTab
      },
      data(){
          return{
            lat:'',
            lng:'',
            map:'',
            province:'',//省
            city:'',//市
            zoom:'',
            position:{
              province:'',
              city:''
            },//选择的省和市
            city_list:'',//机构城市列表
            sel_province:'',//选择的省
            city_position_status:false,
            mechanismlist:[],//机构列表
            marker_msg:'',
            start:1,
            end:6,
          }
      },
      mounted() {
        var that=this;
        //获取机构城市列表
        this.ajax_nodata(this.http_url.url+"/citys/area",function(data){
          that.city_list=data.provinces;
        })
        //地图初始化
        this.init();
      },
      methods: {
        init: function (pro,ci) {
          var that=this;
          if(pro!=null||ci!=null){
            that.ajax(that.http_url.url+'/agency/findAgencysByParams',{
              "province":pro,
              "city":ci,
              "latitude":that.lat,
              "longitude":that.lng,
              "type":"1"
            },function(data){
              // console.log(data);
              var marker_data=data.datas;
              var markerList=[];
              that.get_mechanism_list(pro,ci,that.lat,that.lng);
              try{
                that.map = new AMap.Map('container', {
                  resizeEnable: true,
                  zoom:pro==''?7:13,
                  viewMode:'3D',//使用3D视图
                  center: [data.datas[0].longitude, data.datas[0].latitude]//中心点坐标
                });
                for(var i=0;i<marker_data.length;i++){
                  var iocn='',marker_msg=marker_data[i],type_msg='',flag_color='';
                  if(marker_data[i].type=="3"){
                    iocn="./static/img/flag-blue.png";
                    type_msg="战略合作伙伴";
                    flag_color="blue"
                  }else if(marker_data[i].type=="2"){
                    iocn="./static/img/flag-red.png";
                    type_msg="授权服务商";
                    flag_color="red"
                  }else{
                    iocn="./static/img/icon-map-show.png";
                    // type_msg="普通机构";
                  }
                  var content=`<div style=""><div style="min-width:20rem;width:auto;font-size: 1.4rem">${marker_data[i].name}</div><div style="font-size: 1rem" class="${flag_color}">${type_msg}</div><img src="${iocn}"></div>`;
                  var marker = new AMap.Marker({
                    position:new AMap.LngLat(marker_data[i].longitude,marker_data[i].latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    icon: iocn, // 添加 Icon 图标 URL
                    title: marker_data[i].name+" "+type_msg,
                    content:content,
                    zoom:13
                  });
                  that.marker_click(marker,markerList,marker_data);
                  markerList.push(marker);
                  that.map.add(marker);
                  that.zoom_change(markerList);
                }
              }catch(e){
                console.log(e)
              }
            });
          }else{
            this.map = new AMap.Map('container', {
              resizeEnable: true
            });
            AMap.plugin('AMap.Geolocation', function() {
              var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

              });
              that.map.addControl(geolocation);
              geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                  onComplete(result)
                }else{
                  onError(result)
                }
              });
            });
            //解析定位结果
            function onComplete(data) {
              // document.getElementById('status').innerHTML='定位成功'
              // console.log(data.position);
              // console.log(data);
              that.lat=data.position.lat;
              that.lng=data.position.lng;
              sessionStorage.setItem("lat",that.lat);
              sessionStorage.setItem("lng",that.lng);
              that.position.province=data.addressComponent.province;
              that.position.city=data.addressComponent.city;
              that.get_mechanism_list(that.position.province,that.position.city,that.lat,that.lng);
              that.ajax(that.http_url.url+'/agency/findAgencysByParams',{
                "province":that.position.province,
                "city":that.position.city,
                "latitude":that.lat,
                "longitude":that.lng,
                "type":"1"
              },function(data){
                // console.log(data);
                var marker_data=data.datas;
                var markerList=[];
                try{
                  for(var i=0;i<marker_data.length;i++){
                    var iocn='',marker_msg=marker_data[i],type_msg='',flag_color='';
                    if(marker_data[i].type=="3"){
                      iocn="./static/img/flag-blue.png";
                      type_msg="战略合作伙伴";
                      flag_color="blue"
                    }else if(marker_data[i].type=="2"){
                      iocn="./static/img/flag-red.png";
                      type_msg="授权服务商";
                      flag_color="red"
                    }else{
                      iocn="./static/img/icon-map-show.png";
                      // type_msg="普通机构";
                    }
                    var content=`<div style=""><div style="min-width:20rem;width:auto;font-size: 1.4rem">${marker_data[i].name}</div><div style="font-size: 1rem" class="${flag_color}">${type_msg}</div><img src="${iocn}"></div>`;
                    var marker = new AMap.Marker({
                      position:new AMap.LngLat(marker_data[i].longitude,marker_data[i].latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                      icon: iocn, // 添加 Icon 图标 URL
                      title: marker_data[i].name+" "+type_msg,
                      content:content,
                      zoom: 13
                    });
                    that.marker_click(marker,markerList,marker_data);
                    markerList.push(marker);
                    that.map.add(marker);
                  }
                }catch(e){
                  console.log(e)
                }
              });
            }
            //解析定位错误信息
            function onError(data) {
              // document.getElementById('status').innerHTML='定位失败'
              // document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
            }
          }
          AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
            map.addControl(new AMap.ToolBar())
            map.addControl(new AMap.Scale())
          })
        },
        navigation:function(){
          var marker = new AMap.Marker({
            map:this.map,
            position:[this.lng,this.lat]
          });
          marker.markOnAMAP({
            position:marker.getPosition()
          });
        },
        marker_click:function(marker,markerList,marker_data){
          var that=this;
          var marker_i='';
          that.map.remove(marker_i);
          AMap.event.addListener(that.map, "zoomend", function(e) {
            that.zoom= that.map.getZoom();
            that.zoom_change(markerList);
          });
          AMap.event.addListener(that.map, "touchmove", function(e) {
            that.zoom_change(markerList);
          });
          AMap.event.addListener(that.map, "mapmove", function(e) {
            that.zoom_change(markerList);
          });
          AMap.event.addListener(that.map, "click", function(e) {
            that.zoom_change(markerList);
          });
          AMap.event.addListener(marker, "click", function(e) {
            that.zoom_change(markerList);
            if(this.B.icon!="./static/img/icon-map-show.png"){
              var flag_click='',flag_color='';
              if(this.B.icon=="./static/img/flag-blue.png"){
                flag_click='./static/img/flag-blue-click.png';
                flag_color="blue"
              }else{
                flag_click='./static/img/flag-red-click.png';
                flag_color="red"
              }
              var content=`<div style="min-width:20rem;width:auto;font-size: 1.4rem">${marker.B.title.split(" ")[0]}</div><div style="font-size: 1rem" class="${flag_color}">${marker.B.title.split(" ")[1]}</div><img src="${flag_click}">`;
              marker.setContent(content);
              for(var k=0;k<marker_data.length;k++){
                if(e.target.B.title.split(" ")[0]==marker_data[k].name){
                  var company_img='',company_name='';
                  if(marker_data[k].type==2){
                    company_img="./static/img/icon-map-list-red.png";
                    company_name="授权服务商";
                  }else if(marker_data[k].type==3){
                    company_img="./static/img/icon-map-list-blue.png";
                    company_name="合作伙伴";
                  }
                  // console.log(marker_data[k]);
                  that.marker_msg=marker_data[k];
                  var distance="";
                  if(marker_data[k].distance>1000){
                    distance=parseFloat(marker_data[k].distance/1000).toFixed(1)+"k"
                  }else{
                    distance=marker_data[k].distance;
                  }
                  var look_num='';
                  if(marker_data[k].views&&marker_data[k].views.length>4){
                    look_num=parseFloat(marker_data[k].views/10000).toFixed(1)+"万";
                  }else{
                    look_num=marker_data[k].views||0;
                  }
                }
              }
            }else{

            }
          });
        },
        zoom_change:function(markerList){
          var that=this;
          if(that.zoom<13){
            for(var i=0;i<markerList.length;i++){
              var content=`<img src="${markerList[i].B.icon}">`;
              markerList[i].setContent(content);
            }
          }else{
            for(var i=0;i<markerList.length;i++){
              var flag_color='';
              if(markerList[i].B.icon=="../img/flag-blue.png"){
                flag_color='blue';
              }else{
                flag_color='red';
              }
              var content=`<div style=""><div style="min-width:20rem;width:auto;font-size: 1.4rem">${markerList[i].B.title.split(" ")[0]}</div><div style="font-size: 1rem" class="${flag_color}">${markerList[i].B.title.split(" ")[1]}</div><img src="${markerList[i].B.icon}"></div>`;
              markerList[i].setContent(content);
            }
          }
        },
        //获取机构列表
        get_mechanism_list:function(province,city,lat,lng){
          var that=this;
          this.ajax(this.http_url.url+"/agency/findAgencysByParams",{
            "province":province,
            "city":city,
            "latitude":lat,
            "longitude":lng,
            "sinceId":this.start,
            "maxId":this.end,
          },function(data){
            // console.log(data);
            that.mechanismlist=data.datas;
          })
        },
        //点击加载更多
        load_more:function(){
          var that=this;
          this.num+=1;
          this.start=((this.num-1)*6)+1;
          this.end=this.num*6;
          this.ajax(this.http_url.url+"/agency/findAgencysByParams",{
            "province":this.position.province,
            "city":this.position.city,
            "latitude":this.lat,
            "longitude":this.lng,
            "sinceId":this.start,
            "maxId":this.end,
          },function(data){
            // console.log(data);
            that.mechanismlist=data.datas;
          })
        }
      },
      watch:{
        position:{//深度监听，可监听到对象、数组的变化
          handler(val, oldVal){
            this.init(val.province,val.city);
          },
          deep:true
        }
      }
    }
</script>

<style scoped>
  .m-detail-no>img{
    width:100%;
    height:100%;
  }
  .mlist-adress{
    font-size: 1rem;
    color:#999;
  }
  .mlist-msg>span{
    vertical-align: middle;
    padding:0 0.4rem;
    border-left: 1px solid #eee;
    display: inline-block;
  }
  .mlist-msg>span:nth-child(1){
    padding-left:0;
    border-left:none;
    /*margin-top: -0.1rem;*/
  }
  .mlist-msg{
    font-size: 1rem;
    color:#666;
    margin-bottom: 0.8rem;
  }
  .mlist-name{
    font-size: 1.25rem;
    color:#333;
    font-weight: bold;
    margin: 1rem 0 0.8rem 0;
  }
  .mechanism-img{
    min-width:100%;
    min-height:14.12rem;
    width:100%;
    height:14.12rem;
    border-radius: 4px;
  }
  .mechanism-list{
    width:28%;
    margin:0 2.5% 3.3rem 2.5%;
    position: relative;
    vertical-align: top;
  }
  .video-hover{
    height:14.12rem;
  }
  .mechanism-list:hover .video-hover{
    display: block;
  }
  .video-hover>img{
    margin-top:6rem;
  }
  .mechanism-title{
    color:#1A1A1A;
    font-size: 1.5rem;
    margin: 2.75rem 0 1.5rem 0;
  }
  .mechanism-detail{
    width:30%;
    height:27rem;
    vertical-align: top;
    margin-left: 1%;
  }
  .container{
    margin-bottom: 5rem;
  }
  .option-list-act{
    background: #4872ED;
    color:#fff;
  }
  .option-list>div{
    width:32.5%;
    height:1.875rem;
    line-height: 1.875rem;
    text-align: center;
    margin-top: 0.5rem;
    color:#333;
    font-size: 0.88rem;
  }
  .opstion-show{
    border-bottom: 1px solid #eee;
    padding:1rem 0.5rem;
  }
  .opstion-show>span{
    height:1.875rem;
    line-height: 1.875rem;
    text-align: center;
    padding:0 0.75rem;
    background: #E5E5E5;
    border-radius:4px;
    color: #333;
    font-size: 0.88rem;
    margin-right: 0.5rem;
    display: inline-block;
  }
  .city-option{
    background: #fff;
    width:100%;
    position: absolute;
    top:3.125rem;
    left:0;
    border: 1px solid #eee;
    padding:0 1rem 1.94rem 1rem;
  }
  .sel-show>img{
    float: right;
    margin: 1.375rem 0.75rem;
  }
  .sel-show{
    height:3.125rem;
    line-height: 3.125rem;
    border:1px solid rgba(229,229,229,1);
    border-radius:4px;
    padding-left:1.5rem;
    font-size: 1rem;
  }
  .city-sel{
    position: relative;
    z-index: 9999;
    width:19.8rem;
    height:3.125rem;
    vertical-align: middle;
  }
  .city-position{
    margin-top: 2.69rem;
    font-size: 1.25rem;
    color:#333;
    margin-bottom: 1.81rem;
  }
  .city-position>img{
    width:1.12rem;
    height:1.44rem;
    vertical-align: middle;
    margin-right: 0.81rem;
    margin-top: -0.2rem;
  }
  #sharingrouter{
    position: relative;
    min-height: 100vh;
    height:auto;
  }
  #container {
    width: 68%;
    height:27rem;
    cursor: pointer;
    border: 1px solid #eee;
  }
  .navigation{
    position: absolute;
    top:3rem;
    left: 10%;
    width:100px;
    height:40px;
    line-height: 40px;
    background: red;
    color:#fff;
    text-align: center;
  }
</style>
