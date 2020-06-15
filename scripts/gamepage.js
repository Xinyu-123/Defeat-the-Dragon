
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
export let alt_btn;
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
        $(enemy._element).fadeOut(1000, 'linear', () => {
            $(enemy._element).remove();
        });

        enemy.clear_attack();

        if(enemy._type == 'dragon'){
            $('.interaction-container').children('img').fadeOut(1000);
            $('.battle-options-container').children().fadeOut(1000);
            $('.battle-options-container').children().remove()
            setTimeout(victoryScreen, 3000);
        }
        else{
            //handle experience
            app.player.gainXP(enemy._xp);
            

            setTimeout(() => {
                createEnemy();
            }, 4000)
        }


        module.exports.enemy = null;

        //show reward screen on interaction container
        //proceed.
    }
    
}

function victoryScreen(){
    

    enemy = null;
    let you_win = $('<img>').addClass('enemy').attr('src', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/489b3e0c-0a66-4cbf-a094-0c0a64e3d5bf/dct25y8-8a03030d-7832-44d4-bec3-18625bffb70c.png/v1/fill/w_400,h_300,strp/win_screen__by_accaliawolf53_dct25y8-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0zMDAiLCJwYXRoIjoiXC9mXC80ODliM2UwYy0wYTY2LTRjYmYtYTA5NC0wYzBhNjRlM2Q1YmZcL2RjdDI1eTgtOGEwMzAzMGQtNzgzMi00NGQ0LWJlYzMtMTg2MjViZmZiNzBjLnBuZyIsIndpZHRoIjoiPD00MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.cVODqpZulBS7btlTzKcW4tN3oLmZ-Y_KILJNIeZuPkU');
    let play_again_btn = new Button({
        id: 'alt-btn',
        text: 'play again',
        click_events: [ButtonFunc.restart_btn],
        cooldown: 0,
        width: 60
    })

    $(you_win).hide().appendTo('.interaction-container').fadeIn(1000);
    $(play_again_btn._element).hide().appendTo('.battle-options-container').delay(500).fadeIn(2000);
    
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
        btn.css('display', 'block');
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
            attack: 10,
            defence: 2,
            health: 20
        },
        level: 1,
        weapon: 'fists'
    });

    

    setTimeout(() => {
        Noti.create_noti({
            type: 'enemy_appear',
            enemy: enemy._type
        })
    
    }, 1500)

    enemy._element.hide().appendTo(container).delay(2000).fadeIn(1000, 'linear', () => {
        enemy.attack_player();
        updateScreen4();
    });
    

    
}

export function updateScreen4() {
    let container = $('.interaction-container')
    let type = app.player._class;
    att_btn = new Button({
        id: 'attack-btn',
        text: 'attack',
        click_events: [ButtonFunc.attack_btn],
        cooldown: app.player._weapon._cooldown,
        width: 60
    });

    switch (type){
        case 'Warrior':
            alt_btn = new Button({
                id: 'alt-btn',
                text: 'defend',
                click_events: [ButtonFunc.defend_btn],
                effect: 3,
                color: 'blue',
                cooldown: 5,
                width: 60
            });
            break;

        case 'Wizard':
            alt_btn = new Button({
                id: 'alt-btn',
                text: 'cast spell',
                click_events: [ButtonFunc.spell_btn],
                cooldown: 8,
                width: 60
            });
            break;

        case 'Rogue':
            alt_btn = new Button({
                id: 'alt-btn',
                text: 'stun',
                click_events: [ButtonFunc.stun_btn],
                effect: 1,
                color: 'yellow',
                cooldown: 3,
                width: 60
            });
            break;
    }

    let cont = $("<div>").addClass('battle-options-container').appendTo(container);

    $(att_btn._element).hide().appendTo(cont).fadeIn(1000);

    $(alt_btn._element).hide().appendTo(cont).fadeIn(1000);
    
}

// player = new Player({
//     class: type,
//     attack: 5,
//     defence: 5,
//     weapon: "Shortsword",
//     health: 1
//      });