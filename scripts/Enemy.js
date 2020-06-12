import Character from './Character'

import $ from 'jquery';
import { enemy } from './gamepage';
import { player } from './app';
const Util = require('./Utility');
const Noti = require('./notification');
const Page = require('./gamepage')
const Player = require('./Player')


export default class Enemy extends Character {
    constructor(options){
        super(options);

        this._type = options.type;
        this._stunned = false;
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

    // ['skeleton', 'troll', 'undead-wizard', 'slime']

    getEnemyImage(type){
        switch(type){
            case 'skeleton':
                return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eabda171-95e1-4698-8410-03017288ab53/dauo6gg-ac9d6d32-2e74-4134-907f-5420e56104dc.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZWFiZGExNzEtOTVlMS00Njk4LTg0MTAtMDMwMTcyODhhYjUzXC9kYXVvNmdnLWFjOWQ2ZDMyLTJlNzQtNDEzNC05MDdmLTU0MjBlNTYxMDRkYy5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.eC7KxwhinKa9veieaPyH13mbSrns3DQOcFn70sAP3rE';
            case 'troll':
                return 'https://i.pinimg.com/originals/f9/fa/6f/f9fa6fb55ae4301740214a13163c26e2.gif';
            case 'undead-wizard':
                return 'https://i.imgur.com/zhxu4Ni.gif';
            case 'slime':
                return 'https://1.bp.blogspot.com/-Rkci3A5ZXbc/V1HTp_7leiI/AAAAAAAABwM/mXn1ZJm8e1Y0PX9xRVdSkbTLa9KXvIzLgCLcB/s320/Green-Slime-Attack-Down-1.gif';
            case 'dragon':
                return 'https://pa1.narvii.com/6149/a01bcd302366216689b3011ffe8b04d39f5468de_hq.gif';

        }
    }

    attack_player(options){
        console.log(enemy);
        let interval = enemy._weapon._cooldown * 1000;
        this._attack_int = setInterval(this.attack_interval, interval);
        Page.updateFlame();
    }

    attack_interval(options){
        let defence = player._defence;
        let attack = enemy._attack + enemy._weapon._attack;
        console.log(enemy._stunned)
        console.log('attack Interval')
        attack = Util.getAttack(attack) - defence;
        if(player._defending){
            Noti.create_noti({
                type: 'att_defended_noti'
            })
        }else if(enemy._stunned){
            console.log('here');
            return;
        }
        else {
            if(attack < 0)
                attack = 0;

            player._health -= attack;
            Noti.create_noti({
                type: 'enemy_att_noti',
                player: player,
                attack: attack,
                enemy: enemy
            })

            console.log(player)
            player.health_change({health: player._health});

        }
        
        
    }

    clear_attack(){
        console.log('clear attack');
        clearInterval(this._attack_int);
        
    }


    static get_enemy(){
        let level = player._level, type, info;
        if(level >= 4){
            //spawn dragon
            console.log('here');
            info = {
                type: 'dragon',
                stats: {attack: 60, defence: 10},
                level: level,
                health: 5,
                weapon: 'fists'
            };
            
        }
        else{
            type = this.get_enemy_type()

            info = {
                type: type, 
                stats: this.get_enemy_stats(), 
                level: level, 
                health: this.get_enemy_health(type, level),
                weapon: this.get_enemy_weapon(),
            };
    
        }

        return info;

    }

    static get_enemy_type(){
        let types = ['skeleton', 'troll', 'undead-wizard', 'slime'];

        const randomElement = types[Math.floor(Math.random() * types.length)];

        return randomElement;
    }

    static get_enemy_stats(type, level){
        return {attack: 12, defence: 2};
    }

    static get_enemy_weapon(type){
        return 'fists';
    }

    static get_enemy_health(level, type){
        return 30;
    }

    static get_dragon(){
        let level = player._level;
        let type = 'dragon';

        if(level >= 4){
            //spawn dragon
        }

        let info = {
            type: type, 
            stats: this.get_enemy_stats(), 
            level: level, 
            health: this.get_enemy_health(type, level),
            weapon: this.get_enemy_weapon(),
        };

        
        return info;
    }

} 

