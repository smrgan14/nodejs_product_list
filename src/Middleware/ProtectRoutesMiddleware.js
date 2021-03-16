import jwt from 'jsonwebtoken';
import config from '../config';

class ProtextRoutesMiddleware {
    async protectMiddleware(req, res, next) {
        try {
            let token = req.headers.authorization;

            if (token) {
                jwt.verify(token, config.jwt.secretKey, (err, decoded) =>{      
                  if (err) {
                    return res.json({ message: 'Invalid Token' });    
                  } else {
                    req.decoded = decoded;
                    next();
                  }
                });
          
              } else {
                res.send({ 
                  message: 'No provided token' 
                });
              }
        } catch (error) {
            return error;
        }
    }
}

export default new ProtextRoutesMiddleware();
