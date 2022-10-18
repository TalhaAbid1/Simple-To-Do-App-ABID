function insertNewOnDisplay(item){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between mb-1 ">
    <span class="item-text"> ${item.name}</span>
    <div>
      <button data-id=${item._id} class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id=${item._id} class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

let ourHTML = itemz.map(function(item){
    return insertNewOnDisplay(item)
}).join("")
document.getElementById("ul-field").insertAdjacentHTML("beforeend", ourHTML)

let inputValue = document.getElementById("input-field")

document.getElementById("form-field").addEventListener("submit", function(e) {
    e.preventDefault()
    axios.post("/getNewItem", {input: inputValue.value}).then(function(response){
        document.getElementById("ul-field").insertAdjacentHTML("beforeend", insertNewOnDisplay(response.data))
        inputValue.value = ""
        inputValue.focus()
    }).catch()  
})


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