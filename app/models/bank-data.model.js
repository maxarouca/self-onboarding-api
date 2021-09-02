module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      accounts: [
        {
          country: String,
          bankName: String,
          currency: String,
          iban: String,
          swift: String,
          nombreTitula: String,
          countryTitula: String,
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

  const BankData = mongoose.model("bank-data", schema);
  return BankData;
};
