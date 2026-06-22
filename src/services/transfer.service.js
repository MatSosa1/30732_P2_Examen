const { UserRepository } = require('../repositories/users.repository');
const { TransactionRepository } = require('../repositories/transactions.repository');
const { EmailService } = require('./notification.service');

class TransferService {
  static executeTransfer(fromAccountId, toAccountId, amount) {
    const sender = UserRepository.getUser(fromAccountId);
    const receiver = UserRepository.getUser(toAccountId);

    if (!sender) {
      throw new Error('La cuenta origen no existe.');
    }

    if (!receiver) {
      throw new Error('La cuenta destino no existe.');
    }

    if (amount <= 0) {
      throw new Error('El monto debe ser mayor a cero.');
    }

    if (sender.balance < amount) {
      throw new Error('Saldo insuficiente.');
    }

    sender.balance -= amount;
    receiver.balance += amount;

    const transaction = {
      transactionId: `TX-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)
        .toUpperCase()}`,
      from: fromAccountId,
      to: toAccountId,
      amount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };

    TransactionRepository.save(transaction);

    EmailService.sendDebitEmail(sender, amount);
    EmailService.sendCreditEmail(receiver, amount, fromAccountId);

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction,
      balanceRestante: sender.balance
    };
  }
}

module.exports = {
  TransferService
};
