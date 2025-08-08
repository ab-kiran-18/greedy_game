import supabase from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

// Path: /api/todos/edit-todo
// Method: PUT

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only handle PUT requests for updates
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract todo data and ID from request body
  const { id, user_id, title, description, completed, due_date } = req.body;

  // Validate required fields
  if (!id) {
    return res.status(400).json({
      error: 'Missing required field',
      details: 'Todo ID is required'
    });
  }

  try {
    // Update todo data
    const updateData: { user_id?: string; title?: string; description?: string; completed?: boolean; due_date?: string } = {};
    if (user_id) updateData.user_id = user_id;
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (due_date !== undefined) updateData.due_date = due_date;
    // Update todo in database
    const { data, error } = await supabase
      .from('todos')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({
        error: 'Failed to update todo',
        details: error.message
      });
    }

    // Return success response
    return res.status(200).json({
      todo: data,
      message: 'Todo updated successfully'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
