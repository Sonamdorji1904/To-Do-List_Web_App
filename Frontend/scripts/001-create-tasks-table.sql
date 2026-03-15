-- Create tasks table for the to-do list application
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries on completed status
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);

-- Create index for ordering by creation date
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);
