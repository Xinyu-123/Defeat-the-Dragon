import Highway from '@dogstudio/highway';
import Fade from './transition';
import Character from './Character';
import Player from './Player'
import Button from './Button';
import $ from 'jquery'

let start_btn = document.getElementById('start-btn');
let character_form = document.getElementById('character-select')
let STOKE_COOLDOWN = 2;
export let player;

start_btn.addEventListener('click', () => {
    let character_class = getCharacterVal(character_form, 'class');
    let type = character_class;
    // console.log({type});
    // console.log(`You've started Your Adventure as a ${type}`);
    player = new Player({
                        class: type,
                        attack: 5,
                        defence: 5,
                        weapon: "Shortsword",
                        health: 1,
                        level: 1
                         });

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
            start_btn.style.position = "initial";
            start_btn.style.right = 0;
            start_btn.style.opacity = 1;
        })
    });
}

export let stoke_fire = () => {
    document.getElementById('stoke-fire').addEventListener('click', () => {
        document.getElementsByClassName('wrapper')[0].style.display = 'block';
    })
}

const H = new Highway.Core({
    transitions: {
        default: Fade
    }
})

// let stoke_fire_btn = new Button('stokefire', 'stoke fire', STOKE_COOLDOWN).appendTo('div#intro-btn');


displaySubmit();
