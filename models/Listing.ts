import { Document, Schema, model, models } from "mongoose";

export interface IListing extends Document {
  title: string;
  location: string;
  "application date": string;
  "posting date": string;
  description: string[];
  company: string;
}

const ListingSchema: Schema = new Schema({
    title: {type: String, required: true},
    location: {type: String, required: true},
    "application date": {type: String, required: true},
    "posting date": {type: String, required: true},
    description: {type: Array<string>, required: true},
    company: {type: String, required: true},
}, {collection: "Listings"})

export default models.Listing || model<IListing>("Listing", ListingSchema);