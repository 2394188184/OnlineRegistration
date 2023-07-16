<template>
    <view class="Login-page">
        <img mode="aspectFill" src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg" />
        <button @click="Login">授权登录</button>
    </view>
</template>
<script setup lang="ts" >
    import {ref,onMounted,reactive,toRefs} from 'vue'
    import {RequestApi} from '@/public/request'
    //授权登录
    function Login(){
        uni.getUserProfile({
            desc:'获取用户个人信息',
            success:(res)=>{
                console.log(res)
                let {avatarUrl,nickName} = res.userInfo
                uni.login({
                    success:(code)=> {
                        console.log(code);
                        uni.showLoading({
	                        title: '加载中',
                            mask:true
                        });
                        //获取数据成功，调用apiLogin接口
                        APILogin(avatarUrl,nickName,code.code)
                    },
                    fail:(err)=>{
                        uni.showToast({
                            title: '登录失败',
                            icon:'none',
                            duration: 1000
                        });
                    }
                });
            },
            fail:(err)=>{
                uni.showToast({
                    title: '登录失败',
                    icon:'none',
                    duration: 1000
                });
            }
        })
    }
    //调用api接口登录
    async function APILogin(avatarUrl:string,nickName:string,code:string){
        try {
            let  obj = {appid:'wx6c7166dbcc3ec56c',secret:'cf8f012c44b04fc475ba80b5b76f1910',nickName,avatarUrl,code}
            let res:any = await RequestApi.Wxlogin(obj)
            // 存储用户信息到本地，返回上一页
            uni.setStorageSync('wxuser',res.data.data)
            console.log(res)
            setTimeout(() => {
                uni.hideLoading();
                uni.navigateBack({delta:1})
            }, 600);
        } catch (error) {
            uni.showToast({title: '登录失败',icon:'none',duration: 1000});
        }
    }
</script>
<style lang="scss" scope>
    .Login-page{
    position: relative;
    height: 100vh;
    overflow: hidden;
    }
    .Login-page image{
    width: 100%;
    height: 100%;
    }
    .Login-page button{
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    bottom: 30%;
    background-color: #2c76ef;
    color: #ffffff;
    padding: 0 100rpx;
    font-size: 35rpx;
    }
    checkbox .wx-checkbox-input{
        border-radius: 50%;/* 圆角 */
        width: 30rpx; /* 背景的宽 */
        height: 30rpx; /* 背景的高 */
    }
    /* 选中后的 背景样式*/
    checkbox .wx-checkbox-input.wx-checkbox-input-checked{
        border: 1rpx solid #2c76ef;
        background: #2c76ef;
    }
    checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
        border-radius: 50%;/* 圆角 */
        width: 30rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
        height: 30rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
        line-height: 30rpx;
        text-align: center;
        font-size:20rpx; /* 对勾大小 30rpx */
        color:#fff; /* 对勾颜色 白色 */
        background: transparent;
        transform:translate(-50%, -50%) scale(1);
        -webkit-transform:translate(-50%, -50%) scale(1);
    }
    .protocol-view{
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    bottom: 27%;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
    }
    .protocol-tip{
    color: #2c76ef;
    }
    /* 弹窗 */
    .tip-view{
    padding-bottom: 50rpx;
    }
    .tip-title{
    text-align: center;
    font-size: 35rpx;
    font-weight: bold;
    padding: 20rpx 0;
    }
    .tip-view text{
    display: block;
    padding: 20rpx;
    font-size: 27rpx;
    }
</style>