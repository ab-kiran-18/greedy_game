import supabase from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

// Path: /api/todos/create-todo
// Method: POST

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only handle POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract todo data from request body
  const { user_id, title, description, completed, due_date } = req.body;

  // Validate required fields
  if (!user_id || !title) {
    return res.status(400).json({
      error: 'Missing required fields',
      details: 'Both user_id and title are required'
    });
  }

  try {
    // Create new todo in database
    const { data, error } = await supabase
      .from('todos')
      .insert([{
        user_id,
        title,
        description,
        completed,
        due_date
      }])
      .select();

    if (error) {
      return res.status(400).json({
        error: 'Failed to create todo',
        details: error.message
      });
    }

    // Return success response
    return res.status(201).json({
      todo: data,
      message: 'Todo created successfully'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
