export class EmailAlreadyConfirmedError extends Error {
  public readonly field: string; // <- вот это объявление нужно

  constructor(field: string, message = "Email уже был подтверждён") {
    super(message);
    this.name = "EmailAlreadyConfirmedError";
    this.field = field;
  }
}
