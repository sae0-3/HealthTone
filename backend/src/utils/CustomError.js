class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
  }
}



class DatabaseConnectionError extends CustomError {
  constructor(message = 'Error de conexión a la base de datos.') {
    super(message, 500)
  }
}

class ConnectionError extends CustomError {
  constructor(message = 'Error de conexión a la base de datos') {
    super(message, 500)
  }
}

class UniqueViolationError extends CustomError {
  constructor(message = 'Violación de unicidad: el recurso ya existe') {
    super(message, 409)
  }
}

class ForeignKeyViolationError extends CustomError {
  constructor(message = 'Violación de clave foránea: el recurso relacionado no existe') {
    super(message, 400)
  }
}

class NotNullViolationError extends CustomError {
  constructor(message = 'Violación de NOT NULL: algunos campos obligatorios están vacíos') {
    super(message, 400)
  }
}

class SerializationError extends CustomError {
  constructor(message = 'Error de serialización: conflicto en la transacción') {
    super(message, 409)
  }
}

class SyntaxError extends CustomError {
  constructor(message = 'Error de sintaxis en la consulta SQL') {
    super(message, 400)
  }
}

class UndefinedFunctionError extends CustomError {
  constructor(message = 'Función no definida en la base de datos') {
    super(message, 400)
  }
}

class DataLengthError extends CustomError {
  constructor(message = 'Error de longitud de datos: un campo supera el tamaño permitido') {
    super(message, 400)
  }
}

class InsufficientPrivilegeError extends CustomError {
  constructor(message = 'Privilegios insuficientes para realizar esta operación') {
    super(message, 403)
  }
}

class TableNotFoundError extends CustomError {
  constructor(message = 'La tabla solicitada no existe') {
    super(message, 404)
  }
}

class DivisionByZeroError extends CustomError {
  constructor(message = 'División por cero en la consulta') {
    super(message, 400)
  }
}

class ServiceUnavailableError extends CustomError {
  constructor(message = 'La base de datos no acepta conexiones en este momento') {
    super(message, 503)
  }
}

class InternalServerError extends CustomError {
  constructor(message = 'Error interno en el servidor.') {
    super(message, 500)
  }
}



class AccessDeniedError extends CustomError {
  constructor(message = 'Acceso denegado.') {
    super(message, 403)
  }
}

class ValidationPageError extends CustomError {
  constructor(message = 'El número de página o la cantidad de páginas no es válido.') {
    super(message, 400)
  }
}

class AudiobookNotFoundError extends CustomError {
  constructor(message = 'Audiolibro no encontrado.') {
    super(message, 404)
  }
}

class InvalidAudiobookIDError extends CustomError {
  constructor(message = 'ID de audiolibro inválido.') {
    super(message, 400)
  }
}

class MissingCredentialsError extends CustomError {
  constructor() {
    super('Faltan campos obligatorios.', 400)
  }
}

class UserNotFoundError extends CustomError {
  constructor() {
    super('Usuario no encontrado.', 404)
  }
}

class InvalidCredentialsError extends CustomError {
  constructor(message = 'Credenciales incorrectas.') {
    super(message, 401)
  }
}

class EmailExistsError extends CustomError {
  constructor(message = 'El correo electrónico ya esta registrado.') {
    super(message, 409)
  }
}

class InvalidPasswordError extends CustomError {
  constructor(message = 'La contraseña debe contener almenos ocho caracteres, una letra minuscula, mayuscula, número y caracter especial.') {
    super(message, 400)
  }
}

class UserNameExistsError extends CustomError {
  constructor(message = 'El nombre de usuario que elegiste ya está en uso.') {
    super(message, 402)
  }
}



export {
  AccessDeniedError,
  AudiobookNotFoundError,
  ConnectionError,
  CustomError,
  DataLengthError,
  DatabaseConnectionError,
  DivisionByZeroError,
  EmailExistsError,
  ForeignKeyViolationError,
  InsufficientPrivilegeError,
  InternalServerError,
  InvalidAudiobookIDError,
  InvalidCredentialsError,
  InvalidPasswordError,
  MissingCredentialsError,
  NotNullViolationError,
  SerializationError,
  ServiceUnavailableError,
  SyntaxError,
  TableNotFoundError,
  UndefinedFunctionError,
  UniqueViolationError,
  UserNotFoundError,
  ValidationPageError,
  UserNameExistsError
}
