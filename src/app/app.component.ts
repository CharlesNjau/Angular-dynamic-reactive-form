import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  submitted = false;
  formArray = new FormArray([]);
  formArray2 = new FormArray([]);


  objct={
  "categoryname": "Men's jeans",
  "attributes": [
    {
      "name": "Color",
      "options": [
        {
          "option": "red"
        },
        {
          "option": "blue"
        },
        {
          "option": "green"
        }
      ]
    },
    {
      "name": "size",
      "options": [
        {
          "option": "S"
        },
        {
          "option": "M"
        },
        {
          "option": "L"
        },
        {
          "option": "XL"
        },
        {
          "option": "XXL"
        },
        {
          "option": "XXXL"
        }
      ]
    }
  ]
}
//parent
  X: FormGroup = this.fb.group({
    categoryname: '',
    attributes: this.fb.array([])
  });

  Yg: FormGroup = this.fb.group({
    name: '',
    options: this.fb.array([])
  });

  Zg: FormGroup = this.fb.group({
    option: ''
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createYg();
    this.createZg();
    this.X.patchValue(this.objct)
    console.log("Form structure")
    console.log(this.X.get('options') as FormArray)

    this.objct.attributes.forEach((attribute,index)=>{
         let options = this.attributes.at(index)
      
         
       this.formArray.push(this.fb.group({
        name:attribute.name,
        options: ''
       }))
      attribute.options.forEach((attribute)=>{
            this.formArray2.push(this.fb.group({
              options:attribute.option
            }))
      });

      
    })
    


    console.log("form Array 2 data \n", this.formArray2.value)
    this.X.setControl('attributes',this.formArray)
    this.X.


    //setControl('options',this.formArray2)

  

  }

  ngOnChanges() {
  }

  onSubmit(formValue) {
    this.submitted = true;
    console.log("form data objct \n",JSON.stringify(this.X.value,null,2));
  }

  createYg() {
    return this.fb.group({
      name: '',
      options: this.fb.array([])
    });
  }

  createZg() {
    return this.fb.group({
      option: ''
    });
  }

   createZg2() {
    return this.fb.group({
      option: 'red'
    });
  }
  
  get attributes(): FormArray {
    return this.X.get('attributes') as FormArray;
  }

  getCurrentZ(index): FormArray {
    return this.attributes.at(index).get('options') as FormArray;
  }
  
  addY(): void {
    this.attributes.push(this.createYg());
  }

  addZ(index): void {
    let options = this.attributes.at(index).get('options') as FormArray;
    let Zg = this.createZg();
    options.push(Zg);
  }




  deleteY(index) {
    this.attributes.removeAt(index);
  }

  deleteZ(Yindex, index) {
    let options = this.attributes.at(Yindex).get('options') as FormArray;
    options.removeAt(index);
  }
}
