import axios from 'axios'

export default {

	getUser(){
		return axios.get( 'http://www.mocky.io/v2/5c02bcaa3000003b00bb9398')
			.then(response => {
				return response.data
			})
	}
}