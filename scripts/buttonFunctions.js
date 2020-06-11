
import Character from './Character';
import Button from './Button';
import * as Noti from './notification';
import {player} from './app';

const page = require('./gamepage');
const Weapon = require('./Weapons');
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

    defend_btn: function(options) {
        
    },

    stun_btn: function(){

    },

    spell_btn: function() {

    },

    restart_btn: function(){
        let grad = $('<div>').addClass('text-gradient');
        $('.text-container').children().fadeOut(1000);
        $('.interaction-container').children('img').fadeOut(1000);
        $('.battle-options-container').fadeOut(1000);
        setTimeout(() => {
            $('.text-container').empty().append(grad);
            $('.interaction-container').children('img').remove();
            $('.battle-options-container').remove();
        },1000)
        
        player._health = 100;

        page.updateScreen1();
    }

    
    
}
