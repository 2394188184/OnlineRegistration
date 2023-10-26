<template>
  <!-- 自定义导航栏 -->
  <view class="nav-gation">
    <view class="nav-top"></view>
    <view class="nav-height">汕头市潮阳区XX医院</view>
  </view>
  <view class="yuyue">
    <img mdoe="aspectFill" src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/nav-yiyu.png" />
  </view>
  <!-- 疫苗预约 -->
  <view class="vaccine">
    <view @click="navigatorX(index)" class="vaccine_item"  v-for="(item,index) in vaccine" :key="index">
      <img :src = item.image mode="aspectFit"/>
      <text>{{item.title}}</text>
    </view>
  </view>
  <!-- 挂号和体检 -->
  <view class="re-me-ex">
    <view class="re-me-ex-view" v-for="(item,index) in reserve" :key="index">
      <text class="re-me-ex-title">{{item.title}}</text>
      <text class="re-me-ex-lable">{{item.describe}}</text>
      <img mode="widthFix" :src="item.image" />
    </view>
  </view>
  <!-- 热门挂号 -->
    <view class="online-title">
      <view >热门挂号</view>
      <view class="online-More">
        <text>查看更多</text>
        <img  src="@/static/other/gengduo.svg"/>
      </view>
    </view>
    <view class="online-reg">
      <view v-for="(item,index) in popular" :key="index" :style="{'background-color':item.background}">
        <text>{{item.title}}</text>
        <img :src="item.image"/>
      </view>
    </view>
    <!-- 健康自测 -->
    <!-- 标题 -->
    <view class="online-title">
      <view>健康自测</view>
    </view>
    <!-- 加selfTest.length的原因是数据还没加载回来，页面就渲染了会报错 -->
    <view class="self-test">
      <!-- 顶部 -->
      <view class="sele-test-top sele-test-flex sele-test-one sele-test-back"  v-if="selfTest.length>0">
        <view class="sele-test-view">
          <text class="top-title">{{selfTest[0].name}}</text>
          <text class="top-lable">{{selfTest[0].describe}}</text>
          <view class="top-people">
            <text class="top-num">{{selfTest[0].number_of_people}}</text>
            <text class="top-min top-lable">/看过/{{selfTest[0].question}}题/{{selfTest[0].minute}}分钟</text>
          </view>
        </view>
        <img class="top-img" mode="widthFix" :src=selfTest[0].image  />
      </view>
      <!-- 
        底部   slice 类似于 map  返回一个新数据
      -->
      <view class="sele-test-top sele-test-flex sele-test-back"
        v-for="(item,index) in selfTest.slice(1)" :key="index"
      >
        <view class="sele-test-view">
          <text class="top-title">{{item.name}}</text>
          <text class="top-lable top-min">{{item.question}}题/{{ item.minute }}分钟</text>
          <view class="top-people">
            <text class="top-num">{{ item.number_of_people }}</text>
            <text class="top-min top-lable">人测过</text>
          </view>
        </view>
        <img class="top-img bottom-img" mode="widthFix" :src="item.image" />
      </view>
    </view>
</template>


