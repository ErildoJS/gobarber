// exception handler
class AppError {
  public readonly message: string; // public - acesso de fora da classe

  public readonly statusCode: number; // readyOnly = nao posso setar um erro directamente

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
export default AppError;
