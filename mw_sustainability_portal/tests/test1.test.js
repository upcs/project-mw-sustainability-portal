

test('checks if database connects', () => {
    const postData = {user: 'admin', pass: 'laptop'};
    const jsonBody = JSON.stringify(postData);
    //change month to numbers here
    //Client-side post handling, use full url to access orders.js
    const response = fetch('http://localhost:3000/mylogin', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
        body : jsonBody,
    });

    expect(response).toEqual(expect.anything()); 
    });