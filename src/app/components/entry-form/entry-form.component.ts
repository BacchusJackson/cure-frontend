import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { DataService, Activity, Entry } from "../../services/data.service";
import { UsersService } from 'src/app/services/users.service';
import { isDate } from 'util';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  constructor(private snackBar:MatSnackBar, private dataService:DataService, private usersService: UsersService) { }
  selectedCategory: string;
  selectedActivity: string;
  
  // show or hide fields based on properties
  showMembers: boolean = false;
  showHours: boolean = false;
  showDescription: boolean = false;

  // form control bindings
  members = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
  description = new FormControl();
  hours = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
  entryDate = new FormControl('', [Validators.required])

  categories: any;
  activities: Activity[];
  filteredActivities: Activity[];

  async ngOnInit() {
    // Get all of the activities from the Database
    this.activities = await this.dataService.getActivities();
    
    // Filter through the activities to get the unique category names
    this.categories = this.activities.map((item) => { return item.category })
    // Remove Duplicates after maping (get only the category for each array item)
    .filter((item, i, ar) => {return ar.indexOf(item) === i});
  }
  
  resetFields() {
    this.members.reset();
    this.hours.reset();
    this.description.reset();
  }
  // Filter the activities based on category
  filterActivities() {
    this.filteredActivities = this.activities.filter((item) => item.category == this.selectedCategory)

    this.resetFields()
  }
  // show or hide the text boxes based on the properties list
  renderProperties() {
    // Filter based on the selected activity to get the properties
    let properties: any = this.activities
    .filter((item) => item.name == this.selectedActivity)
    .map((item) => item.properties);
    properties = properties[0];

    // If the activity has one of the properties, display it
    properties.includes('members') ? this.showMembers = true : this.showMembers = false;
    properties.includes('hours') ? this.showHours = true : this.showHours = false;
    properties.includes('description') ? this.showDescription = true : this.showDescription = false;

    this.resetFields();

  }
  // show the red error messages under the text boxes
  getErrorMessage(field: string) {
    switch(field) {
      case 'members':
        return this.members.hasError('required') ? 'This field cannot be left blank' : 
        this.members.hasError('pattern') ? 'this field must be a number' : '';
      case 'hours':
        return this.hours.hasError('required') ? 'This field cannot be left blank' : 
        this.hours.hasError('pattern') ? 'this field must be a number' : '';
      case 'entryDate':
        return this.entryDate.hasError('required') ? 'This field cannot be left blank' : '';
    }
  }

  // Check if fields are visible and then check if they are validated correctly
  validateForm(): boolean {

    if(this.showDescription) {
      if(this.description.invalid) {
        return false
      }
    }
    if(this.showHours) {
      if(this.hours.invalid) {
        return false
      }
    }
    if(this.showMembers) {
      if(this.description.invalid) {
        return false
      }
    }
    if(this.entryDate.invalid || isDate(this.entryDate.value) == false) {
      return false
    }
    return true
  }

  async onSubmit() {
    // Validate the form and submit
    if(!this.validateForm()) {

      this.snackBar.open('you forgot something...', 'dismiss', {duration: 2000});

      return false;
    }

    let selectedActivityObj = this.activities.filter((item) => item.name == this.selectedActivity)[0]
    let entry: Entry = {
      activityID: selectedActivityObj._id,
      activity: selectedActivityObj.name,
      category: selectedActivityObj.category,
      creator: this.usersService.mainUser.username,
      dateEntered: new Date(),
      dateCreated: new Date(),
      site: this.usersService.mainUser.site,
      clinic: this.usersService.mainUser.clinic,
      userStatus: this.usersService.mainUser.status,
      hours: this.hours.value || null,
      members: this.members.value || null,
      description: this.description.value || null
      }

      const submitEntryRequest = await this.dataService.addEntry(entry);

      if(submitEntryRequest) {
        this.snackBar.open('Thank you!', 'dimiss', {duration: 2000});
      } else {
        this.snackBar.open('Something went wrong while attempting to submit entry..', 'dismiss', {duration: 3000})
      }
    }

  onClear() {
    this.resetFields();
  }

}
