login = function(event) {
    let user=document.getElementById("user").value;
    let password=document.getElementById("pass").value;
    const payload = { 
        username: user,
        password: password,
        role: `admin`
    }
    $.post({ //takes json file from
            url: "http://localhost:3000/authRoutes/login", // Change to your API endpoint
            data: JSON.stringify(payload),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .done(function (response) {
            const obj = (response);
            alert("Login Success");
        })
        .fail(function (xhr, status, error) {
            alert("Invalid Login", error);
        });
}



register = function(event) {
    let user=document.getElementById("user").value;
    let password=document.getElementById("pass").value;
    const payload = { 
        username: user,
        password: password,
        role: `admin`
    }
    
    $.post({ //takes json file from
            url: "http://localhost:3000/authRoutes/register", // Change to your API endpoint
            data: JSON.stringify(payload),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .done(function (response) {
            const obj = (response);
            alert("success");
        })
        .fail(function (xhr, status, error) {
            alert("Unavailable Username", error);
        });
}

$(function() { //event handler
    $("#submitButton1").click(login)
});

$(function() { //event handler
    $("#submitButton2").click(register)
});



/*function takeinfo() {
    let user=document.getElementById("user").value;
    let password=document.getElementById("pass").value;
    if (user == "user") {
        document.getElementById("check1").innerHTML="ok user";
    }
    else {
        document.getElementById("check1").innerHTML="BAD USER";
    }

    if (password == "pass") {
        document.getElementById("check2").innerHTML="ok pass";
    }
    else {
        document.getElementById("check2").innerHTML="BAD PASS";
    }
}*/



async function getProjects(){
    const response = await fetch('/projects');
    const data = await response.text();
    document.body.innerHTML = data;
}

async function getProjectsPost(){
    try {
        const response = await fetch('projects', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
    
        document.body.innerHTML = data;

    } catch (error) {
        //console.error('Error fetching data:', error);
    }
}

async function renderPage() {
    //var data = {info : project};
    //var jsonBody = JSON.stringify(data);
    try {
        const response = await fetch('render_project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonBody
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
    
        document.body.innerHTML = data;
    } catch (error) {
        //console.error('Error fetching data:', error);
    }
}