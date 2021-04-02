const striptags = require("striptags");
const importFields = async (sourceItem, fieldMapping) => {
  const importedItem = {};
  //////////////////////////////////////////////////// Temporary
  // if (!importedItem["car_wash_type"]) {
  //   importedItem["car_wash_type"] = sourceItem.field_type;
  // }
  //////////////////////////////////////////////////// Temporary
  Object.keys(fieldMapping).forEach(async (sourceField) => {
    const { targetField, stripTags } = fieldMapping[sourceField];
    if (!targetField || targetField === "none") {
      return;
    }
    const originalValue = sourceItem[sourceField];
    importedItem[targetField] = stripTags
      ? striptags(originalValue)
      : originalValue;
  });
  return importedItem;
};
module.exports = importFields;
