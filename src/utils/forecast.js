const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2f209d2c89cfa195c1fe59828acd26ed&query= '+latitude + ',' + longitude + '&units=m'

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location.', undefined)
        } else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const humidity = body.current.humidity
            const weatherDescription = body.current.weather_descriptions[0]
            const foreCastData = weatherDescription + '. It is currenlty ' + temperature + ' degrees. It feels like ' + feelslike + ' degrees. The humidity of the air is ' + humidity
            callback(undefined, foreCastData)
        }
    })
}

module.exports = forecast