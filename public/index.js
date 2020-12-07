const sendButton  = document.getElementById('sendButton')
const input = document.getElementById('tempInput');


sendButton.onclick = () => {
    let temp = input.value;
    fetch('/setTemp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            temp
        })

    }).then(res => res.json())
                    .then(res => {
                        console.log(res);
                    })
}

const sendSwitch = (state) => {
    fetch('/setSwitch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            on: state
        })

    }).then(res => res.json())
                    .then(res => {
                        console.log(res);
                    })
}

const socket = io();

socket.on('temperatura', (msg) => {
    document.getElementById('temp').innerHTML = msg;

})