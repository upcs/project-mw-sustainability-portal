/* Event Listener */
document.addEventListener("DOMContentLoaded", ()=> {
    const uploadForm = document.getElementById("projInput");
    

    console.log("about to enter event listener");

    uploadForm.addEventListener("submit", async(e)=>{
        e.preventDefault();

        /* declaring form and file elements */
        //const uploadForm = document.getElementById("projInput");
        let name1 = document.getElementById("projName").value;
        let team1 = document.getElementById("projTeam").value;
        let descrip = document.getElementById("pageDescrip").value;



        /* error checking for no files being fed to gallery.html */
        if(name1.length ==0 || team1.length ==0 || descrip.length == 0){

            alert("add information to form first please");
            return; //ending process if no file chosen
        }

        console.log("about to initialize formdata");

        const postData = { name: name1, team: team1, decription: descrip };
        const jsonBody = JSON.stringify(postData);
        // const fd = new FormData(projInput);
        // fd.append("uploadFile", name, team, route);
        // //multer.single("uploadFile");

        const response = await fetch("/upload_new_proj", {method: "POST", headers: { Accept : "application/json" }, body: jsonBody});
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
        res.render('newProj');
        //fileInput.value ="";

    });
    


});

