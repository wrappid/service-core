import { getMetaDatas, getMetaDataJSON, updateMetaData } from "./functions/data.function";

const FunctionsRegistry = {
  "updateMetaData": updateMetaData,
  "getMeataData": getMetaDatas,
  "getMetaDataJSON": getMetaDataJSON
};
export default FunctionsRegistry;
