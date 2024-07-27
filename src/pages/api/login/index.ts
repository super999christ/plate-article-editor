import { apiClient } from '@/lib/api/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { encryptString } from '@/lib/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Unsupported method');
    res.status(405).json({ message: 'Method not supported' });
  }
  try {
    const { email, password } = req.body;
    const { data: response } = await apiClient.post("/api/login", { email, password });
    const { data: { user } } = response;
    if (user.role === 'admin') {
      const sessionData = { user };
      const cookie = serialize('session', encryptString(JSON.stringify(sessionData)), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
      });
      res.setHeader('Set-Cookie', cookie);
      return res.status(200).json({ message: 'Signed in successfully' });
    }
    return res.status(401).json({
      message: 'Unauthorized access. You should login as administrator.'
    });
  } catch (err: any) {
    console.log("@Error during login: ", err);
    return res.status(500).json({
      message: 'Something went wrong. Please try again some time later.',
    });
  }
};

export default handler;
