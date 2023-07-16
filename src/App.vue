<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  //获取胶囊按钮的宽度和高度并放在缓存中
  let res = uni.getMenuButtonBoundingClientRect()
  uni.setStorageSync('MenuButton',res)
  let getRes = uni.getStorageSync('MenuButton')
  if(!getRes){
    let res = uni.getMenuButtonBoundingClientRect()
    uni.setStorageSync('MenuButton',res)
  }
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
