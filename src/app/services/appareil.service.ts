import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {
  
  appareilsSubject = new Subject<any[]>();
  
  private appareils = [
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

saveAppareilsToServer() {
    this.httpClient
    // put method is used instead of post , to aupdate the previous node and avoid creating a new node ,in appreils, each request
      .put('https:/fir-appareil-backend.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Saved to server !');
        },
        (error) => {
          console.log('Error ! : ' + error);
        }
      );
}
getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https:/fir-appareil-backend.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Error ! : ' + error);
        }
      );
}

// possibility of adding ngOnInit to get the latest update of list appareils when starting the app
//ngOnInit () { this.getAppareilsFromServer()  }
// we can even call thissaveAppareilsToServer() after each modification ,to save the last update .



emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

switchOnAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'On';
    }
    this.emitAppareilSubject();
}

switchOffAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'Off';
      this.emitAppareilSubject();
    }
}

switchOnOne(i: number) {
    this.appareils[i].status = 'On';
    this.emitAppareilSubject();
}

switchOffOne(i: number) {
    this.appareils[i].status = 'Off';
    this.emitAppareilSubject();
}

getAppareilById(id: number) {
    const appareil = this.appareils.find((s) => { return s.id === id; });
    return appareil;
}


addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0, 
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
}

}