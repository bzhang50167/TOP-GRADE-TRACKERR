import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SignupRequestBody {
  email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email }: SignupRequestBody = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user in the database
      const newUser = await prisma.user.create({
        data: {
          email: email
        },
      });

      // Return user data (without password for security)
      return res.status(201).json({
        message: 'User created successfully',
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
