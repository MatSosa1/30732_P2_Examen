const transactionsHistory = [];

export class TransactionRepository {
  static save(transaction) {
    transactionsHistory.push(transaction);

    return transaction;
  }

  static getAll() {
    return transactionsHistory;
  }
}