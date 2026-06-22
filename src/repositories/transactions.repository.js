const transactionsHistory = [];

class TransactionRepository {
  static save(transaction) {
    transactionsHistory.push(transaction);

    return transaction;
  }

  static getAll() {
    return transactionsHistory;
  }
}

module.exports = {
  TransactionRepository
};
