import supabase from "../utils/supabase";
import NewTodo from "./NewTodo";

export default async function Home() {
  const { data: todos } = await supabase.from("todos").select("*");

  return (
    <div>
      {todos?.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
      <NewTodo />
    </div>
  );
}
