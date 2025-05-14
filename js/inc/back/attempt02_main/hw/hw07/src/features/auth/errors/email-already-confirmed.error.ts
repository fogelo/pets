// src/errors/EmailAlreadyConfirmedError.ts
export class EmailAlreadyConfirmedError extends Error {
  public readonly field = "code";
  constructor(message = "Email уже был подтверждён") {
    super(message);
    this.name = "EmailAlreadyConfirmedError";
  }
}
