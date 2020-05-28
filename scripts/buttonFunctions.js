import * as app from './app';
import * as Notis from './notification';
import Character from './Character';
import $ from 'jquery';
import Button from './Button';
let page = require('./gamepage');

module.exports = {
    stoke_fire: function() {

        console.log(app.player);
        app.player._health += 25;
        module.exports.healthBound();

        var text = $('<div>').addClass('notification').css('opacity', '0').text(Notis.stoke_flame(app.player._health)).prependTo('div.text-container');
        text.animate({opacity: 1}, 100, 'linear', function() {
            //clear the overflowed notifications
         });

        

        page.updateFlame();
        
         
     
    },
    
    

    // updateFlame: function() {
    //     let flame = $('.flame');
    //     let health = app.player._health;
        
    //      //Change the flame's opacity and animation to reflect the players health
    //      flame.on('webkitAnimationIteration mozAnimationIteration AnimationIteration', function() {
    //         if(health < 25){
    //             flame.attr('id', 'flame-sm');
    //             flame.attr('opacity', '0.1');
    //         }
    //         if(health < 50 && health >= 25){
    //             flame.attr('id', 'flame-md');
    //             flame.attr('style', 'opacity: 0.4');
    //         }
    //         if(health < 75 && health >= 50){
    //             flame.attr('id', 'flame-lg');
    //             flame.attr('style', 'opacity: 0.7');
    //         }
    //         if(health >= 75){
    //             flame.attr('id', 'flame-xl');
    //             flame.attr('style', 'opacity: 1');
    //         }
    //     });
    // },

    healthBound: function() {
        if(app.player._health > 100){
            app.player._health = 100;
        }
    },

    attack_btn: function(options) {

    }
    
}
