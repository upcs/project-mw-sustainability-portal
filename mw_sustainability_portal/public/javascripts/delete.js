/* Event Listener */
document.addEventListener("DOMContentLoaded", ()=> {
    const delete_ = document.getElementById("del_proj");
    

    console.log("about to enter event listener");

    

    delete_.addEventListener("submit", async(e)=>{
        
        if(confirm("Delete Project Forever?")){
        e.preventDefault();

        /* declaring form and file elements */
        //const uploadForm = document.getElementById("projInput");
        let id = document.getElementById("proj_id").value;


        console.log("about to initialize formdata", id);

        const postData = { proj_id: id };
        const jsonBody = JSON.stringify(postData);
        // const fd = new FormData(projInput);
        // fd.append("uploadFile", name, team, route);
        // //multer.single("uploadFile");

        const response = await fetch("/delete_proj", 
            {method: "POST", 
                headers: {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json", }, 
                body: jsonBody});

        const data = await response.json();


        if(!response.ok){
            alert(data.message || "Upload fail");
            return;
        }
    }
    else{
        window.location.href ="/projects";
    }

        window.location.href ="/projects";
    });
    


});

