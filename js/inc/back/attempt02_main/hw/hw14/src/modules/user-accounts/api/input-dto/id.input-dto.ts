import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class IdInputDTO {
  @IsMongoId() // проверяет, что значение является валидным MongoDB ObjectId.
  id: Types.ObjectId; // стандартный тип для идентификаторов в MongoDB
}
