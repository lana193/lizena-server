import { Schema, model } from 'mongoose';

const ForSaleSchema = new Schema({
  object_name: {
    type: String,
    required: true,
    unique: true
  },
  subtitle: {
    type: String
  },
  description: {
    type: String
  },
  metres: {
    type: Number,
  },
  price: {
    type: Number,
  },
  rooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  main_image: [{
    type: String,
    default: []
  }],
  photos: [{
    type: String,
    default: []
  }]
});

export const ForSale = model('ForSale', ForSaleSchema);