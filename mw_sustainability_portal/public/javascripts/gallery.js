/* Landon Harrison Version 0318 */
/* this js file is the middleman between the gallery html and the upload.js file that */
/* uploads files to the database -- done with help from github ai */

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

        console.log("about to initialize formdata");

        const fd = new FormData(uploadForm);
        fd.append("uploadFile", fileInput.files[0]);
        //multer.single("uploadFile");

        const response = await fetch("/upload", {method: "POST", body: fd, headers: { Accept : "application/json" },});
        const data = await response.json();


        if(!response.ok){
            alert(data.message || "Upload fail");
            return;
        }

        

        //show the uploaded image 
        //document.getElementById("mainImage").src = data.asset_route;
        console.log(process.cwd());
        console.log(data.asset_route);
        
        uploadForm.reset();
        fileInput.value ="";

    });
    


});

