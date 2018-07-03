import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  price: { type: String },
  size: { type: String },
  zipcode: { type: String },
  productType: { type: String },
  transactionType: { type: String },
  heatingType: { type: String },
  kitchenType: { type: String },
  hasBalcony: { type: String },
  nbBedrooms: { type: String },
  nbRooms: { type: String },
  hasBathroom: { type: String },
  hasShoweroom: { type: String },
  floor: { type: String },
  pricePerSquareMeter: { type: String },
  image: { type: String },
  href: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema);
