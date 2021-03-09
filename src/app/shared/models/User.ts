export interface User{
    id:number;
    name:string ;
    surname:string ;
    type:string ;
    email:string;
    password:string;
    passwordConfirm:string;
    activities: number[];//puede ser varias
    favorites: number[] ;//puede ser varias
    //other field to profile
    birthdate?:Date;
    phone?:number;
    nationality?:string;
    nif?:string;
    about?:string;
    //education
    typeEducation?:string;
    level?:string;
    nameEducation?:string;
    universityEducation?:string;
    finishDateEducation?:string;
}