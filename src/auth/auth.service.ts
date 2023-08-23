import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService : JwtService
    ){}

    async register(query){
        try {
            const params : UserRegisterDto = query;

            if(params.password !==  params.confirmPassowrd) return new BadRequestException('Password not macth').getResponse();
            
            const findUser = await this.prisma.user.findFirst({
                where : {
                    OR : [
                        {
                            username: params.username
                        },
                        {
                            email : params.email
                        }
                    ]
                }
            });
    
            if(findUser) return new BadRequestException('Username or Email found').getResponse();
    
            const hashedPassword = await bcrypt.hash(params.password, +process.env.HASH_SALT);
    
            const user = await this.prisma.user.create({
                data: {
                    username: params.username,
                    name: params.name,
                    email: params.email,
                    password: hashedPassword
                }
            })
    
            if(user) {
                return {
                    statusCode: HttpStatus.CREATED,
                    message: 'Register Successfully'
                }
            }
        } catch (error) {
            return new InternalServerErrorException('failed create user');
        }
    }

    async login(query){
        try {
            const params : UserLoginDto = query;

            const findUser = await this.prisma.user.findFirst({
                where: {
                    username: params.username
                }
            })

            if(!findUser) return new BadRequestException('invalid credential').getResponse();

            if(!await bcrypt.compare(params.password, findUser.password)){
                return new BadRequestException('invalid credential').getResponse();
            }

            const payload = {
                sub : findUser.id,
                email: findUser.email,
                username: findUser.email
            }

            return {
                statusCode: HttpStatus.OK,
                message: 'Login Successfully',
                accessToken: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            return new InternalServerErrorException('Login failed');
        }
    }
}
