const mqtt = require('mqtt')
const express = require('express');
const app = express()
const http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = 80

const client = mqtt.connect('mqtt://savesrl.ddns.net')

app.use(express.json())
app.use(express.static('public'))
client.on('connect',  () => {
    client.subscribe('temperatura');
    
})

app.post('/setTemp',  (req, res) => {
    console.log('ok')
    if(req.body.temp !== null){
        client.publish('setpoint', req.body.temp.toString())
    }
    res.status('200').send({
        ok: true
    })
        
})


app.post('/setSwitch',  (req, res) => {
    console.log('ok')
    if(req.body.on === true){
        client.publish('interruttore', '1')
    }
    else if(req.body.on === false){
        client.publish('interruttore', '0')
    }

    res.status('200').send({
        ok: true
    })
        
})

client.on('message', function (topic, message) {
    if(topic == 'temperatura'){
        io.emit('temperatura', message.toString('utf-8'));
    }
    console.log(topic, ': ', message.toString())
})

http.listen(port, () => console.log(`Server listening on port: ${port}`));


