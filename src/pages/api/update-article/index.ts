import { getCurrentUser } from '@/lib/actions/server';
import { strapiClient } from '@/lib/strapi/strapi';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    console.log('Unsupported method');
    res.status(405).json({ message: 'Method not supported' });
  }
  try {
    const user = getCurrentUser(req);
    if (!user) {
      throw Error("User is not authenticated");
    }
    const { blogContent, articleId } = req.body;
    await strapiClient.put(`/articles/${articleId}`, { data: { blogContent } });
    return res.status(200).json({ message: 'Successfully saved the article content.' });
  } catch (err: any) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again some time later.',
    });
  }
};

export default handler;
