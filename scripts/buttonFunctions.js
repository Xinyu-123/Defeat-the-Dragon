import * as app from './app';
import Character from './Character';
import $ from 'jquery';
import Button from './Button';

const page = require('./gamepage');
const Weapon = require('./Weapons');
const noti = require('./notification')
const Util = require('./Utility');
module.exports = {
    stoke_fire: function() {
        app.player._health += 25;
        module.exports.healthBound();

        var text = $('<div>').addClass('notification').css('opacity', '0').text(noti.stoke_flame(app.player._health)).prependTo('div.text-container');
        text.animate({opacity: 1}, 100, 'linear', function() {
            //clear the overflowed notifications
         });

        

        page.updateFlame();
        
         
     
    },
    

    healthBound: function() {
        if(app.player._health > 100){
            app.player._health = 100;
        }
    },

    attack_btn: function(options) {
        let player = app.player;
        let enemy = page.enemy;
        let defence = enemy._defence;
        let attack = player._attack + player._weapon._attack;
        attack = module.exports.getAttack(attack) - defence;
        enemy._health -= attack;

        //notification
        var text = $('<div>').addClass('notification').css('opacity', '0').text(noti.att_noti({player, attack, enemy})).prependTo('div.text-container');
        text.animate({opacity: 1}, 100, 'linear', function() {
            //clear the overflowed notifications
         });


        page.defeatEnemy(enemy);
    },

    defend_btn: function() {
        
    },

    getAttack: function (attack) {
        let roll = Util.getRandomInt(5);

        switch (roll){
            case 0:
                return Math.floor(attack - (attack * 0.25));
                break;
            case 1:
                return Math.floor(attack - (attack * 0.1));
                break;
            case 2:
                return Math.floor(attack);
                break;
            case 3:
                return Math.floor(attack + (attack * 0.1));
                break; 
            case 4:
                return Math.floor(attack + (attack * 0.25));
                break;
        }
    }
    
}
