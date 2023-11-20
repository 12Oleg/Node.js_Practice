import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IGenre extends Document {
  _id: Types.ObjectId;
  name: string;
}

const GenreSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must have at least 2 characters'],
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
