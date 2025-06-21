import { Transform, TransformFnParams } from 'class-transformer';

// Custom decorator (в библиотеке class-transformer по умолчанию нету декоратора trim)
// не забываем установить transform: true в глобальном ValidationPipe
export const Trim = () => {
  return Transform(({ value }: TransformFnParams): string => {
    return typeof value === 'string' ? value.trim() : value;
  });
};
