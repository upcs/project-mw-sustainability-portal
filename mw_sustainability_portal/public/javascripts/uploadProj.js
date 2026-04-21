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

        const response = await fetch("/upload_new_proj",
             {method: "POST",
                 headers: { 
                    "Accept" : "application/json"
                 },
                  body: fd});
        const data = await response.json();


        if(!response.ok){
            alert(data.message || "Upload fail");
            return;
        }

        
    });
    


});

