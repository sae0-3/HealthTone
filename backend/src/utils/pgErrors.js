import {
  DatabaseConnectionError,
  DataLengthError,
  DivisionByZeroError,
  ForeignKeyViolationError,
  InsufficientPrivilegeError,
  InternalServerError,
  NotNullViolationError,
  SerializationError,
  ServiceUnavailableError,
  SyntaxError,
  TableNotFoundError,
  UndefinedFunctionError,
  UniqueViolationError,
} from './CustomError.js'


const pgErrors = {
  '08001': new DatabaseConnectionError(),
  '23505': new UniqueViolationError(),
  '23503': new ForeignKeyViolationError(),
  '23502': new NotNullViolationError(),
  '40001': new SerializationError(),
  '42601': new SyntaxError(),
  '42883': new UndefinedFunctionError(),
  '22001': new DataLengthError(),
  '42501': new InsufficientPrivilegeError(),
  '42P01': new TableNotFoundError(),
  '22012': new DivisionByZeroError(),
  '57P03': new ServiceUnavailableError(),
  'XX000': new InternalServerError(),
}

export default pgErrors
