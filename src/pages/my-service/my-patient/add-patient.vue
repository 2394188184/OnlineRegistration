<template>
    <view>
      <view class="AI-card" @click="uploadId">
        <img src="@/static/other/AI-shibie.svg" mode="widthFix"/>
        <text>身份证智能识别</text>
      </view>
      <view class="xinguan-view">
        <view class="xinguan-flex">
          <text>真实姓名</text>
          <input placeholder="请输入名称" placeholder-class="input-style" v-model="submitData.name"/>
        </view>
        <view class="xinguan-flex">
          <text>性别</text>
          <picker mode="selector" :range="['男','女']" class="flex-left" @change="changeSex"> 
            <view>
             <text>{{ submitData.sex == ''? '请选择性别' : submitData.sex  }}</text> 
              <img  src="@/static/other/gengduo.svg"/>
            </view>
          </picker>
        </view>
        <view class="xinguan-flex">
          <text>出生日期</text>
          <picker mode="date" class="flex-left" @change="changeDate"> 
            <view>
              <text>{{ submitData.born == ''? '请选择出生日期' : submitData.born  }}</text>
              <img  src="@/static/other/gengduo.svg"/>
            </view>
          </picker>
        </view>
        <view class="xinguan-flex">
          <text>性别</text>
          <picker mode="selector" :range="['自己','父母','其他']" class="flex-left" @change="changetRelation"> 
            <view>
              <text>{{ submitData.relation == ''? '请选择与成员关系' : submitData.relation  }}</text>
              <img  src="@/static/other/gengduo.svg"/>
            </view>
          </picker>
        </view>
        <view class="xinguan-flex">
          <text>身份证</text>
          <input placeholder="请输入身份证" placeholder-class="input-style" v-model="submitData.id_card"/>
        </view>
        <view class="xinguan-flex">
          <text>手机号</text>
          <input placeholder="请输入手机号" placeholder-class="input-style" type="number" v-model="submitData.phone"/>
        </view>
      </view>
      <view style="height:300rpx"></view>
      <view class="submit">
        <text @click="cancle">取消</text>
        <text @click="addmit">确定添加</text>
      </view>
    </view>
</template>


<script setup lang="ts">
import {ref,reactive} from 'vue'
import {upImage} from '@/public/misc'
import {RequestApi,IDCARDURL} from '@/public/request'
let submitData = reactive({
      name:'',
      sex:'',
      born:'',
      relation:'',
      id_card:'',
      phone:''
})
//识别身份证
async function uploadId(){
  const res:any = await upImage(IDCARDURL,"识别中...","识别失败")
  console.log(res)
  let IdData = JSON.parse(res.data).data
  if(res.statusCode == 200){
    submitData.name = IdData.name
    submitData.sex = IdData.sex
    submitData.born = IdData.born.substring(0,4) + '-' + IdData.born.substring(4,6)+ '-' + IdData.born.substring(6,8)
    submitData.id_card = IdData.id_card
  }else{
    uni.showToast({
      title: `上传图片不为身份证,${IdData}`,
      icon:'none',
      duration: 5000
});
  }
}
//性别
function  changeSex(e:{detail:{value:string}}){
  submitData.sex = e.detail.value == '0' ?'男':'女'
}
//出生日期
function changeDate(e:{detail:{value:string}}){
  submitData.born = e.detail.value
}
//成员关系
function changetRelation(e:{detail:{value:string}}){
  submitData.relation = e.detail.value == '0' ?'自己':e.detail.value == '0'?'父母':'其他'

}
//取消
function cancle(){
  uni.navigateBack({
    delta:1
  })
}
//确定添加
async function addmit(){
  let result:any = await RequestApi.PatientRes(submitData)
  console.log(result)
  if(result.statusCode == 200){
    uni.navigateBack({
      delta:1
    })
  }
}
</script>

<style lang="scss">
@import url('../../../common-style/form.css');
page{
  background-color: #f6f6f6;
}
.AI-card{
  display: flex;
  align-items: center;
  background-color: #ffffff;
  font-size: 35rpx;
  border-radius: 15rpx;
  padding: 30rpx 20rpx;
  margin: 20rpx 20rpx 50rpx 20rpx;
}
.AI-card image{
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
  display: block;
}
</style>