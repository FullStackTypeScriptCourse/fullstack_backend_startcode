import * as dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import mongoose from 'mongoose';
import app from './app';

const DB = process.env.DATABASE_DEV!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'))
  .catch((err) => console.log("DB connection failed!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`);
});