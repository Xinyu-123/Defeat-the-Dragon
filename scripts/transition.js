import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';
import Player from './Player';
import * as Noti from './notification';
import Button from './Button';
import $ from 'jquery';
class Fade extends Highway.Transition{
    in({from, to, done}) {
        
        const tl = new TimelineLite();

        // tl.fromTo(to, 3, {top: '100vh'}, {top: '0vh'})
        // .fromTo(to, 3, {height: '10vh'}, {height: '100vh', onComplete: () => {
        //     document.getElementById("class-chosen").innerHTML = Player.type;
        //     from.remove();
        //     done();
        // }})
        document.getElementsByClassName('flame')[0].style.opacity = 0;
        tl.fromTo(to, 2, {backgroundPositionY: "0px"}, {backgroundPositionY: '100%', onComplete: () => {
            from.remove();
           
            setTimeout(() => {
                
                document.getElementsByClassName('flame')[0].style.opacity = 0.2;

            }, 1400);

            //Replace all of this by calling a new module that will create the game state

            setTimeout(() => {
                let stoke_btn = new Button('stoke-fire', 'stoke fire', 0, 1).appendTo('div#intro-btn');
                
                $(stoke_btn).animate({opacity: 0.5}, 1)
                Noti.stoke_flame()
                
            }, 4000);

        
            done();
        }})
    

    }

    out({from, done}) {
        done();
    }
}

export default Fade;