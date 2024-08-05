import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  [key: string]: any;
  // Define the shape of the decoded token if known
}

const authenticate = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      (req as any).user = decoded;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

export default authenticate;
