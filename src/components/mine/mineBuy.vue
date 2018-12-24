<template>
  <div class="mine-body box-sizing">
    <div class="container">
      <div class="mine-left inline-block box-sizing">
        <mineLeft msg="我的购买"></mineLeft>
      </div>
      <div class="mine-right inline-block box-sizing">
        <div class="home-model-header">
          <div class="inline-block home-head-title"><span class="inline-block span-blue-line"></span>我的购买</div>
        </div>
        <div class="mine-right-body">
          <div class="mine-buy-body box-sizing">
            <div class="mine-buy-title">
              <div class="inline-block mine-buy-headname" @click="mine_buy_title('我的围观')">
                我的围观
                <span class="inline-block" v-if="headName=='我的围观'"></span>
              </div>
              <div class="inline-block mine-buy-headname" @click="mine_buy_title('已购视频')">
                已购视频
                <span class="inline-block" v-if="headName=='已购视频'"></span>
              </div>
            </div>
            <div class="mine-buy-main">
              <div class="mine-buy-wacth" v-if="headName=='我的围观'">
                <div class="wdk-list-group box-sizing">
                  <div class="wdk-list">
                    <div class="inline-block">
                      <div class="wdk-name">
                        <img src='../../../static/img/user-img.png'>
                        <div class="inline-block user_name">匿名用户</div>
                        <div class="inline-block user-dj"><img src="../../../static/img/jpyh.png" alt=""></div>
                        <div class="home-list-msg-group">
                          <div class="inline-block home-list-msg">我公司将进行资产重组，要将公司部分货物和劳力转移到一家新设立的物流公司 请问需要开发票吗？转入新公司的货物可否折旧，折旧费用能</div>
                        </div>
                        <div class="label box-sizing">
                          <div class="inline-block">2018-10-12 10:00:06</div>
                          <div class="inline-block">
                            <div class="see-num inline-block">
                              <!--<img class="home-zan" :src="zan==1? '../../static/img/zan1.png':'../../static/img/zan2.png'" alt="" :data-code="zan" v-on:click="zan_click(zan)" >-->
                              点赞
                              12
                            </div>
                            <div class="see-num inline-block">
                              <!--<img class="home-cai" src="../../static/img/eye.png" alt="">-->
                              围观
                              13
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="wdk-list">
                    <div class="inline-block">
                      <div class="wdk-name">
                        <img src='../../../static/img/user-img.png'>
                        <div class="inline-block user_name">匿名用户</div>
                        <div class="inline-block user-dj"><img src="../../../static/img/jpyh.png" alt=""></div>
                        <div class="home-list-msg-group">
                          <div class="inline-block home-list-msg">我公司将进行资产重组，要将公司部分货物和劳力转移到一家新设立的物流公司 请问需要开发票吗？转入新公司的货物可否折旧，折旧费用能</div>
                        </div>
                        <div class="label box-sizing">
                          <div class="inline-block">2018-10-12 10:00:06</div>
                          <div class="inline-block">
                            <div class="see-num inline-block">
                              <!--<img class="home-zan" :src="zan==1? '../../static/img/zan1.png':'../../static/img/zan2.png'" alt="" :data-code="zan" v-on:click="zan_click(zan)" >-->
                              点赞
                              12
                            </div>
                            <div class="see-num inline-block">
                              <!--<img class="home-cai" src="../../static/img/eye.png" alt="">-->
                              围观
                              13
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="wdk-list">
                    <div class="inline-block">
                      <div class="wdk-name">
                        <img src='../../../static/img/user-img.png'>
                        <div class="inline-block user_name">匿名用户</div>
                        <div class="inline-block user-dj"><img src="../../../static/img/jpyh.png" alt=""></div>
                        <div class="home-list-msg-group">
                          <div class="inline-block home-list-msg">我公司将进行资产重组，要将公司部分货物和劳力转移到一家新设立的物流公司 请问需要开发票吗？转入新公司的货物可否折旧，折旧费用能</div>
                        </div>
                        <div class="label box-sizing">
                          <div class="inline-block">2018-10-12 10:00:06</div>
                          <div class="inline-block">
                            <div class="see-num inline-block">
                              <!--<img class="home-zan" :src="zan==1? '../../static/img/zan1.png':'../../static/img/zan2.png'" alt="" :data-code="zan" v-on:click="zan_click(zan)" >-->
                              点赞
                              12
                            </div>
                            <div class="see-num inline-block">
                              <!--<img class="home-cai" src="../../static/img/eye.png" alt="">-->
                              围观
                              13
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="wdk-list">
                    <div class="inline-block">
                      <div class="wdk-name">
                        <img src='../../../static/img/user-img.png'>
                        <div class="inline-block user_name">匿名用户</div>
                        <div class="inline-block user-dj"><img src="../../../static/img/jpyh.png" alt=""></div>
                        <div class="home-list-msg-group">
                          <div class="inline-block home-list-msg">我公司将进行资产重组，要将公司部分货物和劳力转移到一家新设立的物流公司 请问需要开发票吗？转入新公司的货物可否折旧，折旧费用能</div>
                        </div>
                        <div class="label box-sizing">
                          <div class="inline-block">2018-10-12 10:00:06</div>
                          <div class="inline-block">
                            <div class="see-num inline-block">
                              <!--<img class="home-zan" :src="zan==1? '../../static/img/zan1.png':'../../static/img/zan2.png'" alt="" :data-code="zan" v-on:click="zan_click(zan)" >-->
                              点赞
                              12
                            </div>
                            <div class="see-num inline-block">
                              <!--<img class="home-cai" src="../../static/img/eye.png" alt="">-->
                              围观
                              13
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="wdk-list">
                    <div class="inline-block">
                      <div class="wdk-name">
                        <img src='../../../static/img/user-img.png'>
                        <div class="inline-block user_name">匿名用户</div>
                        <div class="inline-block user-dj"><img src="../../../static/img/jpyh.png" alt=""></div>
                        <div class="home-list-msg-group">
                          <div class="inline-block home-list-msg">我公司将进行资产重组，要将公司部分货物和劳力转移到一家新设立的物流公司 请问需要开发票吗？转入新公司的货物可否折旧，折旧费用能</div>
                        </div>
                        <div class="label box-sizing">
                          <div class="inline-block">2018-10-12 10:00:06</div>
                          <div class="inline-block">
                            <div class="see-num inline-block">
                              <!--<img class="home-zan" :src="zan==1? '../../static/img/zan1.png':'../../static/img/zan2.png'" alt="" :data-code="zan" v-on:click="zan_click(zan)" >-->
                              点赞
                              12
                            </div>
                            <div class="see-num inline-block">
                              <!--<img class="home-cai" src="../../static/img/eye.png" alt="">-->
                              围观
                              13
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mine-buy-video box-sizing"  v-if="headName=='已购视频'">
                <div class="inline-block">
                  <img src="../../../static/img/ceshi.jpg" alt="">
                  <div>高技术尾房销售问题-土地增值清算 -晴朗</div>
                </div>
                <div class="inline-block">
                  <img src="../../../static/img/ceshi.jpg" alt="">
                  <div>高技术尾房销售问题-土地增值清算 -晴朗</div>
                </div>
                <div class="inline-block">
                  <img src="../../../static/img/ceshi.jpg" alt="">
                  <div>高技术尾房销售问题-土地增值清算 -晴朗</div>
                </div>
                <div class="inline-block">
                  <img src="../../../static/img/ceshi.jpg" alt="">
                  <div>高技术尾房销售问题-土地增值清算 -晴朗</div>
                </div>
                <div class="inline-block">
                  <img src="../../../static/img/ceshi.jpg" alt="">
                  <div>高技术尾房销售问题-土地增值清算 -晴朗</div>
                </div>
              </div>
            </div>
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
        name: "min-buy",
        data(){
            return{
              headName:'我的围观'
            }
        },
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
        methods:{
          //tab切换
          mine_buy_title:function(val){
            this.headName=val;
          }
        }
    }
</script>

<style scoped>
  .mine-buy-body{
    padding:0 1rem;
  }
  .mine-buy-title{
    font-size: 0.875rem;
    color:#666;
    margin-top: 1rem;
  }
  .mine-buy-headname{
    margin-right: 1.875rem;
    position: relative;
    padding-bottom: 0.875rem;
  }
  .mine-buy-headname>span{
    width:1.69rem;
    height:4px;
    background: #2D86FD;
    position: absolute;
    bottom: 0;
    left:0.875rem;
    border-radius: 2px;
  }
  .mine-right{
    min-height: 43.31rem;
    height: auto;
  }
  .mine-buy-video{
    margin: 1rem 0;
  }
  .mine-buy-video>div{
    box-sizing: border-box;
    color:#666;
    font-size: 0.875rem;
    width:31%;
    margin-right: 2%;
    padding: 0.5rem;
  }
  .mine-buy-video>div>img{
    width:100%;
    height:9rem;
    margin-bottom: 1rem;
  }
</style>
