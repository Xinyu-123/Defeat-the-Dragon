import Noti from './notification';
import Button from './Button';
import Enemy from './Enemy';

import $ from 'jquery';
import * as app from './app';

const ButtonFunc = require('./buttonFunctions');

export let enemy;
export let stoke_btn;
export let att_btn;
export let def_btn;

export function setUpGame() {

    setTimeout(() => {
        $('.flame').animate({opacity: 0.2}, 1000, 'linear');

    }, 500);

    //Replace all of this by calling a new module that will create the game state

    setTimeout(() => {
        stoke_btn = new Button({
            id: 'stoke-fire',
            text: 'stoke fire',
            click_events: [ButtonFunc.stoke_fire, updateScreen1],
            cooldown: 2
        });

        $(stoke_btn._element).hide().appendTo('div#intro-btn').fadeIn(2000);
        Noti.stoke_flame()

    }, 4000);


}

export function createEnemy(options){
    enemy = new Enemy(options);
    // $('.interaction-container').hide().appendTo(enemy._element).fadeIn(1000);
    $(enemy._element).hide().appendTo('.interaction-container').fadeIn(1000);
}

export function defeatEnemy(enemy){
    console.log(enemy);
    if(enemy._health <= 0){
        console.log(`you have defeated ${enemy._type}`);
    }
    
}

export function updateFlame() {
    let flame = $('.flame');
    let health = app.player._health;
    
     //Change the flame's opacity and animation to reflect the players health
     flame.on('webkitAnimationIteration mozAnimationIteration AnimationIteration', function() {
        if(health < 25){
            flame.attr('id', 'flame-sm');
            flame.attr('opacity', '0.1');
        }
        if(health < 50 && health >= 25){
            flame.attr('id', 'flame-md');
            flame.attr('style', 'opacity: 0.4');
        }
        if(health < 75 && health >= 50){
            flame.attr('id', 'flame-lg');
            flame.attr('style', 'opacity: 0.7');
        }
        if(health >= 75){
            flame.attr('id', 'flame-xl');
            flame.attr('style', 'opacity: 1');
        }
    });
}

// text.animate({opacity: 1}, 100, 'linear', function() {
//     //clear the overflowed notifications
//  });

export function updateScreen1(){

    if(app.player._health == 100){
        $('.interaction-container').css('border-color', 'rgba(255,255,255,0.5)');

        updateScreen2();
        $(stoke_btn._element).off('click', updateScreen1)
    }
}

export function updateScreen2() {

    let flame = $('#intro-fire');
    let btn = $('#intro-btn');
    let container = $('.items-container')
    flame.animate({opacity: 0}, 1000, 'linear', () => {
        setTimeout(() => {
            flame.appendTo(container);

            flame.animate({opacity: 1}, 1000, 'linear')
        }, 1000)
    })

    btn.animate({opacity: 0}, 1000, 'linear', () => {
        setTimeout(() => {
            btn.appendTo(container);
            btn.animate({opacity: 1}, 1000, 'linear')
        }, 1000)

        updateScreen3();
    })
    
}

export function updateScreen3() {
    let container = $('.interaction-container');
    enemy = new Enemy({
        type: 'skeleton',
        attack: 10,
        defence: 2,
        health: 20,
        weapon: 'none',
        image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eabda171-95e1-4698-8410-03017288ab53/dauo6gg-ac9d6d32-2e74-4134-907f-5420e56104dc.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZWFiZGExNzEtOTVlMS00Njk4LTg0MTAtMDMwMTcyODhhYjUzXC9kYXVvNmdnLWFjOWQ2ZDMyLTJlNzQtNDEzNC05MDdmLTU0MjBlNTYxMDRkYy5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.eC7KxwhinKa9veieaPyH13mbSrns3DQOcFn70sAP3rE'
    })

    enemy._element.hide().appendTo(container).delay(2000).fadeIn(2000);

    updateScreen4();
}

export function updateScreen4() {
    let container = $('.interaction-container')
    att_btn = new Button({
        id: 'attack-btn',
        text: 'attack',
        click_events: [ButtonFunc.attack_btn],
        cooldown: 3,
        width: 60
    });

    def_btn = new Button({
        id: 'defence-btn',
        text: 'defend',
        click_events: [ButtonFunc.defend_btn],
        cooldown: 3,
        width: 60
    });

    let cont = $("<div>").addClass('battle-options-container').appendTo(container);

    $(att_btn._element).hide().appendTo(cont).delay(2000).fadeIn(2000);

    $(def_btn._element).hide().appendTo(cont).delay(2000).fadeIn(2000);
    
}

// player = new Player({
//     class: type,
//     attack: 5,
//     defence: 5,
//     weapon: "Shortsword",
//     health: 1
//      });