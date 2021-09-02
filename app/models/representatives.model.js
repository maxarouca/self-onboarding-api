module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      birthDate: String,
      nationality: String,
      country: String,
      customerNumber: String,
      rfc: String,
      percentage: Number,
      companyPosition: String,
      functionType: String,
      actionsNumber: Number,
      files: [
        {
          documentType: String,
          documentFile: String,
        },
      ],
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

  const Representatives = mongoose.model("representatives", schema);
  return Representatives;
};
