// ⚠ In-memory store — resets on every server restart
let todos = [
  { id: 1, text: 'Learn Next.js', done: false },
  { id: 2, text: 'Build something cool', done: false }
];

export async function GET() {
  return Response.json(todos);
}

export async function POST(request) {
  const { text } = await request.json();
  const newTodo = {
    id: Date.now(),
    text,
    done: false,
  };
  todos.push(newTodo);
  return Response.json(newTodo, { status: 201 });
}

export async function PUT(request) {
  const { id, text, done } = await request.json();
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return Response.json({ error: 'Todo not found' }, { status: 404 });
  }
  todos[index] = { id, text, done };
  return Response.json(todos[index]);
}

export async function DELETE(request) {
  const { id } = await request.json();
  todos = todos.filter(todo => todo.id !== id);
  return Response.json({ success: true });
}