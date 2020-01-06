let isGetToken = false;
let resolves = [];
const {
	domain,
	token_duration
} = require('./../utils/config');
const now = () => Date.now();
const path = '/IntimateAdmin/getToken';


module.exports = () => {
	return new Promise((resolve, reject) => {
		const admintxj_token = wx.getStorageSync('admintxj_token');
		if (!admintxj_token || (admintxj_token && admintxj_token.expires < now())) {
			if (isGetToken) {
				resolves.push(resolve)
			} else {
				isGetToken = true;
				wx.request({
					url: domain + path,
					success(e) {
						if (e.data.state === 1) {
							const token = e.data.data.access_token;
							const admintxj_token = {};
							admintxj_token.expires = now() + token_duration;
							admintxj_token.token = token
							wx.setStorageSync('admintxj_token', admintxj_token)
							resolve(token)
							resolves.forEach(fn => fn(token))
						} else {
							reject(e.data.message)
						}
						isGetToken = false;
					},
					fail(e) {
						reject(e.toString())
						isGetToken = false;
					}
				})
			}
		} else {
			resolve(admintxj_token.token)
		}
	})
}
