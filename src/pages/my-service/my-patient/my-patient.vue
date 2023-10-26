<template>
  <!--  -->
    <view class="patient-infor" v-for="item in patient" :key="item.id_card" @click="checkedDate(item.name,item._id)">
        <view class="patient-flex">
            <text class="patient-name">{{ item.name }}</text>
            <text class="patient-text">{{ item.relation }}</text>
        </view>
        <view class="patient-flex patient-sex">
            <text>{{ item.sex }}</text>
            <text>{{ item.age }}</text>
            <text>{{ item.phone }}</text>
        </view>
    </view>
    <point :show="show" :title="title"></point>
    <view style="height: 300rpx;"></view>
    <view class="submit">
        <text @click="cancle">取消</text>
        <text @click="addPatient">添加就诊人</text>
    </view>
</template>


<script setup lang="ts">
import point from '@/com-components/point.vue'
import {ref,reactive,onMounted} from 'vue'
import {RequestApi} from '@/public/request'
import {GetPatient} from '@/public/decl-type.d'
import {onShow} from '@dcloudio/uni-app'
import {myData} from '@/store/index' 
import { storeToRefs } from 'pinia'
//是否显示“暂无数据”组件以及标题
let show =ref(false)
let title = ref("暂无就诊人信息") 
//存储获取的就诊人信息
let patient = ref<GetPatient[]>([])
 onShow(async()=>{
    console.log('我执行了')
    //获取就诊人信息
    let  getPatient:any = await RequestApi.GetPatient()
    // console.log(getPatient)
    show.value = getPatient.data.data.length<=0?true:false
    patient.value = getPatient.data.data
})
//取消
function cancle(){
  uni.navigateBack({
		delta:1,//返回层数，2则上上页
	})
}
//添加就诊人信息
function addPatient(){
  uni.navigateTo({
	  url: '/pages/my-service/my-patient/add-patient'
})
}
//选择就诊人返回上一页面
const store = myData()
function checkedDate(name:string,_id:string){
  store.addPatient({name,_id})
  //返回上一页
  uni.navigateBack({delta:1})
}
</script>

<style lang="scss">
@import url('../../../common-style/form.css');
page{
  background-color: #f6f6f6;
}
.patient-infor{
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 15rpx;
  font-size: 28rpx;
}
.patient-flex{
  display: flex;
  align-items: center;
  padding: 20rpx;
}
.patient-name{
  font-size: 35rpx;
  font-weight: bold;
}
.patient-flex text{
  margin-right: 15rpx;
}
.patient-text{
  background-color: #d6f3ff;
  color: #78beff;
  padding: 2rpx 15rpx;
}
.patient-sex{
  color: #7c96af;
}
</style>