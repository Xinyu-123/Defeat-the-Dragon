var $ = require('jquery');
import * as app from './app';
import Player from './Player';
class Button {
    constructor(id, text, click, cooldown, width){
        console.log("button created")
        this._id = id;
        this._text = text;
        this._click = click;
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
            })
            .click(() => {
                getBtnFunction(this._id)
            })
            .data('cooldown', this._cooldown)
            .data('remaining', 0);

        let cd = $('<div>').addClass('cooldown');
        el.append(cd);

    
        // document.getElementById('stoke-fire').setAttribute('class', 'button-disabled');

        return el;
    }




}

async function startcooldown(btn, option) {
    var cd = btn[0]._cooldown

    var id = 'cooldown.'+ btn.attr('id');
    
    let start = cd, left = 1;
    // if(cd > 0){
    //     switch(option){
    //         // a switch will allow for several uses of cooldown function
    //         case 'state':
    //             start = Math.min($SM.get(id), cd);
    //             left = (start / cd).toFixed(4);
    //             break;
    //         default:
    //             start = cd;
    //             left = 1;
    //     }
    // }
    
    // clearCooldown(btn);

  

    let time = start;

    $('div.cooldown').width(left * 100 +"%").animate({width: '0%'}, time * 1000, 'linear', function() {
        btn[0]._disabled = false;
        $('#' + btn[0]._id).attr('class', 'button')
        // clearCooldown(btn, true);
    });

    

    btn[0]._disabled = true;
    // btn.data('onCooldown', true);
}

// function clearCooldown(btn, ended) {
//     var ended = ended || false;
//     if(!ended){
//         $('div.cooldown', btn).stop(true, true);
//     }
//     btn.data('onCooldown', false);
//     if(btn[0]._cooldown){
//         window.clearInterval(btn.data('countdown'));
//         $('div.cooldown', btn).remove('cooldown.'+ btn.attr('id'));
//         btn.removeData('countdown');
//     }
//     if(!btn.data('disabled')) {
//         btn.removeClass('disabled');
//     }
// }

export function getBtnFunction(id) {
    console.log(id)
    if(id == 'stoke-fire'){
        console.log('here')
        app.player._health += 25;
    }

    app.updateFlame()


}

export default Button;