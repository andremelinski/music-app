import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './login/dto/createUser.dto';
@Controller()
export class AuthController {
    constructor(private authService:AuthService ){}

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createUserDto:CreateUserDto): Promise<any>{
        return this.authService.createUser(createUserDto.email, createUserDto.password)
        
    };

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() createUserDto:CreateUserDto): Promise<any>{
        console.log("aqui")
        return this.authService.login(createUserDto.email, createUserDto.password)
        
    };
}
