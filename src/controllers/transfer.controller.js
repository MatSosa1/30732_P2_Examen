const Sentry = require('@sentry/node');
const { TransferService } = require('../services/transfer.service');

/**
 * Endpoint para ejecutar una transferencia bancaria (Beta).
 * POST /v1/transfer-beta/execute
 * 
 * Espera un cuerpo JSON con: { fromAccountId, toAccountId, amount }
 */
function executeTransfer(req, res) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    if (!fromAccountId || !toAccountId || amount === undefined) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
      });
    }

    if (req.body.simulateDbFailure) {
      throw new Error(
        'Conexión interrumpida con el Clúster de Datos SecurePay'
      );
    }

    const result = TransferService.executeTransfer(fromAccountId, toAccountId, Number(amount));
    return res.status(200).json(result);
  } catch (error) {
    const isOperationalFailure =
      error.message ===
      'Conexión interrumpida con el Clúster de Datos SecurePay';

    if (isOperationalFailure) {
      Sentry.captureException(error, {
        tags: {
          user_id: req.user?.sub || 'unknown',
          service: 'transfer-beta',
          error_type: 'database_failure'
        },
        extra: {
          fromAccountId: req.body.fromAccountId,
          toAccountId: req.body.toAccountId,
          amount: req.body.amount
        }
      });

      return res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
      });
    }

    return res.status(400).json({
      error: 'Error en la transacción',
      message: error.message
    });
  }
}

module.exports = {
  executeTransfer
};
