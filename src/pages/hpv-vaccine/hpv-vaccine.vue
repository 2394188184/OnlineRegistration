<template>
    <view class="hpv-img">
        <image src="https://qita-1252107261.cos.ap-chengdu.myqcloud.com/yiliao/gongjinai.jpg" mode="aspectFill" />
    </view>
    <!-- 筛选导航 -->
    <view class="tab-view">
        <view class="tab-toggle" v-for="(item,index) in hpv_select" :key="index" @click="toggle(item._id,index)">
            <text>{{ item.name }}</text> 
            <text :class=" index == checkNumber? 'checked' : '' "></text>
        </view>
    </view>
    <!-- 疫苗列表 -->
    <view class="hpv-list" v-for="(item,index) in hpv_list" :key="index"> 
        <view>
            <view class="hpv-type">{{item.name}}</view>
            <view class="hpv-age">
                <text v-for="(item1,index1) in item.describe" :key="index1">{{item1}}</text>
            </view>
            <view class="hpv-price">￥{{ item.price[0] }} - ￥{{ item.price[1] }}</view>
        </view>
        <view class="hpv-reserve" @click="toReserve(item._id,item.name,item.price,item.describe)">去预约</view>
    </view>
    <!-- 高度 -->
    <view style="height:300rpx"></view>
</template>

<script lang="ts" setup>
    import {ref,onMounted} from 'vue'
    import {RequestApi} from '@/public/request'
    import type  {Hpvselect,hpvList} from '@/public/decl-type'
    let checkNumber = ref<number>(0)
    // 筛选后的列表数据
    let hpv_list = ref<hpvList[]>([])
    //全部列表数据
    let hpv_listAll = ref<hpvList[]>([])
    let hpv_select = ref<Hpvselect[]>([])
    onMounted(async ()=>{
        let res:any = await RequestApi.Otuhpv()
        console.log(res)
        if(res.statusCode == 200){
            hpv_list.value = res.data.data[0].hpv_list
            hpv_listAll.value = res.data.data[0].hpv_list
            hpv_select.value = res.data.data[0].hpv_select
        }
    })
    //切换页签（点击事件）
    function toggle(id:string,index:number){
        checkNumber.value = index
        // 页签等于全部
        if(id == '26da8e4962dc565503df9629704f1700'){
            hpv_list.value = hpv_listAll.value
        }else{
            //根据id过滤数据
            hpv_list.value = hpv_listAll.value.filter(item=> item.hpv_id == id)
        }
    }
    // 去预约跳转页面
    function toReserve(_id:string,name:string,price:string[],describe:string[]){
        let obj:string = JSON.stringify({_id,name,price,describe});
        uni.navigateTo({
            url:'/pages/hpv-vaccine/hpv-buy?value='+obj
        })
    }
</script>

<style scoped lang="scss">
page{
  background-color: #fafafa;
}
.hpv-img{
  height: 350rpx;
}
.hpv-img image{
  height: 350rpx;
  width: 100%;
  display: block;
}
/* tab切换 */
.tab-view{
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
}
.tab-toggle{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100rpx;
  justify-content: center;
  position: relative;
}
.checked{
  width: 50rpx;
  height: 8rpx;
  background-color: #0d7cff;
  position: absolute;
  bottom: 0;
}
/* 疫苗列表 */
.hpv-list{
  background-color: #ffffff;
  margin: 20rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  border-radius: 20rpx;
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
.hpv-reserve{
  align-self: flex-end;
  background-color: #0d7cff;
  padding: 15rpx 30rpx;
  border-radius: 40rpx;
  color: #ffffff;
}
</style>