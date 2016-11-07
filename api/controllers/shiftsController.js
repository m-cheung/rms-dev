import { Router } from 'express';
import shiftsManager from '../managers/shiftsManager';
import logger from '../utils/logger';
// import authority from '../middleware/authority';

const router = new Router();

router.post('/addShift', (req, res) => {
  const shift = req.body;

  shiftsManager.addShift(shift, (err, result) => {
    if (err) {
      logger.logError('Shifts Controller - addShift', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

router.delete('/deleteShift/:id', (req, res) => {
  const shiftId = req.params.id;

  shiftsManager.deleteShift(shiftId, (err, result) => {
    if (err) {
      logger.logError('Shifts Controller - deleteShift', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

router.get('/getShifts', (req, res) => {
  shiftsManager.getShifts((err, result) => {
    if (err) {
      logger.logError('Shifts Controller - getShifts', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

router.patch('/modifyShift/:id', (req, res) => {
  const shift = req.body;
  shift.id = req.params.id;

  shiftsManager.modifyShift(shift, (err, result) => {
    if (err) {
      logger.logError('Shifts Controller - modifyShift', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
