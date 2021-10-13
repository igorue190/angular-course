import { UUID } from "angular2-uuid";
import { User } from "./User";

export const Genders: string[] = ["Male", "Female", "Other"]
export const Users : User[] = [
    {Id: UUID.UUID(), UserName: 'Igor', Email: 'igor@gmail.com', Gender: Genders[0], FirstName: 'Igor', LastName: 'Nesterenko', Password:'123456', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'},
    {Id: UUID.UUID(), UserName: 'Alex', Email: 'alex@gmail.com', Gender: Genders[0], FirstName: 'Alex', LastName: 'Pain', Password:'246810', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'},
    {Id: UUID.UUID(), UserName: 'Serg', Email: 'serg@gmail.com', Gender: Genders[0], FirstName: 'Serg', LastName: 'Train', Password:'1357911', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'},
    {Id: UUID.UUID(), UserName: 'Peter', Email: 'peter@gmail.com', Gender: Genders[0], FirstName: 'Peter', LastName: 'Game', Password:'654321', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'},
    {Id: UUID.UUID(), UserName: 'John', Email: 'john@gmail.com', Gender: Genders[0], FirstName: 'John', LastName: 'rain', Password:'111111', Country: 'Ukraine', City: 'Kharkov', ZipCode: '67000'}
]

export enum FormUserData{
    userName = 'userName', 
    email = 'email',
    gender = 'gender',
    firstName = 'firstName',
    lastName = 'lastName',
    password = 'password',
    confirmPassword = 'confirmPassword',
    country = 'country',
    city = 'city',
    zipCode = 'zipcode',
    shipingCountry = 'shipingCountry',
    shipingCity = 'shipingCity',
    shipingZipCode = 'shipingZipCode'
}

export enum FormGroupName{
    passwordGroup = 'passwordGroup',
    address = 'address'
}