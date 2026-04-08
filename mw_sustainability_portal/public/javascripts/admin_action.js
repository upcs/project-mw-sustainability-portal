/**
 * send a get to ask server for admin only pages
 * or log out
 * variable for whether you want to edit page or
 */

async function admin_action() {

    querylink = "/protected_pages?action=edit_project,projectname=sanitation";

    //info sent to the get in req.body.task:
    const postData = {action: action};
    const jsonBody = JSON.stringify(postData);
    
    //Client-side get handling
    try {
    const response = await fetch('handle_admin_actions', {
    method: 'GET',
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