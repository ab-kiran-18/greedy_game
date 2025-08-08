import supabase from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

// Path: /api/auth/session
// Method: GET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      return res.status(200).json({ user: session.user, session });
    } else {
      return res.status(200).json({ user: null, session: null });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
