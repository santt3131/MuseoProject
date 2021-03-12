import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Education } from 'src/app/shared/models/Education';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { MyValidation } from 'src/app/shared/Validations/my-validation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public joinFormUpdate: FormGroup;
  public user:User; 
  public users:User[];
  public myUser:User;
  public educations:Education[];
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public router: Router

  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    this.userService.getEducationsByUser(this.user.id).subscribe((edus)=>{
        this.educations= edus;
    });
    if(this.user.type === 'TOURIST'){
      this.user.companyName = 'null';
      this.user.companyDescription= 'null',
      this.user.cif="null"
     }

    this.joinFormUpdate = this.formBuilder.group({
      'name': new FormControl(this.user.name, [Validators.required,Validators.minLength(3),Validators.maxLength(55),Validators.pattern(/^([a-zA-Z]){3,55}$/)]),
      'surname': new FormControl(this.user.surname, [Validators.minLength(3),Validators.maxLength(55),Validators.pattern(/^([a-zA-Z]){3,55}$/)]),
      'birthdate': new FormControl(this.user.birthdate, [Validators.pattern(/^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/)]),
      'phone': new FormControl(this.user.phone, [Validators.pattern(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/)]),
      'nationality': new FormControl(this.user.nationality, []),
      'nif': new FormControl(this.user.nif, [MyValidation.checkNifEs()]),
      'about': new FormControl(this.user.about, []),
      'companyName': new FormControl(this.user.companyName, [Validators.required,Validators.minLength(3),Validators.maxLength(55),Validators.pattern(/^([a-zA-Z](\s)?){3,55}$/)]),
      'companyDescription': new FormControl(this.user.companyDescription, []),
      'cif': new FormControl(this.user.cif, [Validators.required]),
    });
  }

  ngOnChanges():void{
    console.log('soy onchange de profile');
  }

  ngAfterContentInit():void{
    console.log('soy afterContentInit de profile');
  }

  ngAfterContentChecked():void{
    console.log('soy aftercontentchecked de profile');
  }


  deleteEducation(idEducation:number):void{
      if (confirm(`Are you sure you want to delete education number ${idEducation}!`)) {
        this.educations = this.educations.filter(edu => edu.id !== idEducation);
        this.userService.deleteEducation(idEducation).subscribe();
      }else{
        alert('dont delete nothing.Dont worry');
      }
  }


  updateForm():void{
    const userForm = this.joinFormUpdate.value;
    console.log('los datos a registrar son:', userForm);//los nuevos campos
    console.log('this user es :', this.user);//el antiguo puedo pillar el id
    if(userForm && this.user.id){
      this.myUser={
        id:this.user.id,//
        name:userForm.name ,
        surname:userForm.surname ,
        type:this.user.type,//
        email:this.user.email,//
        password:this.user.password,//
        passwordConfirm:this.user.passwordConfirm,//
        activities: this.user.activities,//
        favorites:this.user.favorites,//
        birthdate: userForm.birthdate,
        phone:userForm.phone,
        nationality:userForm.nationality,
        nif:userForm.nif,
        about:userForm.about,
        companyName: userForm?.companyName,
        companyDescription: userForm?.companyDescription,
        cif:userForm?.cif
      }

      this.userService.updateUser(this.myUser).subscribe(() => {
        console.log('se registro correctamente');
        this.userService.storeUser(this.myUser ); //tambien actualizo mi subject
        alert('usuario actualizado');
      });
    
    }
  }


get name(){
  return this.joinFormUpdate.get('name');
}

get surname() {
  return this.joinFormUpdate.get('surname');
}

get birthdate() {
  return this.joinFormUpdate.get('birthdate');
}

get phone() {
  return this.joinFormUpdate.get('phone');
}

get nationality() {
  return this.joinFormUpdate.get('nationality');
}

get nif() {
  return this.joinFormUpdate.get('nif');
}

get about() {
  return this.joinFormUpdate.get('about');
}

get companyName() {
  return this.joinFormUpdate.get('companyName');
}

get companyDescription() {
  return this.joinFormUpdate.get('companyDescription');
}

get cif() {
  return this.joinFormUpdate.get('cif');
}


}






