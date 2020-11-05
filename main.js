const mqtt = require('mqtt')
const express = require('express')
const app = express()
const port = 3000
var client = mqtt.connect('mqtt://savesrl.ddns.net')

app.use(express.json())
app.use(express.static('public'))
client.on('connect',  () => {
    client.subscribe('temperatura');
    
})

app.post('/setTemp',  (req, res) => {
    console.log('ok')
    if(req.body.temp !== null){
        client.publish('temperatura', req.body.temp.toString())
    }
    res.status('200').send({
        ok: true
    })
        
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic, ': ', message.toString())
})

app.listen(port, () => console.log(`Server listening on port: ${port}`));