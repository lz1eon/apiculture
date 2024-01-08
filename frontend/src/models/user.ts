export type User = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;    
    admin: boolean;
    accessToken?: string;
    refreshToken?: string;
}