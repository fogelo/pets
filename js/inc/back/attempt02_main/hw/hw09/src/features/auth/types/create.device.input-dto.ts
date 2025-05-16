export type CreateDeviceInputDTO = {
  ip: string;
  url: string;
  title: string;
  deviceId: string;
  lastActiveDate: Date;
  userId: string;
  iat?: number;
  exp?: number;
};
