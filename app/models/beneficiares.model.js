module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      beneficiares: [
        {
          percentage: Number,
          name: String,
          birthDate: String,
          companyPosition: String,
          functionType: String,
          actionsNumber: Number,
          country: String,
          documentType: String,
          documentFile: String,
        },
      ],
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

  const Beneficiares = mongoose.model("beneficiares", schema);
  return Beneficiares;
};
