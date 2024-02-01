import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionService } from './transactions/transactions.service';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/transactions'),
    TransactionsModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
