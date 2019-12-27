import { Component, OnInit, Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service'

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() deviceName: string;
  @Input() deviceStatus: string;
  @Input() index: number;
  @Input() id: number;
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
  }

  getStatus() {
    return this.deviceStatus;
  }

  onSwitch() {
    if(this.deviceStatus === 'On') {
      this.appareilService.switchOffOne(this.index);
    } else if(this.deviceStatus === 'Off') {
      this.appareilService.switchOnOne(this.index);
    }
}


}
