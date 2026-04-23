//const bcrypt = require("bscryptjs");
/**
 * 3/16/26
 * collect user and pass entered when the user clicks login
 * hash the pass
 * send post to login.js (like orders.js)
 */

// Client side fetch request for POST on server — make this a login
//async function trylogin() {
async function trylogin() {


    //store the entered user and pass
    let user=document.getElementById("user").value;
    let password=document.getElementById("pass").value;
    let hashpass = simple_hash(password);
    //alert(hashpass);
    console.log("starting try catch");

    const postData = {user: user, pass: password};
    const jsonBody = JSON.stringify(postData);
    //change month to numbers here
    //Client-side post handling, use full url to access orders.js
    try {
    const response = await fetch('mylogin', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
        body : jsonBody,
    });
    if (!response.ok) {
        //alert("response not ok");
        throw new Error(`HTTP error! status: ${response.status}`);
        
    }
    
    const data = await response.text();
    document.body.innerHTML = data;

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Incorrect login or error');
    }
}

function simple_hash(str) {
  let hash = 5381; // Prime starting point
  for (let i = 0; i < str.length; i++) {
    // Shifting (hash << 5) + hash is equivalent to hash * 33
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // Force unsigned 32-bit integer
}