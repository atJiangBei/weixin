const request = require('./../request/index.js')
const login = () => {
	return new Promise((resolve, reject) => {
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				request.getOpenid({
					code: res.code
				}).then(res => {
					wx.setStorageSync('user',res)
					resolve(res)
				}).catch(e => {
					reject(e)
				})
			},
			fail() {
				wx.showToast('请关闭小程序，重新进入')
				reject(e)
			}
		})
	})
}

const check = () => {
	return new Promise((resolve, reject) => {
		wx.checkSession({
			success() {
				//session_key 未过期，并且在本生命周期一直有效
				resolve()
			},
			fail() {
				// session_key 已经失效，需要重新执行登录流程
				//wx.login() //重新登录
				login().then(() => {
					resolve()
				})
			}
		})
	})
}

exports.login = login;
exports.check = check;
