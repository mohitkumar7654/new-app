import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { Transaction } from './transactions.model';

import {TransactionService} from './transactions.service'

@Controller('transactions')
export class TransactionsController {
    constructor(private transactionService: TransactionService) {}

    @Post('/createTransaction')
    // create route to create transaction in db
    async createTransactions(@Body() trans:Transaction ) : Promise<Transaction> {
        return this.transactionService.createTransaction(trans);
    }

    @Get('/avg-trans-amt')
    // get the whole sum of amount in transactions
    async averageAmount():Promise<any>{
        return this.transactionService.getAverageAmount();
    }

    @Get('/all-trans')
    // get transaction on date basis
    async getTransactionOnDate(@Query() query:any):  Promise<any> {
        return this.transactionService.getTransactionOnDate(query);
    }

    @Get('/top-users')
    // get top transaction users
    async getTopTransactionUsers(@Query() query:any):  Promise<any> {
        return this.transactionService.getTopTransactionUsers(query);
    }

    @Get('/loyalty-score')
    // get top transaction users
    async getloyaltyScoreOfUsers():  Promise<any> {
        return this.transactionService.getloyaltyScoreOfUsers();
    }

}
