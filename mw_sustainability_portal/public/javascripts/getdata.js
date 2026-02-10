function takeinfo() {
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
}
function changepage(){
    //var myWindow = window.open("", "_self");
    //myWindow.document.write(project.html, "project", "_self");
    let newWindow = window.open("projects.html", "_self");
}

