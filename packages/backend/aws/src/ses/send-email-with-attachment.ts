import * as AWS from "aws-sdk";
import {
  createTransport,
  SendMailOptions,
  SentMessageInfo
} from "nodemailer";

import { sesConfigure } from "./ses-configure";
import { AwsError } from "../utils/aws-error";

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
  configOverrides: AWS.SES.ClientConfiguration = {}
): Promise<SentMessageInfo> => {
  return new Promise((resolve, reject) => {
    let ses;

    try {
      ses = sesConfigure(configOverrides);
    } catch (error) {
      return reject(new AwsError(error as AWS.AWSError));
    }

    try {
      // Create Nodemailer SES transporter.
      const transporter = createTransport({ SES: ses });

      // Send email
      transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
        if (error) {
          return reject(new Error("Error transporter sending email"));
        } else {
          return resolve(info);
        }
      });
    } catch (error) {
      return reject(error);
    }
  });
};
