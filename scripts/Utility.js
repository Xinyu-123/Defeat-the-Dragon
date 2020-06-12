
module.exports = {

    getRandomInt: function(max){
        return Math.floor(Math.random() * Math.floor(max));
    },

    getAttack: function (attack) {
        let roll = module.exports.getRandomInt(5);

        let low = Math.floor(attack - (attack * 0.1));
        let high = Math.floor(attack + (attack * 0.1));

        let value = module.exports.getRandomInt(high-low);
        value = low + value + 1;

        return value;
        // switch (roll){
        //     case 0:
        //         return Math.floor(attack - (attack * 0.25));
        //         break;
        //     case 1:
        //         return Math.floor(attack - (attack * 0.1));
        //         break;
        //     case 2:
        //         return Math.floor(attack);
        //         break;
        //     case 3:
        //         return Math.floor(attack + (attack * 0.1));
        //         break; 
        //     case 4:
        //         return Math.floor(attack + (attack * 0.25));
        //         break;
        // }
    },

    getSpells: function(){ 

    }

}