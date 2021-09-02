module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      country: { type: String, required: true },
      merchantType: { type: String, required: true },
      acceptTerms: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("User", schema);
  return User;
};
