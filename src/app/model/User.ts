import { Gender } from "./Gender";

export class User{
    constructor(
    public Id: string,
    public UserName: string, 
    public Email: string,
    public Gender: Gender,
    public FirstName: string,
    public LastName: string,
    public Password: string ){}
}
