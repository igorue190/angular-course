export class User{
    constructor(
    public Id: string,
    public UserName: string, 
    public Email: string,
    public Gender: string,
    public FirstName: string,
    public LastName: string,
    public Password: string,
    public Country?: string,
    public City?: string,
    public ZipCode?: string ){}
}
