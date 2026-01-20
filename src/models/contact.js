module.exports = (mongodb) => {
  const Temple = mongodb.model(
    "temples",
    mongodb.Schema(
      {
        temple_id: Number,
        name: String,
        location: String,
        dedicated: String,
        additionalInfo: Boolean,
      },
      { timestamps: true },
    ),
  );

  return Temple;
};
