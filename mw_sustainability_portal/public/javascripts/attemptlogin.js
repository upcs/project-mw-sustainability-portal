/**
 * 3/16/26
 * collect user and pass entered when the user clicks login
 * hash the pass
 * send post to login.js (like orders.js)
 */

// //runs when submit button is clicked
// function trylogin(){
//     //store the entered user and pass
//     let user=document.getElementById("user").value;
//     let password=document.getElementById("pass").value;
//     //alert(password)
//     let hashpass = caesarCipher(password, 5); //placeholder method
// }

// Client side fetch request for POST on server — make this a login
async function trylogin() {


    document.getElementById("check1").innerHTML="attmepting login";

    alert("attempting login");
    
    console.log("starting trylogin");

    //store the entered user and pass
    let user=document.getElementById("user").value;
    let password=document.getElementById("pass").value;
    //alert(password)
    let hashpass = hash(password, 5); //placeholder method

    console.log("starting try catch");
    alert("starting try catch");

    const postData = {user: user, pass: password};
    const jsonBody = JSON.stringify(postData);
    //change month to numbers here
    //Client-side post handling, use full url to access orders.js
    try {
    const response = await fetch('login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
        body : jsonBody,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    document.body.innerHTML = data;

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data:', error);
    }
}




/**
 * REMOVE THIS FOR ACTUAL HASHING, IT IS A PLACEHOLDER FOR TESTING ONLY
 * 
 * Encrypts or decrypts a message using the Caesar cipher.
 * @param {string} text - The text to process.
 * @param {number} shift - The number of positions to shift each letter.
 * @returns {string} The processed text.
 */
function hash(text, shift) {
    // Ensure the shift value is within a valid range
    shift = shift % 26;
    if (shift < 0) {
        // Handle negative shifts by adjusting to a positive equivalent shift
        shift += 26;
    }

    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charCode = text.charCodeAt(i); // Get the ASCII/Unicode value

        // Handle uppercase letters (ASCII A=65, Z=90)
        if (charCode >= 65 && charCode <= 90) {
            let shiftedCharCode = ((charCode - 65 + shift) % 26) + 65;
            result += String.fromCharCode(shiftedCharCode);
        }
        // Handle lowercase letters (ASCII a=97, z=122)
        else if (charCode >= 97 && charCode <= 122) {
            let shiftedCharCode = ((charCode - 97 + shift) % 26) + 97;
            result += String.fromCharCode(shiftedCharCode);
        }
        // Handle non-alphabetic characters (spaces, punctuation, etc.)
        else {
            result += char;
        }
    }

    return result;
}