import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @Post('/userRegister')
    async registerUser(@Body(JoiPipe) body: UserRegisterDto){
        try {
            return await this.authService.register(body);
        } catch (error) {

        }
    }

    @ApiProperty()
    @Post('/userLogin')
    async loginUser(@Body(JoiPipe) body: UserLoginDto){
        try {
            return await this.authService.login(body);
        } catch (error) {
            console.log(error)
        }
    }
}
