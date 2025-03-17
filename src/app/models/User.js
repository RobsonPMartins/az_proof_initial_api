import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import SHA256 from '@pozible/meteor-sha';

const UsersSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    profile: {
      type: Object,
      properties: {
        type: { type: String },
        name: { type: String, required: true },
        secondary_name: { type: String },
        cpf_cnpj: { type: String },
        phone: { type: String },
        status: { type: String },
        roles: {
          type: Array,
          role: { type: String }
        },
        active: { type: Boolean }
      }
    },
    emails: [{
      address: { type: String, required: true, lowercase: true },
      verified: { type: Boolean, required: true }
    }],
    services: {
      type: Object,
      required: true,
      password: {
        type: Object,
        required: true,
        bcrypt: {
          type: String,
          required: true,
          select: false
        }
      }
    },
    history: {
      type: Array,
      type: { type: String },
      date: { type: Date }
    },
    removed: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to hash password before saving to the DB
UsersSchema.pre('save', async function (next) {
  const newPassword = SHA256(this.services.password.bcrypt);  // Hash SHA256
  const hash = await bcrypt.hash(newPassword, 10);  // Hash bcrypt
  this.services.password.bcrypt = hash;
  next();
});

// Method to check password during authentication
UsersSchema.methods.checkPassword = async function(password) {
  const hash = SHA256(password);  // Apply SHA256 to the password provided
  return await bcrypt.compare(hash, this.services.password.bcrypt);  // Compare with stored hash
};

export default mongoose.model('User', UsersSchema);
