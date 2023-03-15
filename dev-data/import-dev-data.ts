// import * as dotenv from 'dotenv'
// dotenv.config({path:'./config.env'});
// import fs from 'fs';
// import mongoose from 'mongoose';
// import REPLACE from '../models/REPLACE';
//
//
// const DB = process.env.DATABASE_DEV!.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD!,
// );
//
// mongoose
//   .set('strictQuery', false)
//   .connect(DB)
//   .then(() => {
//     console.log('DB connection successful!');
//   });
// // Read json file
//
// const replace = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));
//
//
// // Import data to database
//
// const importData = async () => {
//   try {
//     await REPLACE.create(replace);
//     console.log('Data successfully loaded!');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };
//
// // Delete all from collection
// const deleteData = async () => {
//   try {
//     await REPLACE.deleteMany();
//     console.log('Data successfully deleted!');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };
//
// if (process.argv[2] === '--import') {
//   importData();
// } else if (process.argv[2] === '--delete') {
//   deleteData();
// }
