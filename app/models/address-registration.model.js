module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      streetNumber: String,
      postalCode: String,
      suburb: String,
      population: String,
      state: String,
      code: String,
      phone: String,
      segment: String,
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      progress: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const AddressRegistration = mongoose.model("address-registration", schema);
  return AddressRegistration;
};
