import otpGenerator from "otp-generator";


import { communicate } from "../../../communication/communicate.communicator";
import { constant } from "../../../constants/server.constant";
import { ApplicationContext } from "../../../context/application.context";
import { databaseActions } from "../../../database/actions.database";
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
      commType === constant.commType.SMS
        ? constant.contact.PHONE
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
        commType === constant.commType.EMAIL
          ? constant.communication.SENT_OTP_MAIL_EN
          : constant.communication.SENT_OTP_SMS_EN;
    }

    const { wrappid } = ApplicationContext.getContext(constant.CONFIG_KEY);
    const genetatedOTP = otpGenerator.generate(
      wrappid.otpLength,
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
        { _status: constant.entityStatus.INACTIVE },
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
        _status: constant.entityStatus.ACTIVE,
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


/**
 * This function helps us to process master data
 * 
 * @param data : master data
 * @param level : master data level
 * @param model : master data model
 * @param status : master data status
 * 
 * @returns processedData
 */
async function masterDataProcessing(data:any, level:any, model:any, status:any) {
  if (level === 0 || data.length === 0) {
    return [];
  }

  const currentLevelData = data;

  const finalData:any = [];
  for (let i = 0; i < currentLevelData.length; i++) {
    const whereOb:any = {
      parentId: currentLevelData[i].id,
    };
    if (status) {
      whereOb["_status"] = status;
    }

    const nextLevelData = await databaseActions.findAll("application", model, {
      where: whereOb,
      order: [["order", "asc"]],
    });

    currentLevelData[i].dataValues["Children"] = await masterDataProcessing(
      nextLevelData,
      level - 1,
      model, status
    );

    finalData.push(currentLevelData[i]);
  }

  return finalData;
}

export const getMasterDataFunc = async (req:any) => {
  try {
    const level = req.query.level || 10;
    const whereOb:any = {
      name: req.query.name,
    };
    if (req.query._status) {
      whereOb["_status"] = req.query._status;
    }
    if (req.query.parentId) {
      whereOb["parentId"] = req.query.parentId;
    }
    let data = await databaseActions.findAll("application", "MasterData", {
      where: whereOb,
    });
    if (data.length == 1) {
      console.log("master data fetched successfully", data.length);
      if (level > 0) {
        data = await masterDataProcessing(
          data,
          level,
          "MasterData",
          whereOb._status
        );
      }
      return {
        status: 200,
        message: "Master data fetched successfully",
        data: data,
      };
    } else {
      return { status: 500, message: "master data not found", data: data };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
