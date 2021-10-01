import { User } from "./User";

export const Genders: string[] = ["Male", "Female", "Other"]
export const Users : User[] = []

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