import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { BooksModule } from './books/books.module';
import { CheckoutsModule } from './checkouts/checkouts.module';

@Module({
  imports: [AuthModule, UsersModule, VouchersModule, BooksModule, CheckoutsModule],
})
export class AppModule {}
