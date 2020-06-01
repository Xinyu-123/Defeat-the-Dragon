
import Button from './Button';
import Enemy from './Enemy';

import $ from 'jquery';
import * as app from './app';

const ButtonFunc = require('./buttonFunctions');
const Player = require('./Player');
const Util = require('./Utility');
const Noti = require('./notification');

export let enemy;
export let stoke_btn;
export let att_btn;
export let def_btn;
export let battle_count = 1;

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

    }, 4000);


}

export function createEnemy(){

    enemy = new Enemy(Enemy.get_enemy());

    $(enemy._element).hide().appendTo('.interaction-container').fadeIn(1000);
    Noti.create_noti({
        type: 'enemy_appear',
        enemy: enemy._type
    })
    enemy.attack_player();
}

export function defeatEnemy(enemy){

    if(enemy._health <= 0){

        //send notification
        Noti.create_noti({
            type: 'battle_win_noti',
            enemy: enemy
        })

        //remove image element
        $(enemy._element).fadeOut(1000);

        //handle experience
        app.player.gainXP(enemy._xp);
        clearInterval(enemy._attack_int);

        setTimeout(() => {
            createEnemy();
        }, 4000)

        
        module.exports.enemy = null;

        //show reward screen on interaction container
        //proceed.
    }
    
}

export function updateFlame() {
    let flame = $('.flame');
    
     //Change the flame's opacity and animation to reflect the players health
     flame.on('webkitAnimationIteration mozAnimationIteration AnimationIteration', function() {
        let health = app.player._health;
        if(health < 25 && health > 0){
            flame.attr('id', 'flame-sm');
            flame.attr('style', 'opacity', '0.1');
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
        if(health == 0){
            flame.fadeOut(5000);
        }
    });
}

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
        stats: {
            attack: 30,
            defence: 2
        },
        health: 20,
        level: 1,
        weapon: 'fists'
    });

    Noti.create_noti({
        type: 'enemy_appear',
        enemy: enemy._type
    })

    enemy._element.hide().appendTo(container).delay(2000).fadeIn(2000);
    enemy.attack_player();

    updateScreen4();
}

export function updateScreen4() {
    let container = $('.interaction-container')
    att_btn = new Button({
        id: 'attack-btn',
        text: 'attack',
        click_events: [ButtonFunc.attack_btn],
        cooldown: app.player._weapon._cooldown,
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