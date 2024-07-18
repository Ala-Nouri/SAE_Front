import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertiesFactory } from '../../../utils/properties-factory';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-filter.component.html',
})
export class CardFilterComponent {
  @Output() filterEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  filterForm!: FormGroup
  searchForm!: FormGroup
  categories = ['All','Administrative','Financial','Human Resources','Technical']
  subcategories = ['All'];
  users!: User[]
  constructor(private fb: FormBuilder, private propertiesFactory: PropertiesFactory, private userService: UsersService) {}

  ngOnInit(){
    this.userService.getUsers().subscribe((resp=> this.users = ['All', ...resp]))
    this.filterForm = this.fb.group({
      category : new FormControl('All', Validators.required),
      subcategory : new FormControl('All', Validators.required),
      created_by : new FormControl('', Validators.required)
    })
    this.searchForm = this.fb.group({
      searchField : new FormControl('')
      })
    this.onChange()
  }

  updateSubcategoriesList() {
    this.subcategories = ['All', ...this.propertiesFactory.getProperties(this.filterForm.controls['category'].value)];
    this.filterForm.controls['subcategory'].setValue('All')
    }
  
    onChange(){
    this.filterForm.valueChanges.subscribe((val)=>{
      this.filterEvent.emit(val)
    })
    this.searchForm.valueChanges.subscribe((val)=>{
      this.searchEvent.emit(val['searchField'])
    })
  }


}
