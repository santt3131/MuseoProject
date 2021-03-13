import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { MyValidation } from 'src/app/shared/Validations/my-validation';

@Component({
  selector: 'app-joinnow',
  templateUrl: './joinnow.component.html',
  styleUrls: ['./joinnow.component.css']
})
export class JoinnowComponent implements OnInit {

  public joinForm: FormGroup;
  public emailExist: boolean;
  public users:User[];
  public user:User;
  private match:boolean =false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.joinForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(55),Validators.pattern(/^([a-zA-Z]){3,55}$/)]),
      'surname': new FormControl('', [Validators.minLength(3),Validators.maxLength(55),Validators.pattern(/^([a-zA-Z]){3,55}$/)]),
      'type': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required,
        MyValidation.maskValidation(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        
      ]),
      'password': new FormControl('', [Validators.required,Validators.minLength(8)]),
      'passwordConfirm': new FormControl('', [Validators.required,Validators.minLength(8)])
    },
    {
      validator : MyValidation.checkPassword('password','passwordConfirm')
    }
    );
  }

  joinNow():void{

    this.userService.getUsers().subscribe((users) => {
      this.users = users;
       this.users.find((obj)=>{
         this.match = obj.email === this.email.value;
      });
      if( this.match !== true ){
        const user = this.joinForm.value;
        const id = this.userService.genId(this.users );
        this.userService.addUser(user,id).subscribe(
          (user)=>{
            this.user = user;
            this.userService.storeUser(this.user ); //subject
            this.router.navigate(['/home']);
          });          
      }else {
        this.joinForm.controls['email'].setErrors({ 'verifiedEmail': true  });
      }
    });

  }

  get name(){
    return this.joinForm.get('name');
  }

  get surname() {
    return this.joinForm.get('surname');
  }

  get type() {
    return this.joinForm.get('type');
  }

  get email() {
    return this.joinForm.get('email');
  }

  get password() {
    return this.joinForm.get('password');
  }

  get passwordConfirm() {
    return this.joinForm.get('passwordConfirm');
  }


}
