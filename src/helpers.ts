import { HttpException, HttpStatus } from '@nestjs/common';
import { version as getUuidVersion, validate as isValidUuid } from 'uuid';
import { UUID_VERSION } from './constants';

export const IDValidator = (id: string): boolean => {
  return getUuidVersion(id) === Number(UUID_VERSION) && isValidUuid(id);
};

export const invalidIdExeption = () =>
  new HttpException('INVALID ID', HttpStatus.BAD_REQUEST);

export const itemNotExistExeption = (item: string) =>
  new HttpException(`Requested ${item} is not exist`, HttpStatus.NOT_FOUND);

export const itemNotInFavoritesExeption = (item: string) =>
  new HttpException(
    `Requested ${item} is not exist in favourites or not exist at all`,
    HttpStatus.UNPROCESSABLE_ENTITY,
  );

export const passwordsNotMatch = () =>
  new HttpException(
    'Passwords not match, check OLD password',
    HttpStatus.FORBIDDEN,
  );
