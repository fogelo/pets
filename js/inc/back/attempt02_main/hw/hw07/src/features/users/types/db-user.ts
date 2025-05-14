import { ObjectId } from "mongodb";

export type DbUser = {
  _id: ObjectId;
  accountData: {
    login: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
  };
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: boolean;
  };
};