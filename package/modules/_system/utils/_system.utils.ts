import { coreConstant } from "../../../index";

export function clearValidatePhoneEmail(text: any) {
  let t = text;
  if (t[0] == "'") {
    t = t.slice(1);
    t = t.toLowerCase();
  }
  let f = String(t).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  
  if (f) {
    return { valid: f, type: coreConstant.commType.EMAIL };
  } else if (!f) {
    f = String(t).match(
      /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/
    );
    if (f) {
      return { valid: f, type: coreConstant.commType.SMS };
    } else {
      return { valid: f, type: "" };
    }
  }
  
  return [f, t];
}
  