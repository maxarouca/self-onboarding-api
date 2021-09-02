module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      description: String,
      monthlyIncome: String,
      sector: String,
      ticketMedium: String,
      typeBusiness: String,
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Identification = mongoose.model("identification", schema);
  return Identification;
};
