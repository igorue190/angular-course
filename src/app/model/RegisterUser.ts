import { Gender } from "./Gender";

export class RegisterUser{  
    constructor(
    public UserName: string,
    public Email: string,
    public Gender: string,
    public FirstName: string,
    public LastName: string,
    public Password: string,
    public ConfirmPassword: string){}
}