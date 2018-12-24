<template>
  <div class="home-body">
    <div class="about-header">
      <img class="ah-img" src="../../static/img/about-header.png"/>
      <div class="about-shadow about-us" ref="ab">
        <div class="au-left inline-block">
          <img src="../../static/img/about-img.png"/>
        </div>
        <div class="au-right inline-block">
          <div>
            <img class="au-cn" src="../../static/img/about-us-cn.png"/>
            <img class="au-en" src="../../static/img/about-us-en.png"/>
            <span class="inline-block br"></span>
            <div>
              <p>       航信办税宝是航天信息股份有限公司和北京解税宝科技有限公司联合开发的财税知识咨询平台，航信办税宝创造性地提出了“用户不花钱，咨询师还赚钱”的商业模式，企业一线财税从业者可以随时随地向专业人员（税务师、注册会计师、律师）咨询问题，专业人员（税务师、注册会计师、律师）可以利用碎片化时间帮助别人，将专业知识变现，同时还可以提升自身的影响力，打造个人品牌。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-contain">
      <span class="inline-block br"></span>
      <p style="font-size: 1.6rem;color: #2C4058;margin-top: 20px">企业精神</p>
      <div class="list">
        <ul>
          <li class="inline-block">
            <img src="../../static/img/about-icon1.png"/>
            <p>专心</p>
          </li>
          <li class="inline-block">
            <img src="../../static/img/about-icon2.png"/>
            <p>专注</p>
          </li>
          <li class="inline-block">
            <img src="../../static/img/about-icon3.png"/>
            <p>专业</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="about-footer">
      <img class="ah-img" src="../../static/img/about-footer.png"/>
      <div class="about-contact about-shadow">
        <div><img class="ac-cn" src="../../static/img/contact-us-cn.png"/></div>
        <div><img class="" src="../../static/img/contact-us-en.png"/></div>
        <span class="inline-block br" style="width: 11%"></span>
        <p style="color:#2286FF;font-size: 1.125rem;margin-bottom: 30px">北京解税宝科技有限公司</p>
        <p class="about-txt"><span><img src="../../static/img/about-dh.png"/></span>电话：010-5779 707</p>
        <p class="about-txt"><span><img src="../../static/img/about-dz.png"/></span>网址：</p>
        <p class="about-txt"><span><img src="../../static/img/about-dw.png"/></span>地址：北京市海淀区永定路2号院8号楼二层</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "about",
        data(){
          return{
            ab_height:''
          }
        },
      mounted (){
          console.log(this.$refs.ab.style.width)
      }
    }
</script>

<style scoped>
  .about-header,.about-header{
    width: 100%;
    position: relative;
  }
  .about-contain{
    height: 12rem;
    text-align: center;
    position: relative;
    top: -60px;
  }
  .about-contain .inline-block.br{
    width: 5%;
    height: 1px;
    background: #000;
  }
  .list{
    margin: 0 auto;
    margin-top: 20px;
  }
  .list ul li{
    margin: 0 20px;
  }
  .list ul li p{
    font-size: 1rem;
  }
  .list ul li img{
    width: 4.8rem;
    margin: 10px 0;
  }
  .ah-img{width: 100%}
  .about-us{
    width: 41.25%;
    margin: auto;
    left: 0;
    right: 0;
    top: -130px;
    padding:16px 7px;
    position: relative;
  }
  .about-us .inline-block{
    width: 49%;
    text-align: center;
  }
  .about-shadow .inline-block.br{width: 20%;height: 2px;background: #000;margin-bottom: 10px;margin-top: 5px}
  .about-shadow{
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 25px 2px rgba(30,112,222,0.32);
    border-radius:18px;
  }
  .au-left img{
    width: 90%;
  }
  .au-cn{
    width: 35%;
    margin: 10px 0;
  }
  .au-en{
    width: 90%;
    margin: 10px 0;
  }
  .au-right{
    float: right;
  }
  .au-right>div{
    width: 80%;
    margin: 0 auto;
  }
  .au-right p{
    line-height: 1.8;
    text-align: left;
    text-indent: 2em;
    font-size: 0.875rem;
  }
  .about-contact{
    width: 31.97%;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 20px;
    padding-top: 10px;
    position: relative;
    top: -100px;
  }
  .about-contact>div>img{
    width: 50%;
    margin: 10px;
  }
  .about-contact>div>img.ac-cn{
    width: 20%;
    margin-top: 20px;
  }
  .about-txt{
    font-size: 1rem;
    margin: 10px;
  }
  .about-txt img{
    width: 1rem;
  }
  @media screen and (max-width: 960px) {
    .about-us{
      width: 55%;
      top:-100px
    }
    .au-right p{
      line-height: 1;
    }
  }
  @media screen and (min-width: 960px) {
   .about-us{
      width: 55%;
     top:-90px
    }
    .au-right p{
      line-height: 1.1;
    }
  }
  @media (min-width: 1024px){
    .about-us{
      width: 55%;

    }
    .au-right p{
      line-height: 1.2;
    }
  } /*>=1024的设备*/

  @media (min-width: 1100px) {
    .about-us{
      width: 50%;
      top:-100px
    }
    .au-right p{
      line-height: 1.3;
    }
  } /*>=1100的设备*/
  @media (min-width: 1280px) {
    .about-us{
      width: 45%;
      top:-125px
    }
    .au-right p{
      line-height: 1.6;

    }
  } /*>=1280的设备*/
  @media (min-width: 1366px) {

  }
</style>
