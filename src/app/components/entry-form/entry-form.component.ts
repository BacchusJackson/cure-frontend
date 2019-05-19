import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";

export interface Category {
  value: string;
  text: string;
}
export interface Activity {
  value: string;
  text: string;
  properties: string[];
}
@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  selectedCategory: string;
  selectedActivity: string;
  
  // show or hide fields based on properties
  showMembers: boolean = false;
  showHours: boolean = false;
  showDescription: boolean = false;

  // form control bindings
  members = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')])
  description = new FormControl()
  hours = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')])

  categories: Category[] = [
    {value: '1', text:'Apples'},
    {value: '2', text:'Pears'},
    {value: '3', text:'Grapefruit'},
  ]
  activities: Activity[] = [
    {value: '1', text:'Apples', properties:['members']},
    {value: '2', text:'Pears', properties:['members','description']},
    {value: '3', text:'Grapefruit', properties:['members', 'hours', 'description']},
  ]

  constructor(private snackBar:MatSnackBar) { }

  ngOnInit() {

  }

  // show the red error messages under the text boxes
  getErrorMessage(field: string) {
    if(field == 'members') {
      return this.members.hasError('required') ? 'This field cannot be left blank' : 
      this.members.hasError('pattern') ? 'this field must be a number' : ''
    }else if(field == 'hours') {
      return this.hours.hasError('required') ? 'This field cannot be left blank' : 
      this.hours.hasError('pattern') ? 'this field must be a number' : ''
    }
  }

  // show or hide the text boxes based on the properties list
  renderProperties() {
    const filteredActivities = this.activities.filter((item) => item.value == this.selectedActivity)
    filteredActivities[0].properties.includes('members') ? this.showMembers = true : this.showMembers = false;
    filteredActivities[0].properties.includes('hours') ? this.showHours = true : this.showHours = false;
    filteredActivities[0].properties.includes('description') ? this.showDescription = true : this.showDescription = false;
  }

  onSubmit() {
    // There a validation bug. If you click on and click off of a property without putting a number and switch activities.... I'll deal with it later
    if(this.selectedCategory && this.selectedActivity && this.members.valid && this.hours.valid) {
      console.log(this.selectedCategory);
      console.log(this.selectedActivity);
      this.snackBar.open('Thank you!', 'dimiss', {duration: 2000});
      this.selectedActivity = null;
    } else {
      this.snackBar.open('you forgot something...', 'dismiss', {duration: 2000});
    }

    this.onClear();
  }
  onClear() {
    this.members.reset();
    this.description.reset();
    this.hours.reset();
  }



}
