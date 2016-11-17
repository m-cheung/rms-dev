import { Router } from 'express';
import usersManager from '../managers/usersManager';
import authority from '../middleware/authority';

const router = new Router();

router.get('/', authority.userCheck, (req, res) => {
  const token = req._decoded;

  usersManager.getUser(token.username, (err, result) => {
    if (err) {
      res.status(err.statusCode || 500);
      res.json({ message: err.message });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
