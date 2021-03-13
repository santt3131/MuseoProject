export interface Activity{
    id:number;
    name:string;
    category:string;
    subcategory:string,
    price:string;
    language:string;
    date:string;
    description:string;
    peopleRegistered:number;
    userIdOwner: number;//solo sera uno
}