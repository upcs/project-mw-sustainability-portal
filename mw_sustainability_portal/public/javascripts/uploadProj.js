/* Event Listener */
document.addEventListener("DOMContentLoaded", ()=> {
    const uploadForm = document.getElementById("projInput");
    //const fileInput = document.getElementById("file");

    console.log("about to enter event listener");

    uploadForm.addEventListener("submit", async(e)=>{
        e.preventDefault();

        // /* declaring form and file elements */
        // //const uploadForm = document.getElementById("projInput");
        // let name1 = document.getElementById("projName").value;
        // let team1 = document.getElementById("projTeam").value;
        // let descrip = document.getElementById("pageDescrip").value;
        // let img = document.getElementById("file").files[0].name;


        const fd = new FormData(uploadForm);

        // /* error checking for no files being fed to gallery.html */
        // if(name1.length ==0 || team1.length ==0 || descrip.length == 0){

        //     alert("add information to form first please");
        //     return; //ending process if no file chosen
        // }

        console.log("about to initialize formdata");
        
        // const fd = new FormData(projInput);
        //fd.append("uploadFile", fileInput.files[0]);
        // //multer.single("uploadFile");

        const response = await fetch("/upload_new_proj", {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: fd
        });

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }

        await handleUploadResponse(response);

        
    });
    


});

async function handleUploadResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        alert(data.message || "Upload failed");
        return;
    }

    // CLEAR FORM + MESSAGE
    if (data.action === "clear") {
        const form = document.getElementById("projInput");
        form.reset();

        showSuccessAlert(data.message || "Project uploaded successfully!");
        return;
    }

    // REDIRECT
    if (data.action === "redirect") {
        window.location.href = data.url;
        return;
    }
}

function showSuccessAlert(message) {
    // create overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.4)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    // create alert box
    const box = document.createElement("div");
    box.style.background = "rgba(255, 255, 255, 0.85)";
    box.style.padding = "30px 40px";
    box.style.borderRadius = "12px";
    box.style.textAlign = "center";
    box.style.fontSize = "22px";
    box.style.fontWeight = "bold";
    box.style.color = "#155724";
    box.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
    box.style.backdropFilter = "blur(6px)";
    box.textContent = message;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // auto remove after 2.5s
    setTimeout(() => {
        overlay.remove();
    }, 2500);
}
