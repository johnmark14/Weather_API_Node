const axios = require('axios').default

const weather =  (address, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=ef2d70c5547ecea66a22576dc60a01fe&query=${address}`

    axios.get(url).then(function(response) {
        if(response.data.error) {
            callback(`Error Code: ${response.data.error.code} | Error Info: ${response.data.error.info}`, undefined)
        } else {
            callback(undefined, response.data)
        }
    })
}

module.exports = weather