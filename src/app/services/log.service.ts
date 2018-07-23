import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Log } from '../models/log';

@Injectable()
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });
  selectedLog = this.logSource.asObservable();

private stateSource = new BehaviorSubject<boolean>(true);
stateClear = this.stateSource.asObservable();

  constructor() {
    /* this.logs = [
      {
        id: '1',
        text: 'Generated components',
        date: new Date('12/26/2017 12:45:00')
      },
      {
        id: '2',
        text: 'Added Bootstrap',
        date: new Date('12/27/2017 9:35:00')
      },
      {
        id: '3',
        text: 'Added Logs component',
        date: new Date('12/27/2017 12:59:56')
      },
      { id: '4', text: 'Designed UI', date: new Date('12/28/2017 10:10:10') }
    ]; */

    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    // GET data from local storage.
    // Data has to be converted from string format to json.
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // Add to local storage
    // data is stored in string format in the local storage.
    localStorage.setItem('logs',
    JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    this.logs.unshift(log);

    // update log in local storage
    localStorage.setItem('logs',
    JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    // delete log in local storage
    localStorage.setItem('logs',
    JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }

}
