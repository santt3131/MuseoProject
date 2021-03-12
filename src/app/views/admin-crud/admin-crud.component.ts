import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/shared/models/Activity';
import { User } from 'src/app/shared/models/User';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin-crud',
  templateUrl: './admin-crud.component.html',
  styleUrls: ['./admin-crud.component.css']
})
export class AdminCrudComponent implements OnInit {
  public activityFormUpdate: FormGroup;
  public categoryList:string[];
  public subcategoryList:string[];
  public languagesList:string[];
  public user: User;
  public isAddForm: boolean;
  public idUser:number;
  public idEducation:number;
  public contAct: number;
  public contArrayAct: Activity[];


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activityService:ActivityService,
    private routeDirect: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    this.idUser = parseInt(this.route.snapshot.paramMap.get('idUser'));
    this.idEducation = parseInt(this.route.snapshot.paramMap.get('idActivity')
    );
    this.isAddForm = !this.idUser;

    //to cont to New Act
    this.activityService.getActivities().subscribe((activities) => {
      this.contArrayAct = activities;
      this.contAct= this.contArrayAct.length +1;
    });


    this.activityFormUpdate = this.formBuilder.group({
      'name': new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(55)]),
      'category': new FormControl('', [Validators.required]),
      'subcategory': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required,Validators.pattern(/^[+]?[0-9]{1,9}(?:.[0-9]{1,2})?$/)]),
      'language': new FormControl(null, ),
      'date': new FormControl('', [Validators.pattern(/^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/)]),
      'description': new FormControl('', []),
    });


    this.loadDataActivity();

  }


  loadDataActivity(){
    this.categoryList =['Cultura y patrimonio', 'Enoturismo' ,'Playas'];
    this.languagesList=['Ingles','Catalán','Español','Francés','Alemán'];
    this.activityFormUpdate.get('category').valueChanges.subscribe(val => {
      if(val == 'Cultura y patrimonio') {
        this.subcategoryList = ['Concierto', 'Espectáculo', 'Excursión', 'Festivales', 'Visita guiada', 'Museo', 'Monumento']
      } else if (val == 'enoturismo') {
        this.subcategoryList = ['Bodega', 'Cata de productos', 'Cxcursión', 'Museo del vino', 'Visita guiada']
      } else {
        this.subcategoryList = ['Actividad naútica', 'Cala', 'Concierto', 'Excusión', 'Taller']
      }
    });
  }

  activitySubmit():void{
    if (!this.isAddForm) {
      /*this.userService
        .updateEducation(
          this.educationFormUpdate.value,
          this.idEducation,
          this.idUser
        )
        .subscribe(() => {
          alert('Education update correctly');
          this.routeDirect.navigate(['/profile']);
        });*/
      }else{
        this.activityService.addActivity(this.activityFormUpdate.value,
          this.contAct,this.user.id).subscribe(()=>{
            alert('Activity was created!');
            this.routeDirect.navigate(['/admin']);
          });
      }
  
  }

  get name() {
    return this.activityFormUpdate.get('name');
  }
  
  get category() {
    return this.activityFormUpdate.get('category');
  }
  
  get subcategory() {
    return this.activityFormUpdate.get('subcategory');
  }
  
  get price() {
    return this.activityFormUpdate.get('price');
  }

  get language() {
    return this.activityFormUpdate.get('language');
  }

  get date() {
    return this.activityFormUpdate.get('date');
  }

  get description() {
    return this.activityFormUpdate.get('description');
  }





}