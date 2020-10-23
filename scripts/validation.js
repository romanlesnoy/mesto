const newPlaceForm = document.querySelector('.popup__form');

const nameInput = newPlaceForm.querySelector('.popup__input-field');
console.log(nameInput);

nameInput.addEventListener()'input', () => {
    console.log('input');
}

newPlaceForm.addEventListener('submit', ()=>{
    //evt.preventDefault();
    console.log('submit');
    
})

