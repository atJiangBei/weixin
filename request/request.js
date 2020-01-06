const { domain } = require('./../utils/config')
module.exports = function(options){
	return new Promise((res,rej)=>{
		wx.showLoading()
		wx.request({
			url:domain + options.url,
			data:options.data,
			header:{
				'content-type':'application/json'
			},
			method:options.method,
			success(data){
				if(data && data.data && data.data.state===1){
					res(data.data.data)
				}else{
					rej(data)
				}
			},
			fail(err){
				rej(err)
			},
			complete(){
				wx.hideLoading()
			}
		})
	})
}
