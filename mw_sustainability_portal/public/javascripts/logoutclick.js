/**
 * handles user clicking logout button, asks backend to delete session
 */

// function logoutclick() {
//     alert("i tried!..........");
// }

// async function logoutclick() {

//     try {
//     const response = await fetch('/logout', {
//     method: 'GET'
//     });
//     if (!response.ok) {
//         alert("response not ok");
//         throw new Error(`HTTP error! status: ${response.status}`);
        
//     }
    
//     const data = await response.text();
//     window.location.href = '/logout';

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         alert('Error fetching data:', error);
//     }
// }

function logoutclick() {
    window.location.href = '/logout';
}