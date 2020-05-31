import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';
import Player from './Player';
import * as Noti from './notification';
import Button from './Button';
import * as Game from './gamepage';
import $ from 'jquery';

const app = require('./app');
const noti = require('./notification');
class Fade extends Highway.Transition{
    in({from, to, done}) {
        console.log({noti});

        const tl = new TimelineLite();

        document.getElementsByClassName('flame')[0].style.opacity = 0;
        tl.fromTo(to, 2, {backgroundPositionY: "0px"}, {backgroundPositionY: '100%', onComplete: () => {
            from.remove();
            let grad = $('<div>').addClass('text-gradient');
           $('.text-container').append(grad);

           
           Game.setUpGame();
            
           
            done();
        }})
    

    }

    out({from, done}) {
        done();
    }
}

export default Fade;