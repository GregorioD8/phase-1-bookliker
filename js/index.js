let list = document.querySelector('#list')
let showDiv = document.querySelector('#show-panel')
let li2 = document.createElement('li')
//logged in user
myUserInfo = {id: 1, username: 'pouros'}

let likerArr = []
let myLike = false
let bookId = 0
let li


function getBooks(){
fetch('http://localhost:3000/books')
.then(res => res.json())
.then(data => renderBooks(data))
}


function renderBooks(books){
    
    for(let book of books){

       li = document.createElement('li')
       li.innerText = book.title
        list.appendChild(li)
        li.addEventListener('click', (e) => {
            showDiv.replaceChildren()
        
            let card = document.createElement('card')
           
            let image = document.createElement('img')
            let a1 = document.createElement('h2')
            let a2 = document.createElement('h3')
            let a3 = document.createElement('h4')
            let p = document.createElement('p')
            let ul = document.createElement('ul')
            let likeBtn = document.createElement('button')

            image.src = book.img_url
            a1.innerText = book.title
            a2.innerText = book.subtitle
            a3.innerText = book.author
            p.innerText = book.description
            likeBtn.innerText = 'like'

            card.appendChild(image)
            card.appendChild(a1)

            if(book.subtitle != "" ){
            card.appendChild(a2)
           }
           
            card.appendChild(a3)
            card.appendChild(p)
            card.appendChild(ul)
            ul.appendChild(li2)
            ul.appendChild(likeBtn)
            card.appendChild(ul)
            showDiv.appendChild(card) 
            likerArr = book.users.map(user => user)

            showLikes()
            bookId = book.id
            likeBtn.addEventListener('click', updateLikes)
     
        })
        li.addEventListener('mouseover',mouseOverFunction)
        li.addEventListener('mouseout', mouseOutFunction)
          
    }
}


function showLikes(){

li2.replaceChildren()
likerArr.forEach(el => {
    let t = document.createElement('li')
    t.innerText= `${el.username}`
     li2.appendChild(t)
 })
}

//like or unlikes the book
function updateLikes(){
   
    let found = likerArr.find(element => element.username === myUserInfo.username)

        if(found){
            i = likerArr.indexOf(myUserInfo)
            likerArr.splice(i, 1)
        } else {
            likerArr.push(myUserInfo)        
        }

        let userObj = {users: likerArr}
    
    fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj)
        })
        .then(res => res.json())
        .then(likers => console.log(likers))
        showLikes()
       
    }

    let mouseOverFunction = function () {
       this.style.color = 'red'
    }
    let mouseOutFunction = function () {
       this.style.color = 'black'; 
    }
    
    getBooks()