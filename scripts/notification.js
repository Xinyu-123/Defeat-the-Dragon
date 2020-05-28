var app = require('./app');
var $ = require('jquery');
const util = require('./Utility');

module.exports = {

    stoke_flame: function(health) {
        let texts = [];

        texts.push('You stoke the flame. The flame is small');
        texts.push('You stoke the flame. The flame is glowing');
        texts.push('You stoke the flame. The flame flickers');

        texts.push('You stoke the flame. It feels warm');
        texts.push('You stoke the flame. It fills you with strength');
        texts.push('You stoke the flame. The fire is bright');
        texts.push('You stoke the flame. The flame burns');

        texts.push('You stoke the flame. The fire is roaring.');
        texts.push('You stoke the flame. The fire is intense.');
        texts.push('You stoke the flame. The fire is dazzling.');


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

    }



    
}

