import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { MyValidation } from 'src/app/shared/Validations/my-validation';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css'],
})
export class SiginComponent implements OnInit {
  public loginForm: FormGroup;
  public myUser: User;
  public users: User[];
  public tempUser:User;
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        MyValidation.maskValidation(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [Validators.required]),
    });

  }


  checkLogin() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.userService
        .searchUser(this.users, this.email.value, this.password.value)
        .subscribe((user) => {
          this.myUser = user;//lleno o vacio del usuario autenticado
          if( Object.keys(this.myUser).length !== 0 ){
            console.log('identificacion correctamente');
            localStorage.setItem('miUsuario',JSON.stringify(this.myUser));
            this.router.navigate(['/home']);
          }else {
            console.log('identificacion incorrecta');
          }

        });
    });
  }

  //mis gets
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
