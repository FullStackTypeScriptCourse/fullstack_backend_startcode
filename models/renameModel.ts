import mongoose from 'mongoose';

const renameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A object must have a make'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'A object must have a model'],
    trim: true,
  },
  year: {
    type: Number,
  },
  price: {
    type: Number,
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val: number) {
        // This only points to current doc on NEW document creation
        // @ts-ignore
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  },
  color: {
    type: String,
    enum: ['red', 'blue', 'black', 'white', 'yellow', 'green'],
    message: 'Color is either: red, blue, black, white, yellow, green',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // Don't show this field in the response
  },
});

const Rename = mongoose.model('Rename', renameSchema);

export default Rename;