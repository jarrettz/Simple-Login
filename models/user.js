const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(name) {
        const user = await this.constructor.findOne({ name });
        if(user) {
          if(this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: props => 'The specified username is already in use.'
    },
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('User', userSchema);