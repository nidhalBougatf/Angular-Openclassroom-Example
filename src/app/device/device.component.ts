import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../services/device.service'

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

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

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
  }

  getStatus() {
    return this.deviceStatus;
  }

  onSwitch() {
    if(this.deviceStatus === 'On') {
      this.deviceService.switchOffOne(this.index);
    } else if(this.deviceStatus === 'Off') {
      this.deviceService.switchOnOne(this.index);
    }
}


}
