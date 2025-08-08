import supabase from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

// Path: /api/auth/login
// Method: POST

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ user: data.user, session: data.session });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
