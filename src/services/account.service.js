import { UserRepository } from '../repositories/UserRepository.js';

export class AccountService {
  static getAccountBalance(accountId) {
    const account = UserRepository.getUser(accountId);

    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }

    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }
}