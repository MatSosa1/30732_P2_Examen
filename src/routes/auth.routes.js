const express = require('express');
const jwtService = require('../services/jwt.service');

const router = express.Router();

router.post('/token', (req, res) => {
  try {
    const { id, email } = req.body;

    if (!id || !email) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Los campos id y email son obligatorios.'
      });
    }

    const token = jwtService.signToken({
      id,
      email
    });

    return res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Error al generar el token',
      message: error.message
    });
  }
});

module.exports = router;
