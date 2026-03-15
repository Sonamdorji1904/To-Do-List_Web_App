-- Create tasks table for the to-do list application
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries on completed status
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);

-- Create index for ordering by creation date
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);

-- Enable Row Level Security (for future auth integration)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (no auth required)
-- This allows public access - update these policies when adding authentication
CREATE POLICY "Allow all access to tasks" ON tasks
  FOR ALL
  USING (true)
  WITH CHECK (true);
