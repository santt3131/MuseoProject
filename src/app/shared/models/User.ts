import { Activity } from "./Activity";

export interface User{
    id:number;
    name:string;
    surname:string;
    type:string;
    email:string;
    password:string;
    passwordConfirm:string;
    activities: [];//puede ser varias
}