import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class CheckoutBookDto {

    @IsNotEmpty()
    @JoiSchema(Joi.number().required())
    userId: number

    @IsNotEmpty()
    @JoiSchema(Joi.number().required())
    bookId: number

    @IsNotEmpty()
    @JoiSchema(Joi.boolean().required())
    useVoucher: boolean

    @IsNotEmpty()
    @JoiSchema(Joi.number().required())
    price: number

    @IsNotEmpty()
    @JoiSchema(Joi.number().required())
    userVoucherId: number

    @IsNotEmpty()
    @JoiSchema(Joi.number().required())
    amount: number
}