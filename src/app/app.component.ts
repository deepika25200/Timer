import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  initialTime: number = 300; // 5 *60 =300
  remainingTime: number = this.initialTime;//the time that is reamining for the purpose of resume
  timerInterval: any; // this variable holds the result of setInterval and stores null when timer stops
  //if it is null the timer is not running if it is not null timer is running
  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        // if remainig time is greater than 0 decrease by a millisecond 
        this.remainingTime--;
      } else {
        //if it less than 0 stop timer
        this.stopTimer();
      }
    }, 1000); //updating this function for every second 
  }
  stopTimer() {
    if (this.timerInterval !== null) {
      //if timer is running 
      clearInterval(this.timerInterval);
      //clearing Interval
      this.timerInterval = null;
      //indicating timer is not running
    }
  }

  resumeTimer() {
    if (this.remainingTime > 0 && this.timerInterval === null) {
      //if timer has time left and if timer is not running
      this.timerInterval = setInterval(() => {
        if (this.remainingTime > 0) {
          //same logic as start timer
          this.remainingTime--;
        } else {
          this.stopTimer();
        }
      }, 1000);
    }
  }
  resetTimer() {
    this.remainingTime = this.initialTime; // Reset timer to 5:00
    this.stopTimer();//stopping timer
  }

  formatTime() {
    const minutes: string = Math.floor(this.remainingTime / 60).toString().padStart(2, '0');//get minutes by divided by 60
    const seconds: string = (this.remainingTime % 60).toString().padStart(2, '0');//get seconds by doing moduloo
    return `${minutes}:${seconds}`;
  }
}
