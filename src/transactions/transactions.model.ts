import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'transactions',
})

export class Transaction extends Document {
  @Prop()
  UserID: string;

  @Prop()
  Amount: Number;

  @Prop()
  Timestamp?: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);