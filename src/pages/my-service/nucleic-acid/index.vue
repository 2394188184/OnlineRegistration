<template>
    <view class="xinguan-view" v-for="(item,index) in orderDate" :key="index">
        <text class="name">{{item.phy_name}}</text>
        <view class="xinguan-order">
            <text>检测人:</text>
            <text>{{item.name}}</text>
        </view>
        <view class="xinguan-order">
            <text>检测地点:</text>
            <text>{{item.address}}</text>
        </view>
        <view class="xinguan-order">
            <text>检测时间:</text>
            <text>{{item.phy_time}} </text>
        </view>
        <view class="xinguan-order">
            <text>订单编号:</text>
            <text>{{item.order_number}}</text>
        </view>
        <view class="reg-price"><text>￥{{ item.price }}</text></view>
        <!-- 取消预约 -->
        <view class="reg-cancel">
            <text @click="cancelCovid(item._id,index)" :class="item.cancel ? '' : 'prevent_style'">{{item.cancel?'取消预约':'已取消预约'}}</text>
        </view>
    </view>
    <!-- 暂无数据:当无数据的时候将show赋值为真 -->
    <point :show="show" :title="aaa" />
    <view style="height:200rpx"></view>
  </template>
  
  <script setup lang="ts">
    // 引入vue的组合式api,引入request请求
    import {ref} from 'vue'
    import { onShow } from '@dcloudio/uni-app'
    // 暂无数据
    import point from '@/com-components/point.vue'
    import {RequestApi} from  '@/public/request'
    import type {NuatauserOrder} from '@/public/decl-type'
    //暂无数据组件(point)提示信息
    let aaa = ref<string>('您还没有订单信息')
    let show = ref<boolean>(false)
    //获取HPV订单数据
    let orderDate = ref<NuatauserOrder[]>([])
    onShow(async()=>{
        const res:any = await RequestApi.NuatauserOrder()
        orderDate.value = res.data.data
        if(res.data.data.length <=0){
            show.value = true
        }
    })
    //取消预约事件
    async function cancelCovid(id:string,index:number){
        //调用取消预约的接口
        const res:any = await RequestApi.NuataCancel({_id:id})
        //将该数据的值该为false,代替刷新页面获取数据
        if(res.statusCode == 200){
            orderDate.value[index].cancel = false
        }
    }
  </script>
  
  <style lang="scss" scoped>
    @import url('@/common-style/vaccine.css');
  </style>