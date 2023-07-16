<template>
  <view class="point" v-if="show">
    <img src="@/static/other/kongshuju.jpg" mode="widthfix"/>
    <text>{{ title }}</text>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{show:boolean,title?:string}>(),{
  show:false,
  title:'暂无数据'
})

</script>

<style lang="scss" scoped>
.point{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;
  color: #858585;
}
.point image{
  display: block;
  width: 230rpx;
  height: 230rpx;
}
</style>