<!-- 使用vue3.2的语法+ts -->
<script setup lang="ts">
import { ref,onMounted } from 'vue';
/* 引入接口 */
import {RequestApi} from '@/public/request'
/* 引入类型声明文件 */
import type { Vaccine,Reserve,Popular,SelfTest} from '@/public/decl-type.d';
//取出胶囊按钮的数据
//定义宽高（有点像vue的data）
let menu_top = ref<string>('')  //胶囊按钮距离顶部的高度
let menu_height = ref<string>('') //胶囊按钮的高度
onMounted(()=>{
  let MenuButton:any = uni.getStorageSync('MenuButton')
  // console.log(MenuButton)
  menu_top.value = MenuButton.top + 'px'
  menu_height.value = MenuButton.height + 'px'
  pageData();
})
//首页第一项数据：疫苗预约
let vaccine =  ref<Vaccine[]>([])
//首页第二项数据：挂号和体检
let reserve = ref<Reserve[]>([])
// 首页第三项数据:热门挂号
let popular  = ref<Popular[]>([])
// 首页第四项数据：健康自测
/* 
  { 
    describe:'',
    image: '',
    minute: 0,
    name: '',
    number_of_people: 0,
    question: 0
  }
*/
let selfTest = ref<SelfTest[]>([])
//请求数据
async function pageData(){
  const res:any  = await RequestApi.FrontPage()
  //console.log(res)
  vaccine.value = res.data.data[0].vaccine
  reserve.value = res.data.data[1].reserve
  popular.value = res.data.data[2].popular
  selfTest.value = res.data.data[3].self_test
  // console.log(selfTest)
}
//跳转页面
function navigatorX(index:number){
  if(index == 0){
    uni.navigateTo({
      url:'/pages/xinguan-vaccine/xinguan-vaccine'
    })
  }
  if(index == 1){
    uni.navigateTo({
      url:'/pages/hpv-vaccine/hpv-vaccine'
    })
  }
  if(index == 2){
    uni.navigateTo({
      url:'/pages/nucleic-cacid/index'
    })
  }
  if(index == 3){
    uni.navigateTo({
      url:'/pages/graphics/index'
    })
  }
}
</script>
<style lang="scss" scoped>
.nav-gation{
  position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
}
.nav-top{
  height: v-bind('menu_top');
}
.nav-height{
  height: v-bind('menu_height');
  line-height: v-bind('menu_height');
  padding-left: 20rpx;
  color: #fff;
  font-weight: bold;
  font-size: 35rpx;
}
.yuyue image{
  width: 100%;
  display: block;
  height: 550rpx;
}
/* 
  疫苗预约样式开始
*/
.vaccine{
  display: flex; //主盒子开启flex
  justify-content: space-between;  //水平排列
  margin: 20rpx;  
  .vaccine_item{
    width:25%; 
    height: 200rpx;
    display: flex; 
    flex-direction: column; //将水平排列变成垂直排列
    align-items: center; //垂直居中
    font-size: 28rpx;
    image{
    width: 50rpx;
    height: 60%;
    display: block;
  }
  }
}
.gongge{
  display: flex;
  justify-content: space-between;
	margin: 40rpx 30rpx;
}
.gongge image{
  width: 50rpx;
  height: 50rpx;
  display: block;
  padding-bottom: 20rpx;
}
.gongge view{
  /* width: calc(20% - 10rpx*2); */
	/* margin: 10rpx; */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28rpx;
}
/* 
  疫苗预约样式结束
*/
/* 
  预约挂号样式开始
*/
.re-me-ex{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10rpx;
}
.re-me-ex-view{
  position: relative;
  height: 200rpx;
  width: 48%;
}
.re-me-ex-view image{
  width: 150rpx;
  display: block;
  position: absolute;
  bottom: 0;
  right: 20rpx;
}
.re-me-ex view:nth-child(1) text:nth-child(1){
  color: #0042ff;
}
.re-me-ex view:nth-child(2) text:nth-child(1){
  color: #dc6200;
}
.re-me-ex view:nth-child(1){
  background-image: linear-gradient(to right, #d7dfff 10%, #5a9fff 100%);
  border-radius: 20rpx;
}
.re-me-ex view:nth-child(2){
  background-image: linear-gradient(to right, #ffdbb4 10%, #ffc56b 100%);
  border-radius: 20rpx;
}
.re-me-ex-title{
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 40rpx;
}
.re-me-ex-lable{
  font-size: 30rpx;
  color: #ffffff;
  position: absolute;
  top: 90rpx;
  left: 20rpx;
}
/* 在线挂号 */
.online-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx 10rpx 10rpx 10rpx;
  font-weight: bold;
}
.online-title view:nth-child(1){
  font-size: 35rpx;
}
.online-More{
  display: flex;
  align-items: center;
}
.online-More image{
  width: 40rpx;
  height: 40rpx;
  display: block;
  margin-left: 10rpx;
}
.online-reg{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
	margin: 10rpx 0;
}
.online-reg image{
  width: 50rpx;
  height: 70rpx;
}
.online-reg view{
  width: calc(33% - 30rpx*2);
	margin: 10rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  justify-content: space-between;
  border-radius: 10rpx;
}
/* 健康自测 */
.self-test{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.sele-test-top{
  display: flex;
  justify-content: space-between;
}
.sele-test-flex{
  width: calc(50% - 10rpx*2);
  margin: 10rpx;
  border-radius: 20rpx;
  overflow: hidden;
  position: relative;
  height: 250rpx;
}
.sele-test-one{
  width: 100%;
}
.sele-test-back{
  background-color: #ffffff;
  box-shadow: #f7f7f7 0px 0px 20rpx 10rpx;
}
.top-lable{
  color: #a6abb0;
}
.top-img{
  width:250rpx;
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
}
.bottom-img{
  width: 170rpx !important;
}
.self-test text{
  display: block;
}
.sele-test-view{
  position: absolute;
  left: 20rpx;
  top: 35rpx;
}
.top-people{
  display: flex;
  align-items: baseline;
  padding-top: 30rpx;
}
.top-title{
  padding-bottom: 10rpx;
  font-size: 35rpx;
}
.top-num{
  font-size: 35rpx;
  padding-right: 10rpx;
}
.top-min{
  font-size: 25rpx;
}
</style>

