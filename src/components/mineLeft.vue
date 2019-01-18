<template>
  <ul class="mine-left-ul">
    <li :class="msg=='我的资料'?  'mine-li-act':''" @click="mine_left_li('mineData')">
      <img :src="msg=='我的资料'? './static/img/mine-zl-click.png':'./static/img/mine-zl.png'" alt="">
      我的资料
    </li>
    <li :class="msg=='我的提问'?  'mine-li-act':''" @click="mine_left_li('mineQuestion')">
      <img :src="msg=='我的提问'? './static/img/mine-tw-click.png':'./static/img/mine-tw.png'" alt="">
      我的提问
    </li>
    <li :class="msg=='我的购买'?  'mine-li-act':''" @click="mine_left_li('mineBuy')">
      <img :src="msg=='我的购买'? './static/img/mine-gm-click.png':'./static/img/mine-gm.png'" alt="">
      我的购买
    </li>
    <li :class="msg=='我的钱包'?  'mine-li-act':''" @click="mine_left_li('mineBag')">
      <img :src="msg=='我的钱包'? './static/img/mine-qb-click.png':'./static/img/mine-qb.png'" alt="">
      我的钱包
    </li>
    <li :class="msg=='学习顾问卡'?  'mine-li-act':''" @click="mine_left_li('mineLearningCard')">
      <img :src="msg=='学习顾问卡'? './static/img/mine-xxgwk-click.png':'./static/img/mine-xxgwk.png'" alt="">
      学习顾问卡
    </li>
    <li :class="msg=='财税问答卡'?  'mine-li-act':''" @click="mine_left_li('mineFinanceCard')">
      <img :src="msg=='财税问答卡'? './static/img/mine-cswdk-click.png':'./static/img/mine-cswdk.png'" alt="">
      财税问答卡
    </li>
    <!--<li :class="msg=='开具发票'?  'mine-li-act':''" @click="mine_left_li('mineInvoice')">-->
      <!--<img :src="msg=='开具发票'? '../../static/img/mine-fp-click.png':'../../static/img/mine-fp.png'" alt="">-->
      <!--开具发票-->
    <!--</li>-->
    <li :class="msg=='设置密码'?  'mine-li-act':''"  @click="mine_left_li('mineEditPassword')">
      <img :src="msg=='设置密码'? './static/img/mine-mm-click.png':'./static/img/mine-mm.png'" alt="">
      设置密码
    </li>
  </ul>
</template>

<script>
    export default {
        name: "mine-left",
      props: {
        msg: String,
        required: true
      },
        mounted () {

        },
      methods:{
        mine_left_li:function(val){
          this.$router.push({
            name:val
          })
        }
      }
    }
</script>

<style scoped>

</style>
