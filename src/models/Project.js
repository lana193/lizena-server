import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
    project_name: {
        type: String,
        required: true,
        unique: true
      },
    description: {
        type: String
      },
    for_sale: {
      type: Boolean,
      default: false
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

export const Project = model('Project', ProjectSchema);