module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      companyRole: String,
      personalName: String,
      birthDate: String,
      code: {
        type: String,
        default: "52",
      },
      phone: String,
      nationality: String,
      country: {
        type: String,
        default: "MEX",
      },
      documentType: String,
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

  const PersonalData = mongoose.model("personal-data", schema);
  return PersonalData;
};
