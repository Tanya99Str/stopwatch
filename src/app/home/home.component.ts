import {Component, OnInit} from '@angular/core';
import {Observable, timer, interval} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hours: any = '00';
  minutes: any = '00';
  seconds: any = '00';
  subsc;
  type: 'NONE' | 'GO' = 'NONE';
  countClick: number = 0;
  secondsWait: number = 0;

  constructor() {

  }

  ngOnInit(): void {
  }

  wait() {
    this.secondsWait = 0;
    this.countClick+=1;
    setInterval(() => {
      this.secondsWait++;
      console.log(this.secondsWait);
    }, 3000)
    if (this.countClick === 2&&this.secondsWait<=3) {
      console.log(this.countClick);
      this.type = 'GO';
      this.countClick = 0;
      this.secondsWait = 0;
      this.start();
      return;
    } else {
      this.secondsWait = 0;
    }
  }

  start() {
    if (this.type == 'NONE') {
      this.type = 'GO';
      this.subsc = interval(1000).subscribe(() => {
        this.seconds = parseInt(this.seconds) + 1;
        if (this.seconds == 60) {
          this.minutes = parseInt(this.minutes) + 1;
          this.seconds = 0;
        }
        if (this.seconds>=1&&this.seconds<=9) {
          this.seconds = `0${this.seconds}`;
        }
        if (this.minutes > 60) {
          this.hours = parseInt(this.hours) + 1;
          this.minutes = 1;
        }
        if (this.hours>23&&this.hours<1) {
          this.hours = '00';
        }
      });
      return;
    }
    if (this.type == 'GO') {
      this.subsc.unsubscribe();
      this.type = 'NONE';
      return;
    }
  }

  reset() {
    this.type = 'NONE';
    this.subsc.unsubscribe();
    this.hours = '00';
    this.minutes = '00';
    this.seconds = '00';
    this.start();
  }

}
