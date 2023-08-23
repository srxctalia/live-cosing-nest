import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { JoiPipe } from 'nestjs-joi';
import { CheckoutBookDto } from './dto/checkoutbook.dto';

@Controller('checkouts')
export class CheckoutsController {
    constructor(private readonly checkoutService: CheckoutsService){}

    @Post('/checkoutBook')
    async checkoutBook(@Body(JoiPipe) body: CheckoutBookDto){
        try {
            return await this.checkoutService.checkoutBook(body);
        } catch (error) {
            
        }
    }
}
