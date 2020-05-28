
var $ = require('jquery');

module.exports = {

    stoke_flame: function(health) {
        let texts = [];

        console.log('health ' + health);
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
                console.log('1');
                return texts[getRandomInt(3)]
                break;
            case health >= 50 && health < 75:
                console.log('2');
                return texts[getRandomInt(4) + 3]
                break;
            case health >= 75:
                console.log('3');
                return texts[getRandomInt(3) + 7]
                break;
            default:
                console.log('????');
                return texts[getRandomInt(3)]
                break;
        }


    },

    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }