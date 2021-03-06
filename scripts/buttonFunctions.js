
import Character from './Character';
import Button from './Button';
import * as Noti from './notification';
import {player} from './app';

const page = require('./gamepage');
const Weapon = require('./Weapons');
const Player = require('./Player');
const noti = require('./notification');
const Util = require('./Utility');
const app = require('./app');
const $ = require('jquery');

module.exports = {
    stoke_fire: function() {
        app.player._health += 25;
        player.health_change({
            health: app.player._health,
            max_health: app.player._max_health
        })
        console.log(app.player._health);
        let health = app.player._health;

        noti.create_noti({
            type: 'stoke_flame',
            health: health
        })

        

        page.updateFlame();
        
         
     
    },
    

    healthBound: function() {
        if(app.player._health > app.player._max_health){
            app.player._health = app.player._max_health;
        }
    },

    attack_btn: function(options) {
        console.log(page.enemy);
        if(page.enemy != null){
            let player = app.player;
            let enemy = page.enemy;
            let defence = enemy._defence;
            let attack = player._attack + player._weapon._attack;
            attack = Util.getAttack(attack) - defence;
            if(player._defending){
                attack = Math.floor(attack * 0.7);
            }
            
            enemy._health -= attack;
    
            noti.create_noti({
                type: 'att_noti',
                player: player,
                attack: attack,
                enemy: enemy
            })
    
    
            page.defeatEnemy(enemy);
        }else{
            //no enemy
        }

    },

    defend_btn: function() {
        if(page.enemy != null){
            let time = page.alt_btn._effect_time;

            app.player._defending = true;
    
            noti.create_noti({
                type: 'def_noti'
            })
    
            setTimeout(() => {
                app.player._defending = false;
            }, time * 1000)
        }

    },

    stun_btn: function(){
        if(page.enemy != null){
            let time = page.alt_btn._effect_time;
            page.enemy._stunned = true;
    
            noti.create_noti({
                type: 'stun_noti',
                time: time
            })
            
            setTimeout(() => {
                    page.enemy._stunned = false;
    
            }, time * 1000)
    
        }

    },

    spell_btn: function() {
        console.log('spell');
        if(page.enemy != null){
            let player = app.player;
            let spell = player.get_spell();
            let enemy = page.enemy;
            let attack = player._attack + player._weapon._attack;
            attack = Util.getAttack(attack);
            
            enemy._health -= attack;
    
            noti.create_noti({
                type: 'spell_noti',
                player: player,
                attack: attack,
                spell: spell,
                enemy: enemy
            })
    
    
            page.defeatEnemy(enemy);
        }
    },
    

    restart_btn: function(){
        let type = player._class;
        let grad = $('<div>').addClass('text-gradient');

        $('.text-container').children().fadeOut(1000, 'linear', () => {
            $('.text-container').empty().append(grad);
        });

        $('.interaction-container').children('img').fadeOut(1000, 'linear' , () => {
            $('.interaction-container').children('img').remove();
        });

        $('.battle-options-container').fadeOut(1000, 'linear' , () => {
            $('.battle-options-container').remove();
            app.player = new Player.default({
                class: type,
                stats: {
                    attack: 5,
                    defence: 5,
                    health: 100
                },
                weapon: "Shortsword",
                level: 1,
                max_health: 100
            });
            
            page.updateScreen1();
        });

        

        
        
    }


    
    
}
