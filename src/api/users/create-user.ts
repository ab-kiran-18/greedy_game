import supabase from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

// Path: /api/users/create-user
// Method: POST

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only handle POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract user data from request body
  const { email, password, role } = req.body;

  try {
    // Create new user in Supabase Auth
    const { error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({
        error: 'Failed to create auth user',
        details: authError.message
      });
    }

    // Store additional user data in users table
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .insert([{
        email,
        password, // Note: Consider if storing password hash is needed
        role
      }])
      .select();

    if (dbError) {
      return res.status(400).json({
        error: 'Failed to store user data',
        details: dbError.message
      });
    }

    // Return success response
    return res.status(201).json({
      user: userData,
      message: 'User created successfully'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
