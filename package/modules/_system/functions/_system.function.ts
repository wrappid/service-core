import otpGenerator from "otp-generator";
import { constant } from "../../../constants/server.constant";
import { databaseActions } from "../../../database/actions.database";
import { communicate, configProvider, coreConstant } from "../../../index";
import { clearValidatePhoneEmail } from "../utils/_system.utils";





export const getSettingMetaFunc = async () => {
  try {
    const data = await databaseActions.findAll("application", "SettingMeta", {});
    console.log("SettingMeta fetched successfully");
    return { status: 200, message: "SettingMeta fetched successfully", data };
  } catch (err) {
    console.log(err);
    return {status:500,  message: "SettingMeta fetched error"};
  }
};
  
export const postTestCommunicationFunc = async (req: any, res: any) => {
  try {
    console.log(res);
    const commData: any = {};
    let userId = req?.user?.userId;
    const emailOrPhone = req.body.data;
    let commType = req.params.commType;
    if (!commType) {
      const { type }: any = clearValidatePhoneEmail(emailOrPhone);
      commType = type;
    }
    let templateID = req.body.templateID;
    if (!userId) {
      const user = await databaseActions.findOne("application", "Users", {
        where:
          commType === constant.commType.EMAIL
            ? {
              email: req.body.data,
            }
            : {
              phone: req.body.data,
            },
      });
      userId = user?.id;
      commData.id = user?.id;
    }

    const contactType =
      commType === coreConstant.commType.SMS
        ? coreConstant.contact.PHONE
        : commType;
    const personContact = await databaseActions.findOne(
      "application",
      "PersonContacts",
      {
        where: { data: emailOrPhone, type: contactType },
      }
    );
    if (personContact == null) {
      throw new Error("Email or phone not exist");
    }

    if (!templateID) {
      templateID =
        commType === coreConstant.commType.EMAIL
          ? coreConstant.communication.SENT_OTP_MAIL_EN
          : coreConstant.communication.SENT_OTP_SMS_EN;
    }

    const genetatedOTP = otpGenerator.generate(
      configProvider().wrappid.otpLength,
      {
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
      }
    );

    if (genetatedOTP) {
      commData.otp = genetatedOTP;
    }

    const commResult = await communicate({
      commType,
      commRecipients: {
        to: [emailOrPhone],
      },
      commData,
      commTemplateID: templateID,
      directFlag: true,
      errorFlag: true,
    });

    if (commResult) {
      await databaseActions.update(
        "application",
        "Otps",
        { _status: coreConstant.entityStatus.INACTIVE },
        {
          where: {
            type: commType,
            userId: userId,
          },
        }
      );
      await databaseActions.create("application", "Otps", {
        otp: genetatedOTP,
        type: commType,
        _status: coreConstant.entityStatus.ACTIVE,
        userId: userId,
      });
      console.log(`OTP ${commType} sent successfully.`);
      return { status: 200, message: `OTP ${commType} sent successfully.` };
    } else {
      throw new Error(`OTP ${commType} sent failed.`);
    }
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};