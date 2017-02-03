import { Router } from 'express';
import certificatesManager from '../managers/certificatesManager';
import logger from '../utils/logger';
import authority from '../middleware/authority';

const router = new Router();

router.get('/', authority.userCheck, (req, res) => {
  const user = req._decoded;
  const userId = user.id;

  certificatesManager.getCertifications(userId, (err, result) => {
    if (err) {
      logger.logError('Certificates Controller - Get Certificates', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

router.post('/add', authority.adminCheck, (req, res) => {
  const { certificate, userId } = req.body;

  certificatesManager.addCertification(userId, certificate, (err, result) => {
    if (err) {
      logger.logError('Certificates Controller - Add Certificates', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

router.delete('/remove', authority.adminCheck, (req, res) => {
  const { userId, certificateId } = req.body;

  certificatesManager.removeCertification(userId, certificateId, (err, result) => {
    if (err) {
      logger.logError('Certificates Controller - Remove Certificates', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
