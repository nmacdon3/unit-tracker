"use client";

import { useState } from "react";
import supabase from "../utils/supabase";

const NewTodo = () => {
  const [title, setTitle] = useState("");
  console.log("🚀 ~ file: NewTodo.tsx:8 ~ NewTodo ~ title:", title);

  const addTodo = async (e: any) => {
    e.preventDefault();
    await supabase.from("todos").insert({ title });

    setTitle("");
  };

  return (
    <form onSubmit={addTodo}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
