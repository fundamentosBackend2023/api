const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
    name: {
        type: String,
        minlength: [2, 'Must have at least 2 letters'],
        required: [true, 'Mandatory field']
    },
    age: {
        type: Number,
        required: [true, 'Mandatory field'],
        min: [18, 'age should be above legal age'],
        max: [120, 'age out of reasonable range']
    },
    city: {
        type: String, 
        enum: {
            values: ['CDMX', 'GDL', 'MTY'],
            message: 'Not accepted value'
        }
    },
    spentAmount: {
        type: Number, 
        min: [10, 'the amount should be above 10']
    }
});

const clientModel = model('clients', clientSchema);

module.exports = clientModel;