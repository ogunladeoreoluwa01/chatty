console.log("hello class")


//selecting  elements 
//get element group
// const tags = document.getElementsByTagName("h1")
// const id = document.getElementById("two")
// const classes = document.getElementsByClassName("neo") 

// variable





//get element by query
// document.querySelector(".neo")
// document.querySelectorAll("h1")


//changing elements#
// console.log(tags)

// id.textContent = "<u>damien</u>"
// tag.innerHTML ="<u>damien</u>"
// id.setAttribute("style", "color: red;")
// id.removeAttribute("style")
// id.setAttribute("style", "text-align: center;")
// id.classList.add("rom")
// id.classList.remove("rom")
// id.classList.toggle("rom")
// id.style.color = "blue"
// id.style.textAlign = "center"
// id.style.backgroundColor = "yellow"
// id.style.textDecoration = "underline"


//creating elements


let persons =[ {
    name:"damien",
    age:23,
    userprofil:{
        username:"damien",
        password:"1234"
    },
    greet: function (age,name)  {
        console.log(`hi ${name} im ${this.userprofil.} and im ${this.age} years old cool ur ${age}`)
    }
}]

persons[0].greet(22,"john")



