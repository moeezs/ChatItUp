let name = prompt("Enter your name")

while (!name) {
    name = prompt("Enter your name")
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, get, push, onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmGTRjx_HU0mcJMiOhhVC0Y3z7XD5SIxs",
  authDomain: "chatitup-9c91b.firebaseapp.com",
  databaseURL: "https://chatitup-9c91b-default-rtdb.firebaseio.com/",
  projectId: "chatitup-9c91b",
  storageBucket: "chatitup-9c91b.appspot.com",
  messagingSenderId: "69200920409",
  appId: "1:69200920409:web:707172098cbaa37b3f1648"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const chatInput = document.getElementById("chatbox");
const sendBtn = document.getElementById("sendbtn");
const chatView = document.getElementById("allchats")

sendBtn.onclick = sendMessage;
chatInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

let today = new Date();
let time = today.getHours() + ":" + today.getMinutes()

function sendMessage() {
    let message = chatInput.value;
    if (message) {
        insertMessage(message);
        getDataUpdate();
        chatInput.value = ""
    }
}

function insertMessage(message) {
    const messageListRef = ref(db, 'messages');
    const newMessageRef = push(messageListRef);
    set(newMessageRef, {
        name: name,
        time: time,
        message: message
    });
}



function updateScreen(obj) {
    chatView.innerHTML = ""
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {

            var val = obj[key];

            const div_box = document.createElement('div');
            if (val.name === name) {
                div_box.setAttribute('class', 'mine');
            } else {
                div_box.setAttribute('class', 'other');
            }
            
            const name_box = document.createElement('h3');
            name_box.setAttribute('id', 'name');
            const message_box = document.createElement('p');
            message_box.setAttribute('id', 'message');
            const delete_btn = document.createElement('button');
            delete_btn.setAttribute('id', 'delete');

            message_box.innerHTML = val.message;
            name_box.innerHTML = val.name;

            div_box.appendChild(name_box);
            div_box.appendChild(message_box);
            if (val.name === name) {
                div_box.appendChild(delete_btn)
            }

            chatView.appendChild(div_box);

    }
    
}
}

setInterval(function() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `messages/`)).then((snapshot) => {
    if (snapshot.exists()) {
        updateScreen(snapshot.val())
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

}, 2000);

function getDataUpdate() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `messages/`)).then((snapshot) => {
    if (snapshot.exists()) {
        updateScreen(snapshot.val())
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
}