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
    let newWindow = window.open("projects.html", "_self");
}

