export class userAuth{
    email: string;
    password: string;
    returnSecureToken: boolean;
}

export class emailOb {
    requestType: string;
    email: string;
}

export interface FbAuthResponse{
    idToken: string,
    expiresIn: string
}