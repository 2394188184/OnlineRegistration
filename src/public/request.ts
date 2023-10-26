/* 
封装request请求（uni.request）
*/
const baseUrl:string = 'https://meituan.thexxdd.cn/api/'  //默认地址
//获取token
//后端约定加'Basic'+将token进行base64位加密
import { Base64 } from "js-base64";
//获取定义接口类型
import type {HpvCancelapi,ResNuata,NuataCancel,PatientRes,Graphics} from '@/public/decl-type' 
function getToken():string{
    //将缓存中的token获取
    const token:string =  uni.getStorageSync('wxuser').user_Token || ''
    //将token进行加密
    const base64_token:string = Base64.encode(token + ':')
    return 'Basic ' + base64_token
}
const request = (url:string,method:'GET'|'POST',data:Object|String|ArrayBuffer)=>{
    //返回一个promise
    return new Promise((resolve,reject)=>{
        uni.request({
            url:baseUrl+url,
            data:data,
            header:{Authorization:getToken()},
            method:method,
            success:(res:any)=>{
                if(res.statusCode == 200){
                    resolve(res)
                }
                //401访问没有权限，或者登录失效,跳转到登录界面
                else if(res.statusCode == 401){
                    uni.navigateTo({
                        url: '/pages/login-page/index'
                    });
                    reject(res)
                }
                // 400开发者某个字段填写错误
                else if(res.statusCode == 400){
                    uni.showToast({
                        title: '开发者某个字段填写错误',
                        icon:'none',
                        duration: 1000
                    });
                    reject(res)
                }
                //500服务器错误
                else if(res.statusCode == 500){
                    uni.showToast({
                        title: '服务器发生未知错误',
                        icon:'none',
                        duration: 1000
                    });
                    reject(res)
                }
                //202入参错误
                else if(res.statusCode == 202 ){
                    uni.showToast({
                        title: res.data.msg,
                        icon:'none',
                        duration: 1000
                    }); 
                    reject(res)
                }else{
                    uni.showToast({
                        title: '服务器发生未知错误',
                        icon:'none',
                        duration: 1000
                    });
                    reject(res)
                }
            },
            fail:(err:any)=>{
                uni.showToast({
                    title: '服务器发生未知错误',
                    icon:'none',
                    duration: 1000
                });
                reject(err)
            }
        })
    })
}

//以下为接口方法

const RequestApi = {
    /* 
    获取首页数据
    */
    FrontPage:()=>request('frontpage','GET',{}),
    /* 
    获取新冠疫苗预约时段 
    */
    NewAppTime:()=>request('newapptime','GET',{}),
    /* 
    新冠疫苗提交预约
    */
    Rescovid:(data:object)=>request('rescovid','POST',data),
    /* 
        小程序授权登录
    */
    Wxlogin:(data:object)=>request('wx_login','POST',data),
    /* 
        新冠疫苗预约订单  /coviduser_order 
    */
    CoviduserOrder:()=>request('coviduser_order','GET',{}),
    /* 
        消新冠疫苗预约  /covidcancel?query=
    */
    Covidcancel:(data:object)=>request('covidcancel','GET',data),
    /* 
        hpv疫苗列表
    */
   Otuhpv:()=>request('otuhpv','GET',{}),
   /* 
        Hpv疫苗套餐  /hpv_pack
   */
    HpvPack:()=>request('hpv_pack','GET',{}),
    /* 
        查询HPV套餐价格 /hpv_price
    */
    HpvPrice:(data:object)=>request('hpv_price','POST',data),
    /* 
        提交订单  /reshpv 
    */
    Reshpv:(data:object) =>request('reshpv','POST',data),
    /* 
       获取HPV订单数据   /hpvuser_order  
    */
    HpvuserOrder:() => request('hpvuser_order','GET',{}),
    /* 
       取消HPV预约    /hpvcancel
    */
    HpvCancel:(data:HpvCancelapi) => request('hpvcancel','GET',data),
    /* 
        获取核酸页面数据  /nuataget     
    */
    NuataGet:() => request('nuataget','GET',{}),
    /* 
        提交核酸检测预约  /resnuata  post
    */
    ResNuata:(data:ResNuata) => request('resnuata','POST',data),
    /* 
        核酸检测订单    GET   /nuatauser_order 
    */
    NuatauserOrder:()=>request('nuatauser_order','GET',{}),
    /* 
        取消核酸检测预约    GET    /nuatacancel?query= 
    */
    NuataCancel:(data:NuataCancel)=>request('nuatacancel','GET',data),
    /* 
        获取就诊人信息  GET  /get_patient      
    */
    GetPatient:()=>request('get_patient','GET',{}),
    /* 
        提交就诊人  POST  patient_res 
    */
    PatientRes:(data:PatientRes)=>request('patient_res','POST',data),
    /* 
        提交图文咨询 POST   graphics 
    */
    Graphics:(data:Graphics) =>request('graphics','POST',data) 
}
//上传图片地址
let IMAGEURL = baseUrl+"upload_picture"
//上传身份证地址
let IDCARDURL = baseUrl+"ai_card "
export {RequestApi,IMAGEURL,IDCARDURL}