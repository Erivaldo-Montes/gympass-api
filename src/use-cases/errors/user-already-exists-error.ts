export class UserAlreadyExistsError extends Error {
  constructor() {
    // chama o contructor da class extendida
    super('user already exists ')
  }
}
