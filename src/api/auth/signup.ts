import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../lib/supabase';

// Path: /api/auth/signup
// Method: POST

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, role } = req.body;

    // Create user in Supabase Auth
    const { error } = await supabase.auth.admin.createUser({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert user into the users table
    const { data, error: insertError } = await supabase
      .from('users')
      .insert([{ email, role: role || 'normal' }]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    return res.status(201).json({ user: data });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
