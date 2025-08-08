import supabase from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

// Path: /api/users/edit-user
// Method: PUT

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only handle PUT requests for updates
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract user data and ID from request body
  const { id, email, password, role } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'User not found' });
  }

  try {
    // Update user auth details if email or password provided
    if (email || password) {
      const { error: authError } = await supabase.auth.admin.updateUserById(
        id,
        { email, password }
      );

      if (authError) {
        return res.status(400).json({
          error: 'Failed to update auth user',
          details: authError.message
        });
      }
    }

    // Update user data in users table
    const updateData: { email?: string; role?: string } = {};
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    const { data: userData, error: dbError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select();

    if (dbError) {
      return res.status(400).json({
        error: 'Failed to update user data',
        details: dbError.message
      });
    }

    // Return success response
    return res.status(200).json({
      user: userData,
      message: 'User updated successfully'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
