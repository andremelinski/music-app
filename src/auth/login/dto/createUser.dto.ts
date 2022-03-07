import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto{
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @MinLength(2)
    @IsNotEmpty()
    password: string
}


