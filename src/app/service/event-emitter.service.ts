import { EventEnum } from './../enums/eventEnum';
import { EventEmitter, Injectable } from '@angular/core';

export class EventEmitterService {

  private static emitters: {
    [eventName: string]: EventEmitter<any>
  } = {};

  static get(eventName: EventEnum): EventEmitter<any> {
    if (!this.emitters[eventName]){
      this.emitters[eventName] = new EventEmitter<any>();
    }
    return this.emitters[eventName];
  }
}
