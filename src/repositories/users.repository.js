const usersDb = [
  { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
  { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
];

export class UserRepository {
  static getUser(accountId) {
    return usersDb.find(u => u.accountAlpha === fromAccountId);
  }

  static getAccountBalance(accountId) {
    const account = this.getUser(accountId);

    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }

    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }

  static updateBalance(accountId, newBalance) {
    const user = this.getUser(accountId);

    if (user) {
      user.balance = newBalance;
    }

    return user;
  }
}
