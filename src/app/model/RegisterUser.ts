export class RegisterUser{  

    public ConfirmPassword: string;
    
    constructor(
    public UserName: string,
    public Email: string,
    public Gender: string,
    public FirstName: string,
    public LastName: string,
    public Password: string,){}
}