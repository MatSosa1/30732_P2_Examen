export class EmailService {
  static sendDebitEmail(user, amount) {
    console.log('\n--- EMAIL DE DÉBITO ---');
    console.log(`Para: ${user.email}`);
    console.log(`Monto debitado: $${amount}`);
    console.log(`Saldo actual: $${user.balance}`);
  }

  static sendCreditEmail(user, amount, senderAccount) {
    console.log('\n--- EMAIL DE CRÉDITO ---');
    console.log(`Para: ${user.email}`);
    console.log(`Transferencia recibida: $${amount}`);
    console.log(`Cuenta origen: ${senderAccount}`);
    console.log(`Saldo actual: $${user.balance}`);
  }
}
