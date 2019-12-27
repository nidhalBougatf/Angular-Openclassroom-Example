import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {

	  isAuth = false;
  title = 'My first angular project';
  secondes: number;
  counterSubscription: Subscription;


  constructor() {
  }

	  ngOnInit() {
	  	    const counter = interval(2000); //incrementing by 1 each 2 second
	  	    this.counterSubscription= counter.subscribe(
								      (value) => {
								        this.secondes = value;								        
								      },
								      (error) => {
								        console.log('Uh-oh, an error occurred! : ' + error);
								      },
								      () => {
								        console.log('Observable complete!');
								      }
								    );
	}
 ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }



}
