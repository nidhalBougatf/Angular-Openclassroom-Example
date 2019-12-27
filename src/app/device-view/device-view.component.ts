import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.scss']
})
export class DeviceViewComponent implements OnInit, OnDestroy {

  devices: any[];
  deviceSubscription: Subscription;


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
    this.deviceSubscription = this.deviceService.devicesSubject.subscribe(
      (devices: any[]) => {
        this.devices = devices;
      }
    );
    this.deviceService.streamDeviceSubject();
  }

  onAllumer() {
    this.deviceService.switchOnAll();
  }

  onEteindre() {
    if(confirm('Are you sure you want to turn all devices off ?')) {
      this.deviceService.switchOffAll();
    } else {
      return null;
    }
  }

   ngOnDestroy() {
    this.deviceSubscription.unsubscribe();
  }
	  onSave() {
	    this.deviceService.saveDevicesToServer();
	}
	onFetch()
	{
		this.deviceService.getDevicesFromServer();
	}


}
