module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      companyType: String,
      businessName: String,
      companyName: String,
      cif: String,
      web: String,
      file: String,
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

  const CompanyData = mongoose.model("company-data", schema);
  return CompanyData;
};
