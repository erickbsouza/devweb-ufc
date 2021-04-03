const fetch = require('node-fetch');

domain = "http://api.positionstack.com/v1";
forwardEndPoint = "/forward"
accessKey = 'e8fd3ed427a17543e70389310f30623f'


exports.getCoordinates = async (location) => {
    url = `${domain}${forwardEndPoint}?access_key=${accessKey}&query=${location}`;
    var response = await fetch(url)
    try {
        var response = await response.json();
        data = response.data[0];
        return {
            latitude: data.latitude,
            longitude: data.longitude
        };
    } catch (e){
        console.log(e);
        return {latitude: 0, longitude: 0};
    }
}