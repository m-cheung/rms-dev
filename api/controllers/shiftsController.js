import { Router } from 'express';
import shiftsManager from '../managers/shiftsManager';
import logger from '../utils/logger';
// import authority from '../middleware/authority';

const router = new Router();

router.get('/', (req, res) => {
  const getAll = req.query.getAll || false;

  shiftsManager.getShifts(getAll, (err, result) => {
    if (err) {
      logger.logError('Shifts Controller - Get Shifts', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

router.post('/add', (req, res) => {
  const shift = req.body;

  shiftsManager.addShift(shift, (err, result) => {
    if (err) {
      logger.logError('Shifts Controller - Add Shift', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

router.delete('/delete/:shiftId', (req, res) => {
  const shiftId = req.params.shiftId;

  shiftsManager.deleteShift(shiftId, (err, result) => {
    if (err) {
      logger.logError('Shifts Controller - Delete Shift', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

router.patch('/modify/:shiftId', (req, res) => {
  const shift = req.body;
  shift.id = req.params.shiftId;

  shiftsManager.modifyShift(shift, (err, result) => {
    if (err) {
      logger.logError('Shifts Controller - Modify Shift', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

router.get('/user/:userId', (req, res) => {
  const getAll = req.query.getAll || false;
  const userId = req.params.userId;

  shiftsManager.getUserShifts(userId, getAll, (err, result) => {
    if (err) {
      logger.logError('Shifts Controller - Get User Shifts', err.error);
      res.status(err.statusCode || 500).json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
