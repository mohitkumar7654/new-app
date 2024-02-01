import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transactions.model';


@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name) private readonly TransactionModel: Model<Transaction>) { }

    async createTransaction(trans: Transaction): Promise<Transaction> {
        trans['Timestamp'] = new Date();
        let createTrans = new this.TransactionModel(trans)
        return createTrans.save();
    }

    async getAverageAmount() {
        // can perform it using methods
        // 1. Aggregation
        // 2. simple loop for all documents and getting count

        // Aggregation 
        let pipelineQuery = [
            {
                $group:
                {
                    _id: null,
                    totalAmountCount: {
                        $sum: "$Amount",
                    },
                },
            },
        ]

        let amountCount = await this.TransactionModel.aggregate(pipelineQuery).exec();
        return { totalAmount: amountCount[0].totalAmountCount }
    }

    async getTransactionOnDate(query) {
        // from start date to end date for getting transaction
        if (query.startDate && query.endDate) {
            let startDate = new Date(query.startDate).setHours(0);
            let endDate = new Date(query.endDate).setHours(24);
            let params = { Timestamp: { $gte: startDate, $lte: endDate } }
            return await this.TransactionModel.find(params);
        }
    }

    async getTopTransactionUsers(query) {
        if (query.userCount) {
            let value = -1;
            const queryPipeline :any = [
                {
                    $group:
                    {
                        _id: "$UserID",
                        totalAmount: {
                            $sum: "$Amount",
                        },
                    }
                },
                {
                    $sort: {
                        totalAmount: -1
                    }
                },
                {
                    "$limit": parseInt(query.userCount),
                },
            ];
            let topUsers = await this.TransactionModel.aggregate(queryPipeline).exec();
            let res = []
            for (let users of topUsers){
                    res.push({
                        UserID: users["_id"],
                        totalAmount: users["totalAmount"]
                    })
            }
            return res
        }
    }

    async getloyaltyScoreOfUsers() {

    }

}