//pinia
import { defineStore } from 'pinia'
interface Patient{
    name:string;
    _id:string
}
export const myData = defineStore('my_data', {
    //定义仓库
    state: () => ({ 
        patient:{} as Patient
    }),
    //方法
    actions:{
        //调用传值给state ==>patient
        addPatient(value:Patient){
            this.patient = value
        }
    }
})