import { coreConstant } from "../../../index";

/**
 * This function helps to validate Phone or Email
 * 
 * @param identifier : Phone or Email
 * @returns valid { valid: boolean, type: string } | [boolean, string]
 */
export function clearValidatePhoneEmail(identifier: string) {
  if (identifier[0] == "'") {
    identifier = identifier.slice(1);
    identifier = identifier.toLowerCase();
  }

  // match if email
  let matchedArray: string[] = String(identifier).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  
  if (matchedArray && matchedArray.length === identifier.length) {
    return { valid: true, type: coreConstant.commType.EMAIL };
  } else {
    // match phone number
    matchedArray = String(identifier).match(
      /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/
    );

    if (matchedArray && matchedArray.length === identifier.length) {
      return { valid: true, type: coreConstant.commType.SMS };
    } else {
      return { valid: false, type: "" };
    }
  }
}
  