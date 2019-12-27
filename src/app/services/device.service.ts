import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DeviceService {
  
  devicesSubject = new Subject<any[]>();
  
  // static initial devices
  private devices = [
    {
    	id: 1,
      name: 'Tv',
      status: 'On'
    },
    {
    	id: 2,
      name: 'Fridge',
      status: 'Off'
    },
    {
    	id: 3,
      name: 'Computer',
      status: 'On'
    }
  ];

    constructor(private httpClient: HttpClient) { }

saveDevicesToServer() {
    this.httpClient
    // put method is used instead of post , to aupdate the previous node and avoid creating a new node ,in appreils, each request
      .put('https:/fir-appareil-backend.firebaseio.com/appareils.json', this.devices)
      .subscribe(
        () => {
          console.log('Saved to server !');
        },
        (error) => {
          console.log('Error ! : ' + error);
        }
      );
}
getDevicesFromServer() {
    this.httpClient
      .get<any[]>('https:/fir-appareil-backend.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.devices = response;
          this.streamDeviceSubject();
        },
        (error) => {
          console.log('Error ! : ' + error);
        }
      );
}

// possibility of adding ngOnInit to get the latest update of list appareils when starting the app
//ngOnInit () { this.getAppareilsFromServer()  }
// we can even call thissaveAppareilsToServer() after each modification ,to save the last update .



streamDeviceSubject() {
    this.devicesSubject.next(this.devices.slice());
  }

switchOnAll() {
    for(let device of this.devices) {
      device.status = 'On';
    }
    this.streamDeviceSubject();
}

switchOffAll() {
    for(let device of this.devices) {
      device.status = 'Off';
      this.streamDeviceSubject();
    }
}

switchOnOne(i: number) {
    this.devices[i].status = 'On';
    this.streamDeviceSubject();
}

switchOffOne(i: number) {
    this.devices[i].status = 'Off';
    this.streamDeviceSubject();
}

getDeviceById(id: number) {
    const device = this.devices.find((s) => { return s.id === id; });
    return device;
}


addDevice(name: string, status: string) {
    const deviceObject = {
      id: 0, 
      name: '',
      status: ''
    };
    deviceObject.name = name;
    deviceObject.status = status;
    deviceObject.id = this.devices[(this.devices.length - 1)].id + 1;
    this.devices.push(deviceObject);
    this.streamDeviceSubject();
}

}