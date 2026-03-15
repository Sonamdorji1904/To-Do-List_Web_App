import { createClient } from "@/Backend/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET all tasks
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    // Optional query parameters for filtering
    const completed = searchParams.get("completed");
    
    let query = supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    
    // Filter by completion status if provided
    if (completed !== null) {
      query = query.eq("completed", completed === "true");
    }
    
    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST create a new task
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const { title, description, due_date } = body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title: title.trim(),
        description: description?.trim() || null,
        due_date: due_date || null,
        completed: false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
