import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/shared/models/Education';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public educationForm: FormGroup;
  public user: User;
  public users: User[];
  public myUser: User;
  public myEducation: Education;
  public educationFormUpdate: FormGroup;
  public idUser: number;
  public idEducation: number;
  public isAddForm: boolean;
  public contEdu: number;
  public contEducation: Education[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private routeDirect: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    this.idUser = parseInt(this.route.snapshot.paramMap.get('idUser'));
    this.idEducation = parseInt(
      this.route.snapshot.paramMap.get('idEducation')
    );

    this.isAddForm = !this.idUser;
    //to cont
    this.userService.getEducationsAll().subscribe((allEdu) => {
      this.contEducation = allEdu;
      this.contEdu = this.contEducation.length + 1;
      //Si es el formulario Add
      if (this.isAddForm) {
        this.myEducation = {
          id: this.contEdu,
          typeEducation: '',
          level: '',
          nameEducation: '',
          universityEducation: '',
          finishDateEducation: '',
          userId: this.user.id,
        };
      } else {
        this.getEducation(this.idEducation); //seteo myEducation
      }
      this.educationFormUpdate = this.formBuilder.group({
        typeEducation: new FormControl('', []),
        level: new FormControl('', []),
        nameEducation: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(55),
        ]),
        universityEducation: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(55),
        ]),
        finishDateEducation: new FormControl('', [
          Validators.pattern(
            /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/
          ),
        ]),
      });
    });
  }

  getEducation(idEducation: number): void {
    this.userService.getEducationBySelect(idEducation).subscribe((study) => {
      this.myEducation = study;
    });
  }

  updateFormEducation(): void {
    if (!this.isAddForm) {
    this.userService
      .updateEducation(
        this.educationFormUpdate.value,
        this.idEducation,
        this.idUser
      )
      .subscribe(() => {
        alert('Education update correctly');
        this.routeDirect.navigate(['/profile']);
      });
    }else{
      this.userService.addEducation(this.educationFormUpdate.value,
        this.contEdu,this.user.id).subscribe((user)=>{
          alert('Education was created!');
          this.routeDirect.navigate(['/profile']);
        });
    }


  }


  get typeEducation() {
    return this.educationFormUpdate.get('typeEducation');
  }

  get level() {
    return this.educationFormUpdate.get('level');
  }

  get nameEducation() {
    return this.educationFormUpdate.get('nameEducation');
  }

  get universityEducation() {
    return this.educationFormUpdate.get('universityEducation');
  }

  get finishDateEducation() {
    return this.educationFormUpdate.get('finishDateEducation');
  }
}