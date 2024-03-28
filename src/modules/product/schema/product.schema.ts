

import { Category } from '../../category/schema/category.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
        },
        virtuals: true
    },
    timestamps: true,
})
export class Product {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, })
    description?: string;

    @Prop({ type: Number })
    price: number;

    @Prop({ type: Number })
    stock: number;

    @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
    categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);