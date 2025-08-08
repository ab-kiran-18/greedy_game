import supabase from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

// Path: /api/todos/delete-todo
// Method: DELETE

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only handle DELETE requests
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract todo ID from request body
  const { id } = req.body;

  // Validate required fields
  if (!id) {
    return res.status(400).json({
      error: 'Missing required field',
      details: 'Todo ID is required'
    });
  }

  try {
    // Delete todo from database
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({
        error: 'Failed to delete todo',
        details: error.message
      });
    }

    // Return success response
    return res.status(200).json({
      message: 'Todo deleted successfully'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
