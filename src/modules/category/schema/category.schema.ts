
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
        }
    },
    timestamps: true,
})
export class Category {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, })
    description?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);