let start_btn = document.getElementById('start-btn');
let character_form = document.getElementById('character-select')

start_btn.addEventListener('click', () => {
    let val = getCharacterVal(character_form, 'class');
    
    console.log(`You've started Your Adventure as a ${val}`)
})

function getCharacterVal(form, name) {
    let val;
    // get list of radio buttons with specified name
    let radios = form.elements[name];
    // loop through list of radio buttons
    radios.forEach(element => {
        if(element.id == "checked")
            val = element.value;
    })
    return val; // return value of checked radio or undefined if none checked
}


let displaySubmit = () => {
    let radios = character_form.elements['class'];

    radios.forEach(element => {
        element.addEventListener('click', () => {
            let otherElements = document.getElementsByName('class');
            otherElements.forEach(ele => {
                ele.removeAttribute('id')
            })
            element.setAttribute("id", "checked");
            start_btn.style.opacity = 1;
        })
    });
}

displaySubmit();