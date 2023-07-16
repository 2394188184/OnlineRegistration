/* 这是一个类型声明文件 */
// 首页第一项数据：疫苗预约
export interface Vaccine {
	image: string;
	title: string;
}
// 首页第二项：挂号和体检
export interface Reserve{
    describe: string
    image: string
    title: string
}
//首页第三项：热门挂号
export interface Popular{
    background: string
    dep_id: string
    image: string
    title: string
}
//首页第四项：健康自测
export interface SelfTest{
    describe: string
    image: string
    minute: number
    name: string
    number_of_people: number
    question: number
}
/* 新冠疫苗预约时段 */
interface Time{
    end_time: string
    over: number
    start_time: string
    when: number
}
interface Lasting{
    period:string
    time:Time[]
}
interface Week{
    Have: string
    date: string
    day:  string
}
export interface Newapptime{
    Hospital:string,
    address:string,
    company:string[],
    lasting:Lasting[],
    week:Week[],
} 
/* 
    获取新冠疫苗预约订单
*/
export interface XinguanOrder{
	name:string //姓名
	address:string //接种地点
	cancel:Boolean //是否取消预约：为true没有取消，false:已取消预约
	time:string //下单时间
	company:string //疫苗厂商
	date:string  //预约日期
	period:string //预约时段
	_id:string //疫苗订单id
}
/* 
    获取HPV疫苗列表
*/
// 1.导航栏筛选
export interface Hpvselect{
    _id:string
    name:string
}
// 2.全部疫苗列表
export interface hpvList{
    _id:string
    describe:string[]
    hpv_id:string
    name:string
    price:string[]
}
/* 
    获取HPV疫苗套餐
*/
interface HpvName{
    combo: string
    combo_id: string
}
export interface Hpvcomboname{
    name:HpvName[]
    title:string
    _id:string
}
/* 
    获取预约接种时间
*/
interface HpvTime{
    time: string
    time_id: string
}
export interface Hpvcombotime{
    name:HpvTime[]
    title:string
    _id:string
}
/* 
    获取HPV订单数据
*/
export interface HpvuserOrder{
    name:string
    combo:string
    ino_time:string
    price:number
    hpv_name:string
    time:string
    address:string
    order_number:string
    cancel:Boolean
    _id:string
} 
/* 
    取消HPV预约api
*/
export interface HpvCancelapi{
    _id:string
}