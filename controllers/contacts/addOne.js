const { addContact } = require("../../db");

const addOne = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const data = { name, email, phone };
  //   const { error } = contactShema.validate(data);
  //   if (error !== undefined) {
  //     return res.status(400).json({
  //       status: "error",
  //       code: 400,
  //       message: error.message,
  //     });
  //   }
  if (!data.name || !data.email || !data.phone) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing some fields",
    });
  }
  await addContact(data);
  res.json({
    status: "Contact added",
    code: 201,
    data: { result: data },
  });
};

module.exports = addOne;
