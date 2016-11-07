import { Router } from 'express';
import usersManager from '../managers/usersManager';
import authority from '../middleware/authority';

const router = new Router();

router.get('/:id', authority.userCheck, (req, res, next) => {
  const token = req._decoded;
  const userId = req.params.id;

  if (token.id !== parseInt(userId, 10)) {
    res.sendStatus(403);
  } else {
    usersManager.getUser(token.username, (err, result) => {
      if (err) {
        res.status(err.statusCode || 500);
        res.json({ message: err.message });
      } else {
        res.json(result);
        next();
      }
    });
  }
});

module.exports = router;
