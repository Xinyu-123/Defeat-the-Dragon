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
        this._disabled = false;


        let el = $('<div>')
            .attr('id', this._id)
            .attr('type', 'button')
            .text(this._text)
            .addClass('button')
            .click(() => {
                if(!$(this).hasClass('disabled')) {
                    $('#' + this._id).attr('class', 'button-disabled');
                    startcooldown($(this));
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

function startcooldown(btn, option) {
    console.log(btn);
    var cd = btn[0]._cooldown
    
    let start = cd, left = 1;

    let time = start;

    $('div#' + btn[0]._id + ' > div.cooldown').width(left * 100 +"%").animate({width: '0%'}, time * 1000, 'linear', function() {
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
    if(id == 'stoke-fire'){
        app.player._health += 25;
    }

    app.updateFlame()


}

export default Button;