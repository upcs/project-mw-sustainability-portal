/* Event Listener */
document.addEventListener("DOMContentLoaded", ()=> {

    /* declaring form and file elements */
    const uploadForm = document.getElementById("projInput");
    const name = document.getElementById("projName");
    const team = document.getElementById("projTeam");
    const route = document.getElementById("pageRoute");

    console.log("about to enter event listener");

    uploadForm.addEventListener("submit", async(e)=>{
        e.preventDefault();

        /* error checking for no files being fed to gallery.html */
        if(name .length ==0 || team.length ==0 || route.length == 0){

            alert("add information to form first please");
            return; //ending process if no file chosen
        }

        console.log("about to initialize formdata");

        const fd = new FormData(projInput);
        //fd.append("uploadFile", fileInput.files[0]);
        //multer.single("uploadFile");

        const response = await fetch("/newProj", {method: "POST", body: fd, headers: { Accept : "application/json" },});
        const data = await response.json();


        if(!response.ok){
            alert(data.message || "Upload fail");
            return;
        }

        

        //show the uploaded image 
        //document.getElementById("mainImage").src = data.asset_route;
        // console.log(process.cwd());
        // console.log(data.asset_route);
        
        uploadForm.reset();
        //fileInput.value ="";

    });
    


});

