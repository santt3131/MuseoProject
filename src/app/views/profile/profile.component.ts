import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  @Input() public user:User; 
  public users:User[];
  public myUser:User;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public router: Router

  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    //if(this.user) console.log('el usuario de profile es',this.user );
    //this.user ? this.router.navigate(['/home']): null;

    this.joinFormUpdate = this.formBuilder.group({
      'name': new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(55),Validators.pattern(/^([a-zA-Z]){3,55}$/)]),
      'surname': new FormControl('', [Validators.minLength(3),Validators.maxLength(55),Validators.pattern(/^([a-zA-Z]){3,55}$/)]),
      'birthdate': new FormControl('', [Validators.pattern(/^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/)]),
      'phone': new FormControl('', [MyValidation.maskValidation(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/)]),
      'nationality': new FormControl('', []),
      'nif': new FormControl('', [MyValidation.checkNifEs()]),
      'about': new FormControl('', []),
    },
    {
      validator : MyValidation.checkPassword('password','passwordConfirm')
    }
    );
  }

  updateForm():void{
    const userForm = this.joinFormUpdate.value;
    console.log('los datos a registrar son:', userForm);//los nuevos campos
    console.log('this user es :', this.user);//el antiguo puedo pillar el id
    if(userForm && this.user.id){
      this.myUser.id= 3;
      this.myUser.name= userForm.name;
      this.myUser.surname= userForm.name;
      this.myUser.type= this.user.type;
      this.myUser.email= this.user.email;
      this.myUser.password= this.user.password;
      this.myUser.passwordConfirm= this.user.password;
      this.myUser.activities= this.user.activities;
      this.myUser.birthdate= userForm.birthdate;
      this.myUser.phone= userForm.phone;
      this.myUser.nationality= userForm.nationality;
      this.myUser.nif= userForm.nif;
      this.myUser.about = userForm.about;

      this.userService.updateUser(this.myUser).subscribe(() => {
        console.log('se registro correctamente');
        alert('usuario actualizado');
      });
    }
    //if(this.user)
    //this.myUser.id = this.user?.id;
    
    //this.userForm = user;
    //console.log('el user power es', this.userForm);

   
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




}






