// 上传图片
function upImage(url:string,successTip:string,errorTip:string){
    return new Promise((resolve,reject)=>{
        uni.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            sizeType:['compressed'],
            success(res) {
            //   console.log(res.tempFiles[0].tempFilePath)
              uni.showLoading({
                title: successTip,
              })  
              uni.uploadFile({
                url,
                filePath: res.tempFiles[0].tempFilePath,
                name: 'file',
                header:{accept:'application/json'},
                success (res){
                // console.log(JSON.parse(res.data).data)
                resolve(res)
                uni.hideLoading()
                },
                fail(error){
                    // console.log(error)
                    uni.showToast({
                        title:errorTip ,
                        icon: 'error',
                        duration: 2000
                      })
                    reject(error)
                }
              })
            }
          })
    })
}

export {upImage}