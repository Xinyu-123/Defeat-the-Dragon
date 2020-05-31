import Character from './Character'

import $ from 'jquery';
import { enemy } from './gamepage';
import { player } from './app';
const Util = require('./Utility');
const Noti = require('./notification');
const Page = require('./gamepage')


export default class Enemy extends Character {
    constructor(options){
        super(options);

        this._type = options.type;
        this._image = this.getEnemyImage(this._type);
        this._xp = this.getEnemyXP({
            level: this._level
        })

        this._element = $('<img>').addClass('enemy').attr('id', this._type).attr('src', this._image);


    }

    getEnemyXP(options) {
        let level = options.level;

        switch (level){
            case 1:
                return 10;
            case 2:
                return 20;
            case 3:
                return 30;
            case 4:
                return 40;
        }
    }

    getEnemyImage(type){
        switch(type){
            case 'skeleton':
                return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eabda171-95e1-4698-8410-03017288ab53/dauo6gg-ac9d6d32-2e74-4134-907f-5420e56104dc.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZWFiZGExNzEtOTVlMS00Njk4LTg0MTAtMDMwMTcyODhhYjUzXC9kYXVvNmdnLWFjOWQ2ZDMyLTJlNzQtNDEzNC05MDdmLTU0MjBlNTYxMDRkYy5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.eC7KxwhinKa9veieaPyH13mbSrns3DQOcFn70sAP3rE';
            
        }
    }

    attack_player(options){
        console.log('here');
        console.log(enemy);
        let interval = enemy._weapon._cooldown * 1000;
        this._attack_int = setInterval(this.attack_interval, interval);
        Page.updateFlame();
    }

    attack_interval(options){
        let defence = player._defence;
        let attack = enemy._attack + enemy._weapon._attack;

        console.log('attack Interval')
        attack = Util.getAttack(attack) - defence;

        player._health -= attack;
        Noti.create_noti({
            type: 'enemy_att_noti',
            player: player,
            attack: attack,
            enemy: enemy
        })

        console.log(player)
        player.checkDeath(player._health);

        
    }

    clear_attack(){
        clearInterval(this._attack_int);
        
    }

} 

