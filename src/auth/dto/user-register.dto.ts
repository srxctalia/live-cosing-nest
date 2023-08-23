import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"

export class UserRegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(Joi.string().required().email())
    email : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(Joi.string().required())
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(Joi.string().required())
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(Joi.string().required().min(8).max(20))
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @JoiSchema(Joi.any().valid(Joi.ref('password')).required())
    confirmPassowrd: string
}