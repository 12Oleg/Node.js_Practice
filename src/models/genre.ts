import mongoose, { Schema, Document, Types } from 'mongoose';
import { ERRORS } from '../config/constants';

export interface IGenre extends Document {
  _id: Types.ObjectId;
  name: string;
}

const GenreSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, ERRORS.NAME_LENGTH],
      trim: true,
      cast: false,
    },
  },
  {
    versionKey: false,
  },
);

GenreSchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export const Genre = mongoose.model<IGenre>('genre', GenreSchema);
