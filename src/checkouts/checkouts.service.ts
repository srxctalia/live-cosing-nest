import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckoutBookDto } from './dto/checkoutbook.dto';

@Injectable()
export class CheckoutsService {
    constructor(
        private prisma: PrismaService
    ){}

    async checkoutBook(query){
        try {
            const params: CheckoutBookDto = query;

            let findUserVoucher = null;
            if(params.useVoucher){
                findUserVoucher = await this.prisma.userVoucher.findFirst({
                    where: {
                        id: params.userVoucherId
                    }
                })
            }

            const checkout = await this.prisma.tCheckout.create({
                data: {
                    user_id: params.userId,
                    user_voucher_id: params.userVoucherId,
                    amount: params.amount,
                    price: params.price,
                    flag_voucher: params.useVoucher,
                    total_price: params.amount*params.price
                }
            });

            if(!checkout) return new BadRequestException('failed checkout').getResponse();

            if(params.useVoucher && findUserVoucher){
                const point = (params.amount*params.price)*(findUserVoucher.value/100)

                const updateUser = await this.prisma.user.update({
                    where: {
                        id: params.userId
                    },
                    data: {
                        point: point
                    }
                });
            }

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Checkout Successfully'
            }
        } catch (error) {
            return new InternalServerErrorException('failed checkout')
        }
    }

    
}
