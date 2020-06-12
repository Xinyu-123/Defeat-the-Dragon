var $ = require('jquery');
import * as app from './app';
import * as page from './gamepage';
import Player from './Player';

class Button {
    constructor(options){
        this._id = options.id;
        this._text = options.text;
        this._click_events = options.click_events;
        this._cooldown = options.cooldown;
        this._effect_time = options.effect;
        this._effect_color = options.color;
        this._disabled = false;


        let el = $('<div>')
            .attr('id', this._id)
            .attr('type', 'button')
            .text(this._text)
            .addClass('button')
            .click(() => {
                if(!$(this).hasClass('disabled')) {
                    $('#' + this._id).attr('class', 'button-disabled');
                    if(this._effect_time){
                        startcooldown($(this), {
                            color: this._effect_color, 
                            cooldown: this._cooldown, 
                            effect: this._effect_time
                        });
                    }else{
                        startcooldown($(this));
                    }
                    
				}
            });

        this._element = el;

        for(let i = 0; i < this._click_events.length; i++){
            el.on('click', this._click_events[i]);
        }

        if(options.width){
            el.css('width', options.width);
        }


        let cd = $('<div>').addClass('cooldown');
        el.append(cd);

    
        // document.getElementById('stoke-fire').setAttribute('class', 'button-disabled');
    }

}

function startcooldown(btn, options) {
    let ended
    if(options && options.effect){
        cd = options.effect
        ended = false;
    }else{
        var cd = btn[0]._cooldown
        ended = true
    }
    
    
    let start = cd, left = 1;

    let time = start;
    if(options && options.color){
        $('div#' + btn[0]._id + ' > div.cooldown').css('background-color', options.color);
    }else {
        $('div#' + btn[0]._id + ' > div.cooldown').css('background-color', '#DDDDDD');
    }

    $('div#' + btn[0]._id + ' > div.cooldown').width(left * 100 +"%").animate({width: '0%'}, time * 1000, 'linear', function() {
        clearCooldown(btn, ended);
    });

    

    btn[0]._disabled = true;
}

function clearCooldown(btn, ended) {
    var button = $('#' + btn[0]._id);
    if(ended == false){
        startcooldown(btn);
    }else{
        btn[0]._disabled = false;
        button.attr('class' , 'button');
    }


}

// export function getBtnFunction(id) {
//     console.log('here');
//     if(id == 'stoke-fire'){
//         app.player._health += 25;
//     }

//     app.updateFlame()
// }

export default Button;