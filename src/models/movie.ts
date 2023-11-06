import mongoose, { Schema, Document, Types } from 'mongoose';
import { Genre } from './genre';

export interface IMovie extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string[];
}

const MovieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      cast: false,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [2, 'Description must have at least 7 characters'],
      trim: true,
      cast: false,
    },
    releaseDate: {
      type: Date,
      required: [true, 'Release date is required'],
    },
    genre: {
      type: [String],
      required: [true, 'Genre is required'],
      cast: false,
      validate: {
        validator: async function (value: string[]) {
          const genreRegex = value.map((genre) => new RegExp(`^${genre}$`, 'i'));
          const genresCount = await Genre.countDocuments({ name: { $in: genreRegex } });
          return genresCount === value.length;
        },
        message: 'Invalid genres specified',
      },
    },
  },
  {
    versionKey: false,
  },
);

export const Movie = mongoose.model<IMovie>('movie', MovieSchema);
