const roleModel = require("../models/role.model");

exports.addRole = async (req, res) => {
  try {
    //extract values from req body
    //& create role
    //find whether the role already exists or not
    const { name, permissions } = req.body;
    const role = await roleModel.findOne({name});
    if (role)
      return res
        .status(400)
        .send({ status: false, message: "Role with this name already exists" });

    const created = await roleModel.create({ name, permissions });

    return res
      .status(201)
      .send({
        status: true,
        message: "successfully created role",
        data: created,
      });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await roleModel.find();
    return res.status(200).send({ status: true, data: roles });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.updateRole = async (req, res) => {
  try {
    //findOne by the name & update the permissions key in the role
    const {id}=req.params 
    const {  permissions } = req.body;
    const role = await roleModel.findOneAndUpdate(
      { _id:id },
      { permissions },
      { new: true }
    );
    res
      .status(200)
      .send({ status: true, message: "successfully updated", data: role });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleModel.deleteOne(
      { _id:id }
    );
    res
      .status(200)
      .send({ status: true, message: "successfully deleted", data: role });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
