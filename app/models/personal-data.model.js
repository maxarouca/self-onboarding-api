module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      companyRole: String,
      personalName: String,
      birthDate: String,
      code: String,
      phone: String,
      nationality: String,
      country: String,
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

  const PersonalData = mongoose.model("personal-data", schema);
  return PersonalData;
};
