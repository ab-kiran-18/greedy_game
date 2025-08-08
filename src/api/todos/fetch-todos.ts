import supabase from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

// Path: /api/todos/fetch-todos
// Method: GET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only handle GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract query parameters
  const { user_id } = req.query;

  // Validate required query parameter
  if (!user_id) {
    return res.status(400).json({
      error: 'Missing required parameter',
      details: 'user_id is required'
    });
  }

  try {
    // Fetch todos from database
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({
        error: 'Failed to fetch todos',
        details: error.message
      });
    }

    // Return success response
    return res.status(200).json({
      todos: data,
      message: 'Todos fetched successfully'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
