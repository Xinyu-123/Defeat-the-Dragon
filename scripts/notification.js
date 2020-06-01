const app = require('./app');
var $ = require('jquery');
const util = require('./Utility');


module.exports = {

    create_noti: function(options){
        let noti_type = options.type;
        
        var text = $('<div>').addClass('notification').css('opacity', '0').text(module.exports[noti_type](options)).prependTo('div.text-container');
        text.animate({opacity: 1}, 100, 'linear', function() {
            //clear the overflowed notifications
         });
    },

    stoke_flame: function(options) {

        let texts = [];
        let health = options.health;



        texts.push('You stoke the flame. The flame is small. You gained 25 health.');
        texts.push('You stoke the flame. The flame is glowing. You gained 25 health.');
        texts.push('You stoke the flame. The flame flickers. You gained 25 health.');

        texts.push('You stoke the flame. It feels warm. You gained 25 health.');
        texts.push('You stoke the flame. It fills you with strength. You gained 25 health.');
        texts.push('You stoke the flame. The fire is bright. You gained 25 health.');
        texts.push('You stoke the flame. The flame burns. You gained 25 health.');

        texts.push('You stoke the flame. The fire is roaring. You gained 25 health.');
        texts.push('You stoke the flame. The fire is intense. You gained 25 health.');
        texts.push('You stoke the flame. The fire is dazzling. You gained 25 health.');


        switch (true) {

            case health >=25 && health < 50:
                return texts[util.getRandomInt(3)]
                break;
            case health >= 50 && health < 75:
                return texts[util.getRandomInt(4) + 3]
                break;
            case health >= 75:
                return texts[util.getRandomInt(3) + 7]
                break;
            default:
                return texts[util.getRandomInt(3)]
                break;
        }


    },

    att_noti: function(options) {
        return `You attacked the ${options.enemy._type} with your ${options.player._weapon._name} and did ${options.attack} damage.`
    },

    def_noti: function () {

    },

    battle_win_noti: function (options) {
        return `You have defeated a level ${options.enemy._level} ${options.enemy._type}`;
    },

    gain_xp: function (options) {
        return `You have gained ${options.xp}xp`;
    },

    level_up: function(options) {
        return `You have increased to level ${options.level}. 
                \nYour attack has increased by ${options.stats.attack} to ${app.player._attack}.
                \nYour defence has increased by ${options.stats.defence} to ${app.player._defence}.`
    },

    enemy_att_noti: function(options) {
        return `${options.enemy._type} has attacked you with their ${options.enemy._weapon._name} and dealt ${options.attack} damage.`
    },

    player_death: function(){
        return "oh jeez, looks like you died :("
    },

    enemy_appear: function(options){
        return `A ${options.enemy} has appeared. It looks angry.`
    }


    
}

