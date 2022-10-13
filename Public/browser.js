document.addEventListener("click",(e)=>{

    // WORKING OF DELETE BUTTON 
    if (e.target.classList.contains("delete-me")){
        let isTrue = confirm("Are You Sure That You Wanna Delete It?")
        if (isTrue){
            axios.post("/delete", {id:e.target.getAttribute("data-id")}).then((result)=>{
                e.target.parentElement.parentElement.remove()
            }).catch()        
        }
    }

    //WORKING OF EDIT BUTTON
    if (e.target.classList.contains("edit-me")){
        let shotme = e.target.parentElement.parentElement.querySelector(".item-text").innerHTML;
        let newEditedValue = prompt("Enter Your Desired Text", shotme);
        if(newEditedValue){
            axios.post("/update",{updated:newEditedValue , id:e.target.getAttribute("data-id")}).then((result) => {
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = newEditedValue;
            }).catch((err) => {
                // console.log("Im error")
            });
        }
    }
})