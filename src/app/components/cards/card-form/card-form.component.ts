import { Component, Input, inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { PropertiesFactory } from '../../../utils/properties-factory';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from "@angular/material/stepper";
import { MatInputModule } from '@angular/material/input';
import { PropertiesListComponent } from "../../properties-list/properties-list.component";
import { DocumentService } from '../../../services/document.service';
import { FilesService } from '../../../services/files.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface prop {
  name: string;
  check: boolean;
  value?: FormControl;
  subprops?: prop[];
}

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatStepperModule, MatInputModule, PropertiesListComponent],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})


export class CardFormComponent {
  @Input({required:true}) data : any | undefined
  form! : FormGroup
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  filteredProperties!: Observable<string[]>;
  properties: string[] = [];
  categories = ['Administrative','Financial','Human Resources','Technical']
  subcategories!: string[]


  announcer = inject(LiveAnnouncer);

  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup

  propertiesControl: prop[] = []



  constructor(private formBuilder: FormBuilder, private propertiesFactory: PropertiesFactory, private docService: DocumentService, private fileService: FilesService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.subcategories = this.propertiesFactory.getProperties(this.data["category"])
    this.initForm()
    this.propertiesControl = this.initPropertiesControl(this.data["properties"])
    
  }

  change(){
    this.firstFormGroup.controls["subcategory"].setValue(null)
    if (this.firstFormGroup.controls["category"].value){
      this.subcategories = this.propertiesFactory.getProperties(this.firstFormGroup.controls["category"].value)
    }
    else {
      this.subcategories = []
    }
  }

  initForm(){
    this.firstFormGroup = this.formBuilder.group({
      category : [this.data["category"], Validators.required],
      subcategory :[this.data["subcategory"], Validators.required]
    })
    this.secondFormGroup = this.formBuilder.group({
      path : [this.data["path"], Validators.required],
      fileName :[this.data["file_name"], Validators.required]
    })
  }

  initPropertiesControl(data: any) : prop[]{
    let result = []
    for(const [key, value] of  Object.entries(data)){
      if (typeof(value) === "string"){
        result.push({
          name : key,
          value : new FormControl(value, [Validators.required]),
          check : true,
        })
      }
      else if( typeof(value) === "object" && Array.isArray(value)){
        let subs: any = []
        value.forEach((element)=> subs.push(this.initPropertiesControl(element)))
        result.push({
          name : key,
          check : true,
          subprops : subs
        })
      }
      else {
        result.push({
          name : key,
          check : true,
          subprops : this.initPropertiesControl(value)
  
      }
    )
  }
      }
      return result
    }


  initRequestJSON(props: prop[]){
    let result: {[key: string]: any} ={}
    props.forEach((prop) => {
      if (prop.check){
        if (!prop.subprops){
          result[prop.name] = prop.value?.value
        }
        else {
          let key = prop.name
          let subprops = prop.subprops
          result[key] = []
          subprops.forEach(subprop => {
            if (Array.isArray(subprop)){
              console.log(result[key])
              result[key].push(this.initRequestJSON(subprop))
            }
            else{
              result[key] = this.initRequestJSON(subprops)
            }
          })
        }
      }
    })
    return result
  }

  create(){
    let reqData = this.initRequestJSON(this.propertiesControl)
    this.data["category"]= this.firstFormGroup.controls["category"].value
    this.data["subcategory"]= this.firstFormGroup.controls["subcategory"].value
    this.data["path"]= this.secondFormGroup.controls["path"].value
    this.data["file_name"]= this.secondFormGroup.controls["fileName"].value
    this.data["properties"] = reqData
    this.data["files"]= []
    history.state.files.forEach((file: File) => {
      this.data["files"].push(file.name)
    })
    this.docService.createDocument(this.data).subscribe((res) => {
        if(res){
          console.log(res)
          this.fileService.downloadFile(res.document_id, res.file_path, res.file_name)
          this.router.navigate(['/documents'])
        }
        else{
          this.snackBar.open("An error has occurred, please try again", "OK",{horizontalPosition:"right", duration: 3000})
        }
    })   
  }
}


