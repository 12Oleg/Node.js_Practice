import mongoose from 'mongoose';

export async function connectToDatabase() {
  await mongoose.connect(
    'mongodb+srv://oleg:32156@clusternodejs.cpbapnx.mongodb.net/moviesdb?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions,
  );
  console.log('Connected to MongoDB');
}
