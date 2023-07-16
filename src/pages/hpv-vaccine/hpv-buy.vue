<template>
  <!-- 展示数据 -->
  <view class="hpv-choose">
    <view>
      <view class="hpv-type">{{ router_value.name }} </view>
      <view class="hpv-age">
        <text v-for="(item,index) in  router_value.describe" :key="index">{{ item }}</text>
      </view>
    </view>
    <view class="hpv-price">￥{{router_value.price[0]}} -{{router_value.price[1]}}</view>
  </view>
  <!-- 表单填写 -->
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>真实姓名</text>
      <input  v-model="subData.name" placeholder="请输入真实姓名"  placeholder-class="input-style" />
    </view>
    <view class="xinguan-flex">
      <text>身份证</text>
      <input v-model="subData.id_card" placeholder="请输入身份证"  placeholder-class="input-style" />
    </view>
    <view class="xinguan-flex">
      <text>性别</text>
      <picker mode="selector" :range="['男','女']" class="flex-left" @change="changeSex"> 
        <view>
          <text>{{ gender == ''? '请选择性别' : gender  }}</text>
          <img  src="@/static/other/gengduo.svg"/>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>出生日期</text>
      <picker mode="date"  class="flex-left" @change="changeDate"> 
        <view>
          <text>{{ born_date == '' ? '请选择出生日期' : born_date }}</text>
          <img  src="@/static/other/gengduo.svg"/>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>手机号</text>
      <input  v-model="subData.phone" placeholder="请输入手机号" type="number" placeholder-class="input-style" />
    </view>
  </view>
  <!-- 选择套餐 -->
  <block v-for="item in HpvName" :key="item._id">
    <text class="combo-title">{{ item.title }}</text>
    <view class="combo-list" >
      <text :class="index == ComboIndex ? 'checkstyle' : '' " @click="changCombo(index,item1.combo_id,item1.combo)" v-for="(item1,index) in item.name" :key="item1.combo_id">{{ item1.combo }}</text>
    </view>
  </block>
  <!-- 接种时间 -->
  <block v-for="item in HpvTime" :key="item._id">
    <text class="combo-title">预计接种时间</text>
    <view class="combo-list" >
      <text :class="index == TimeIndex ? 'checkstyle' : '' " @click="changTime(index,item1.time,item1.time_id)" v-for="(item1,index) in item.name" :key="item1.time_id">{{ item1.time }}</text>
    </view>
  </block>
  <!-- 底部合计 -->
  <view style="height:300rpx"> </view>
  <view class="Total-view">
    <text>合计：￥{{ price }}</text>
    <text @click="subMit">提交</text>
  </view>
</template>

<script lang="ts" setup>
import {onMounted,reactive,ref, watch,toRefs} from 'vue'
import { onLoad } from  '@dcloudio/uni-app';
import {RequestApi} from '@/public/request'
import type {Hpvcomboname,Hpvcombotime} from '@/public/decl-type'
let  HpvName = ref<Hpvcomboname[]>([])
let  HpvTime = ref<Hpvcombotime[]>([])
// 定义上个页面传递过来的数据
let router_value = reactive({
  _id:'',
  name:'',
  price:[],
  describe:[]
})
onLoad(async(event:any)=>{
  let res:any = await RequestApi.HpvPack()
  HpvName.value = [res.data.data[0]]
  HpvTime.value = [res.data.data[1]]
  let { _id,name,price,describe} = JSON.parse(event.value)
  router_value._id = _id 
  router_value.name = name
  router_value.price = price
  router_value.describe = describe
})
//点击套餐/预约时间高亮
let  ComboIndex = ref(-1) 
let  comboId = ref('')
let combo_name = ref('')
function changCombo(index:number,combo_id:string,combo:string){
  ComboIndex.value = index
  comboId.value = combo_id
  combo_name.value = combo
}
let TimeIndex = ref(-1)
let timeId = ref('')
let combo_time = ref('')
function changTime(index:number,time:string,time_id:string){
  TimeIndex.value = index
  timeId.value = time_id
  combo_time.value = time
}
  //获取价格接口
let price = ref(0.00) 
async function getPrice(data:object){
  let res:any  = await RequestApi.HpvPrice(data)
  price.value = res.data.data[0].price
}
//用watch监听数据变化当2个id都不会空执行获取价格的接口
watch(
  // 监视的数据变量或表达式
  [comboId,timeId],
  // 监视到数据变化后执行的回调函数
  (newValue, oldValue) => {
    // 在此处执行相应的操作
    if(newValue[0] != ''  && newValue[1] != ''){
      uni.showLoading({
        title: '获取价格中...',
      });
      // "8d33255162dc5b22001ef71c302a450b"
      //调用获取价格接口
      getPrice({hpv_id:router_value._id,combo_id:comboId.value,time_id:timeId.value})
      uni.hideLoading()
    }
  }
);
//获取性别
let  gender = ref('')
function changeSex(event:any){
  gender.value = event.detail.value == '0' ? '男' : '女'
}
//获取出生日期
let born_date = ref('')
function changeDate(event:any){
  born_date.value = event.detail.value
}

//定义提交表单数据
let subData = reactive({
  name:'',
  id_card:'',
  gender,
  born_date,
  phone:'',
  combo:combo_name,
  ino_time:combo_time,
  price,
  hpv_name:toRefs(router_value).name, //？不理解
})
//提交订单
async function subMit(){
  console.log(router_value.name)
  uni.showLoading({title:'提交中...',mask:true})
  let res:any = await RequestApi.Reshpv(subData)
  console.log(res)
  if(res.statusCode == 200){
    uni.hideLoading()
    //关闭当前页面，跳转到指定页面
    uni.redirectTo({
       url:'/pages/my-service/hpv-view/index'
    })
  }
}
</script>

<style scoped lang="scss">
/* 表单提交 */
@import url('@/common-style/form.css');
page{
  background-color: #fafafa;
}
.hpv-choose{
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 20rpx;
  margin-bottom: 40rpx;
}
.hpv-type{
  font-size: 35rpx;
}
.hpv-age{
  display: flex;
  align-items: center;
}
.hpv-age text{
  background-color: #f4f6fa;
  padding: 7rpx;
  font-size: 25rpx;
  margin: 10rpx 10rpx 10rpx 0;
}
.hpv-price{
  font-weight: bold;
  color: #ff5f2c;
}
/* 套餐 */
.combo-view{
  background-color: #ffffff;
  padding: 20rpx;
  margin: 20rpx 0;
}
.combo-title{
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}
.combo-list{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.combo-list text{
  padding: 20rpx 40rpx;
  background-color: #f5f5f5;
  margin: 0 20rpx 20rpx 0;
  border-radius: 10rpx;
  display: block;
}
/* 选中加上样式 */
.checkstyle{
  background-color: #2c76ef !important;
  color: #ffffff !important;
}

</style>