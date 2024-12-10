import { getMetaDatas, getMetaDataJSON, updateMetaData } from "./functions/data.function";

const FunctionsRegistry = {
  "updateMetaData": updateMetaData,
  "getMetaData": getMetaDatas,
  "getMetaDataJSON": getMetaDataJSON
};
export default FunctionsRegistry;
