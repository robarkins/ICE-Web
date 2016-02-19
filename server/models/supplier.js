var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supplierSchema = new Schema({
	firstName: String,
	surname: String,
	address: {
		line1: String,
		line2: String,
		line3: String,
		line4: String,
		line5: String
	}
});



module.exports = mongoose.model('Supplier', UserSchema);