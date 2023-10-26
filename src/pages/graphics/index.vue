<template>
    <!-- 多行文本 -->
    <view class="graphics-back">
        <text class="graphics-Title">请详细描述你的病情</text>
        <textarea placeholder="为了更好获得医生帮助，请尽可能详细的描述病情" 
            maxlength="300" placeholder-style="textarea-color" :auto-focus="true" v-model="submitData.illness">
        </textarea>
    </view>
    <!-- 多选框指导用药 -->
    <view>
        <checkbox-group @change="guide">
            <label>
                <checkbox value="cb" :checked="submitData.guide"  color="#0176ff" />需要医生指导用药
            </label>
        </checkbox-group>
    </view>
    <!-- 上传图片 -->
    <view class="graphics-back">
      <text class="graphics-Title">上传检查报告或患者照片</text>
      <view class="pat-image">
        <view class="upload-Image" v-for="(item,index) in submitData.ins_report" :key="index">
          <img :src="item" mode="aspectFill" @click="amplify(index)" />
          <img @click="deleteFile(index)"  src="/static/other/shanchu-goods.svg" mode="widthFix" />
        </view>
        <view @click="upFile"><img src="/static/other/shuxing-img.png" mode="aspectFill" /></view>
      </view>
    </view>
    <!-- 选择就诊人 -->
    <view class="graphics-back"  @click="choosePatient">
      <text class="graphics-Title">选择就诊人</text>
      <view class="patient-view">
        <img src="/static/other/touxiang.svg" mode="widthFix" /> 
        <text>{{ name }}</text>
        <text>{{name ==""?'选择就诊人':'重新选择就诊人'}}</text>
      </view>
    </view>
    <!-- 底部按钮 -->
    <view style="height:300rpx">
      <view class="submit">
        <text @click="cancle">取消</text>
        <text @click="submit">提交</text>
      </view>
    </view>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {upImage} from '@/public/misc'
import {RequestApi,IMAGEURL} from '@/public/request'
import type { Graphics } from '@/public/decl-type'
import {myData} from '@/store/index'
//上传图片
async function upFile(){
  const res:any = await upImage(IMAGEURL,"上传中...","上传失败")
  // console.log(res)
  let phoneUrl = JSON.parse(res.data).data
  submitData.ins_report.push(phoneUrl)
}
//删除图片
function deleteFile(index:number){
  submitData.ins_report.splice(index,1)
}
//放大图片
function amplify(index:any){
  // console.log("放大图片")
  uni.previewMedia({
    sources:[{url:submitData.ins_report[index],type:'image'}]
  })
}
//是否需要医生知道用药
function guide(e:{detail:{value:string[]}}){
    submitData.guide = e.detail.value.length == 0 ? false:true
}
//选择就诊人
function choosePatient(){
  uni.navigateTo({
    url:'/pages/my-service/my-patient/my-patient'
  })
}
//监听数据（就诊人id,就诊人）
let name = ref('') //就诊人
const store = myData()
store.$subscribe((mutayion,state)=>{
  submitData.patient_id = state.patient._id
  name.value = state.patient.name
})

//待提交数据
let submitData = reactive<Graphics>({
  illness:'',
  guide:false,
  ins_report:[],
  patient_id:'',
})
//取消
function cancle(){
  uni.navigateBack({delta:1})
}
//提交
type resObj = {
  statusCode:number
}
async function submit(){
  // console.log(submitData)
  // return false
  uni.showLoading({title:'提交中',mask:true})
  let result:resObj = await RequestApi.Graphics(submitData) as resObj
  if(result.statusCode == 200){
    uni.showToast({title:'提交成功',icon:'none',duration:1000})
  }
}
</script>



<style>
/* 表单提交 */
@import url('../../common-style/form.css');
page {
	background-color: #fafafa;
}
.graphics-back{
  background-color: #ffffff;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 10rpx;
}
.graphics-Title{
  font-size: 35rpx;
  font-weight: bold;
  display: block;
  padding-bottom: 20rpx;
}
textarea{
  width: 100%;
  height: 250rpx;
}
.textarea-color{
  color: #00c8c8;
}
/* 上传图片 */
.pat-image{
	display: flex;
	flex-wrap: wrap;
}
.pat-image view{
	width: calc(33.3% - 5rpx*2);
	height: 200rpx;
	margin: 5rpx;
}
.pat-image image{
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 7rpx;
}
.upload-Image {
	position: relative;
}
.upload-Image image:nth-child(2){
	width: 30rpx !important;
	height: 30rpx !important;
	position: absolute;
	top: 0;
	right: 0;
}
/* 选择就诊人 */
.patient-view{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.patient-view image{
  width: 120rpx;
  height: 120rpx;
}
.patient-view text:nth-child(2){
  flex: 1;
  padding: 0 50rpx;
  font-weight: bold;
}
.patient-view text:nth-child(3){
  color: #2c76ef;
}
</style>