import Character from './Character'

import $ from 'jquery';
export default class Enemy extends Character {
    constructor(options){
        super(options);
        this._image = options.image;
        this._type = options.type;
        console.log(this._image);

        this._element = $('<img>').addClass('enemy').attr('id', this._type).attr('src', this._image);
    }
} 