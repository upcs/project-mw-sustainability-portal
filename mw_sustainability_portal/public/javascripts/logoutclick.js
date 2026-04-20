/**
 * handles user clicking logout button, asks backend to delete session
 */

async function logoutclick() {

    try {
    const response = await fetch('logout', {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    },
        body : jsonBody,
    });
    if (!response.ok) {
        alert("response not ok");
        throw new Error(`HTTP error! status: ${response.status}`);
        
    }
    
    const data = await response.text();
    document.body.innerHTML = data;

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data:', error);
    }
}