document.addEventListener("click",(e)=>{
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