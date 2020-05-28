import Noti from './notification';
import Button from './Button';
import Enemy from './Enemy';
import * as ButtonFunc from './buttonFunctions'
import $ from 'jquery';
import * as app from './app';


export let enemy;
export let stoke_btn


export function setUpGame() {
    setTimeout(() => {
        $('.flame').animate({opacity: 0.2}, 1000, 'linear');

    }, 500);

    //Replace all of this by calling a new module that will create the game state

    setTimeout(() => {
        stoke_btn = new Button('stoke-fire', 'stoke fire', [ButtonFunc.stoke_fire, updateScreen1], 2);
        stoke_btn._element.appendTo('div#intro-btn');
        $(stoke_btn._element).animate({opacity: 0.5}, 2000, 'linear')
        Noti.stoke_flame()
        
    }, 4000);


}

export function createEnemy(options){
    enemy = new Enemy(options);
    console.log('im at the createEnemy()')
    // $('.interaction-container').hide().appendTo(enemy._element).fadeIn(1000);
    $(enemy._element).hide().appendTo('.interaction-container').fadeIn(1000);
}

export function defeatEnemy(enemy){

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
        console.log(stoke_btn)
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
}

// player = new Player({
//     class: type,
//     attack: 5,
//     defence: 5,
//     weapon: "Shortsword",
//     health: 1
//      });