
import Character from './Character';
import $ from 'jquery';
import Button from './Button';
import * as Noti from './notification';

const page = require('./gamepage');
const Weapon = require('./Weapons');
const noti = require('./notification');
const Util = require('./Utility');
const app = require('./app');

module.exports = {
    stoke_fire: function() {
        app.player._health += 25;
        module.exports.healthBound();
        
        let health = app.player._health;

        noti.create_noti({
            type: 'stoke_flame',
            health: health
        })

        

        page.updateFlame();
        
         
     
    },
    

    healthBound: function() {
        if(app.player._health > 100){
            app.player._health = 100;
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

    
    
}
