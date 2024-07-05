const { v4: uuidv4 } = require("uuid");

exports.generateDigitUUID = () => {
  const uuid = uuidv4();
  const truncatedUuid = uuid.replace(/-/g, "").slice(0, 10);

  // Insert dashes at specific positions in the truncated UUID
  const formattedUuid =
    truncatedUuid.slice(0, 3) +
    "-" +
    truncatedUuid.slice(3, 6) +
    "-" +
    truncatedUuid.slice(6, 10);

  return formattedUuid;
};
