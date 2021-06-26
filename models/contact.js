const { model } = require("mongoose");
const { contactSchema } = require("./schemas");

// const mongoosePaginate = require("mongoose-paginate-v2");
// const contactShema = require("./schemas/contact");
// contactShema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

// const options = {
//   page: 1,
//   limit: 10,
//   collation: {
//     locale: "en",
//   },
// };
// (req) => {
//   console.log(req.query);
// };

// const Contact = (req, res) => {
//   //   console.log(req.query);
//   Contact1.paginate(req.query).then(res.docs);
//   //   console.log(res.docs);
// };

module.exports = Contact;
