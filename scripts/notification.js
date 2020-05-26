require("babel-core/register");
require("babel-polyfill");
var $ = require('jquery');
module.exports = {

    stoke_flame: function() {
        document.getElementById('stoke-fire').addEventListener('click', first_flame);
        document.getElementById('stoke-fire').addEventListener('click', reveal_game);
    },

    
}

let first_flame = () => {
    
    
    // btnDelay('stroke-fire', 2000);

    var text = $('<div>').addClass('notification').css('opacity', '0').text("You tend to the fire. It feels gooooooooooood.").prependTo('div.text-container');
    text.animate({opacity: 1}, 100, 'linear', function() {
        //clear the overflowed notifications
     });

}

let reveal_game = () => {
    document.getElementsByClassName('wrapper')[0].style.opacity = 1;
    document.getElementById('stoke-fire').removeEventListener('click', reveal_game);
}

let btnDelay = (btn, delay) => {
    let button = document.getElementById(btn);
    button.disabled = true;
    setTimeout(function() {
        button.disabled = false;
        button.setAttribute('class', 'button');
    }, delay);
}
