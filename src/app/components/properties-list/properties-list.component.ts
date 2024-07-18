import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


export interface prop {
  name: string;
  check: boolean;
  value?: FormControl;
  subprops?: prop[];
}


@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './properties-list.component.html',
  styleUrl: './properties-list.component.css'
})
export class PropertiesListComponent {

isArray(_t15: any): any {
    return Array.isArray(_t15)
}
  @Input({required:true}) data : any | undefined
  @Output() childEvent = new EventEmitter();

  announcer = inject(LiveAnnouncer);

  ngOnInit(){

  }

  onChildEvent(node: prop) {
    node.check = this.checkState(node)
  }

  emitChange(node: prop){
    this.childEvent.emit(node)
  }

  setAll(node: prop,completed: boolean) {
    node.check = completed
    node.subprops?.forEach(subprop => {
      if (!Array.isArray(subprop)){
        subprop.check = completed
      }
      else {
        for ( const [key,value] of Object.entries(subprop)){
          this.setAll(value,completed)
        }
      }
    }
  )
    this.emitChange(node)
  }

  setParent(node: prop, child:prop, completed: boolean) {
    child.check = completed
    if (node.subprops){
      node.check = node.subprops.filter(subprop => subprop.check == false).length != node.subprops.length

    }
  }

  checkState(node: prop){
    let state = false
    node.subprops?.forEach(subprop =>{
      for ( const [key,value] of Object.entries(subprop)){
        state = state ||   value.check
      }
    })
    return state
  }

}
