const container = document.querySelector('.container');
const logIn = document.querySelector('.logIn');
const createCard = document.querySelector('.create-card');
const closeBtn = document.querySelector('.close-btn');
const newTitle = document.querySelector('#newTitle');
const newDetails = document.querySelector('#newDetails');
const btn = document.querySelector('.btn');

let titleString = '';
let detailString = '';
let counter = 1;


// login animations
logIn.addEventListener('click', (e) => {
    e.preventDefault();
    logIn.classList.add('logged');
    store();
    const tl = gsap.timeline();
    tl
        .to('.title', {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: 'Expo.easeInOut',
            delay: 1
        })
        .to('.slogan', {
            opacity: 0,
            y: -30,
            ease: 'Expo.easeInOut',
            duration: 0.5
        })
        .to('.logIn', {
            opacity: 0,
            y: -30,
            ease: 'Expo.easeInOut',
            duration: 0.5,
            display: 'none'
        })
        .to('.creator-box', {
            display: 'block',
            delay: .3,
        })
        .from('.header', {
            y: -100,
            ease: 'Expo.easeInOut',
            duration: 0.5,

        })
        .from('.main-title', {
            x: -300,
            duration: 0.5,
            opacity: 0,
            ease: 'Expo.easeInOut',

        })
        .fromTo('.card-box', {
            opacity: 0,
            y: -20,
            ease: 'Expo.easeInOut',
        },
            {
                opacity: 1,
                y: 0,
                ease: 'Expo.easeInOut',
            })

});

// form animations
createCard.addEventListener('click', () => {
   formViewer();
});

// function to show form to user, animation
function formViewer() {
     tl2 = gsap.timeline();
    tl2.to('.form-box', {
        display: 'flex',
        ease: 'Expo.easeInOut'
    })
    .fromTo('.todo-form', {
        display: 'none',
        opacity: 0,
        y: -70,
        ease: 'Expo.easeInOut',
        delay: .5,
    }, {
        display: 'block',
        ease: 'Expo.easeInOut',
        y: 0,
        delay: .5,
        opacity: 1
    })
        
        // form close button function to hide form
    closeBtn.addEventListener('click', () => {
        formHider();
    })
    
}
// function to hide form to user, animation
function formHider() {
    tl2.reverse();
}


// get user input title value and store it
newTitle.addEventListener('keyup', (e) => {
    titleString = e.target.value;
});

// get user input details value and store it
newDetails.addEventListener('keyup', (e) => {
    detailString = e.target.value;
});

// function to save created note
btn.addEventListener('click', (e) => {
    e.preventDefault();
    counter++;
    // checking wether title is empty or not
    if (titleString.length <= 0) {
        newTitle.focus();
    }
    // checking wether details is empty or not
    else if (detailString.length <= 0) {
        newDetails.focus();
    }
    // if those are not empty it create a card item and store those value in it and show it to user screen
    else {
        let cardData = `
        <span onclick="return this.parentNode.remove();" id="${counter}">
            <svg class="delete" viewBox="0 0 448 512" >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
        </span>
        <h3 class="card-title">${titleString} </h3>
        <p>${detailString}</p>
        `;
        let newCard = document.createElement('div');
        newCard.classList.add('card', 'card-todo');
        newCard.innerHTML = cardData;
        newCard.id = counter;
        const firstCard = document.querySelector('.create-card');
        firstCard.insertAdjacentElement("afterend", newCard);
        setStore();
        clear(); 
        formHider();

    }
})

// function to save these values as object's array to localstorage so these data will be available to user next time user login
let toDo = [];
function setStore() {
    let newToDo = {
        title: titleString,
        detail: detailString,
        id: counter,
    }
    toDo.push(newToDo);
    localStorage.setItem('todo',JSON.stringify(toDo))
    
}

// function to check is there any data saved in localstorage or not if available show it to user screen
function store() {
    let ls = localStorage.getItem('todo');
    let prs = JSON.parse(ls)

    if (prs != null) {
       prs.forEach((e) => {
        let cardData = `
        <span  class="dlt" id="${e.id}" onclick="return this.parentNode.remove();">
            <svg class="delete" viewBox="0 0 448 512" >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
        </span>
        <h3 class="card-title">${e.title} </h3>
        <p>${e.detail}</p>
        `;
        let newCard = document.createElement('div');
        newCard.classList.add('card', 'card-todo');
        newCard.innerHTML = cardData;
        newCard.id = e.id;
        const firstCard = document.querySelector('.create-card');
        firstCard.insertAdjacentElement("afterend", newCard);
       });
    }else{
        toDo = []
    }

}

// function to clear inputs after saving the note
function clear() {
    titleString = '';
    detailString = '';
    newTitle.value = '';
    newDetails.value = '';
}
