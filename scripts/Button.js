var $ = require('jquery');
import * as app from './app';
import * as page from './gamepage';
import Player from './Player';

class Button {
    constructor(id, text, click_events, cooldown, width){
        console.log("button created")
        this._id = id;
        this._text = text;
        this._click_events = click_events;
        this._cooldown = cooldown;
        this._disabled = false;


        let el = $('<div>')
            .attr('id', this._id)
            .attr('type', 'button')
            .text(this._text)
            .addClass('button')
            .css('opacity', '0')
            .click(() => {
                if(!$(this).hasClass('disabled')) {
                    $('#' + this._id).attr('class', 'button-disabled');
                    startcooldown($(this));
				}
            });

        this._element = el;

        for(let i = 0; i < click_events.length; i++){
            console.log(click_events[i])
            el.on('click', click_events[i]);
        }


        let cd = $('<div>').addClass('cooldown');
        el.append(cd);

    
        // document.getElementById('stoke-fire').setAttribute('class', 'button-disabled');
    }

}

function startcooldown(btn, option) {
    var cd = btn[0]._cooldown
    
    let start = cd, left = 1;

    let time = start;

    $('div.cooldown').width(left * 100 +"%").animate({width: '0%'}, time * 1000, 'linear', function() {
        clearCooldown(btn, true);
    });

    

    btn[0]._disabled = true;
}

function clearCooldown(btn, ended) {
    var button = $('#' + btn[0]._id);
    btn[0]._disabled = false;
    button.attr('class' , 'button');

}

export function getBtnFunction(id) {
    console.log(id)
    if(id == 'stoke-fire'){
        console.log('here')
        app.player._health += 25;
    }

    app.updateFlame()


}

export default Button;