import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup; // FormGroup : type of forms grouping multiple FormControl

  constructor(private formBuilder: FormBuilder, private userService: UserService,private router: Router){ }
  // formbuilder is a class having having methods that makes the creation of formGroup easier
  

  ngOnInit() {
  	this.initForm();
  }


initForm() {
	  	// group method : takes an object having each couple : input_name:'defaultvalue', OR an array ['defaultValue',validator] ...
	  	// validators contains many methods which allows checking the controls(inputs)
    this.userForm = this.formBuilder.group({
      firstName: '',
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      drinkPreference: ['', Validators.required],
      hobbies: this.formBuilder.array([]) // dynamic array of hobbies
    });
}

onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] : [] 
      // checking if there is hobbies (becaus it's optional in contructor), if not , simply return empty array
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
}

	
	//this method is used for adding the new hobby ( the new form control) to the formArray of hobbies
	onAddHobby() {
	    const newHobbyControl = this.formBuilder.control(null, Validators.required); // checking the value is not empty // so we won't get an array full of empty values
	    this.getHobbies().push(newHobbyControl); 
	}

	// method that returns FormArray which is a group of FormControl ( each hobbie is a formcontrol)
	getHobbies(): FormArray {
	    return this.userForm.get('hobbies') as FormArray;
	}
}