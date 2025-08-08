import supabase from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

// Path: /api/auth/logout
// Method: POST

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Successfully logged out' });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
