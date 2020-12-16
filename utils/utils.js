const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_MESSAGE = 'Необходима авторизация';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const LOGIN_FAIL_MESSAGE = 'Неправильные почта или пароль';
const REPEATED_EMAIL_ERROR_MESSAGE = 'Такой email уже существует';
const INVALID_ID = 'Невалидный id';
const FORBIDDEN_MESSAGE = 'Вы не владелец карточки и не можете её удалить';
const CAST_ERROR = 'CastError';
const VALIDATION_ERROR = 'ValidationError';
const INCORRECT_ID_MESSAGE = (value) => `Нет ${value} с таким id`;
const REQUIRED_MESSAGE = (value) => `Поле ${value} должно быть заполнено`;
const VALIDATION_MESSAGE = (value, type) => `Поле ${value} должно быть валидным ${type}-адресом`;
const EMPTY_FIELD_MESSAGE = (value) => `Поле ${value} не должно быть пустым`;
const INCORRECT_LENGTH_MESSAGE = (length, value, number) => `${length} длина поля ${value} в символах - ${number}`;

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_MESSAGE,
  SERVER_ERROR_MESSAGE,
  LOGIN_FAIL_MESSAGE,
  REPEATED_EMAIL_ERROR_MESSAGE,
  INVALID_ID,
  FORBIDDEN_MESSAGE,
  CAST_ERROR,
  VALIDATION_ERROR,
  INCORRECT_ID_MESSAGE,
  REQUIRED_MESSAGE,
  VALIDATION_MESSAGE,
  EMPTY_FIELD_MESSAGE,
  INCORRECT_LENGTH_MESSAGE,
};
