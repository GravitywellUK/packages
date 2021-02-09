import * as AWS from "aws-sdk";
import {
  createTransport, SendMailOptions, SentMessageInfo
} from "nodemailer";
import { jsonApiError, ERROR_CODE_ENUM } from "@gravitywelluk/json-api-error";

import { awsError } from "../utils/aws-error";

import { sesConfigure } from "./ses-configure";

/**
   * sends a templated email
   *
   * @param fileName string
   * @param body any
   * @returns promise with the output
   * @memberof AwsSESService
   */
export const sendEmailWithAttachment = (
  mailOptions: SendMailOptions,
  configOverrides: AWS.SESV2.ClientConfiguration = {}
): Promise<SentMessageInfo> => {
  return new Promise((resolve, reject) => {
    let ses;

    try {
      ses = sesConfigure(configOverrides);
    } catch (error) {
      return reject(awsError(error, {
        environment: process.env.ENVIRONMENT,
        functionName: "sendEmailWithAttachment"
      }));
    }

    try {
      // Create Nodemailer SES transporter.
      const transporter = createTransport({ SES: ses });

      // Send email
      transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
        if (error) {
          return reject(jsonApiError({
            status: 500,
            title: "ERROR transporter sending email",
            details: JSON.stringify(error),
            code: ERROR_CODE_ENUM.API_ERROR
          }));
        } else {
          return resolve(info);
        }
      });
    } catch (error) {
      return reject(jsonApiError({
        status: 500,
        title: "ERROR sending email",
        details: JSON.stringify(error),
        code: ERROR_CODE_ENUM.API_ERROR
      }));
    }
  });
};