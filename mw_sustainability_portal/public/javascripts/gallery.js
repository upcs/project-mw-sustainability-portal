/* Event Listener */

document.addEventListener("DOMContentLoaded", ()=> {

    /* declaring form and file elements */
    const uploadForm = document.getElementById("uploadForm");
    const fileInput = document.getElementById("file");

    uploadForm.addEventListener("submit", async(e)=>{
        e.preventDefault();

        /* error checking for no files being fed to gallery.html */
        if(!fileInput.files || fileInput.files.length ==0 ){

            alert("choose a file firts, then submit");
            return; //ending process if no file chosen
        }

        const fd = new FormData();
        fd.append("uploadFile", fileInput.files[0]);
        //multer.single("uploadFile");

        const response = await fetch("/upload", {method: "POST", body: fd});
        const data = await response.json();

        if(!response.ok){
            alert(data.message || "Upload fail");
            return;
        }

        //show the uploaded image 
        document.getElementById("mainImage").src = data.url;

    });


});

