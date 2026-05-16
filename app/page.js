"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  // FIX: Define the async logic inside the effect to satisfy the linter
  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await fetch("/api/items");
        if (!res.ok) {
          console.error("API error: Status", res.status);
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to load items:", err);
      }
    };

    loadItems();
  }, []); // Run only once when the page loads

  const addItem = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      
      if (res.ok) {
        const newItem = await res.json();
        setItems((prev) => [...prev, newItem]); // Instant update
        setTitle("");
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== id)); // Instant update
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto bg-white min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6">MongoDB CRUD</h1>
      <form onSubmit={addItem} className="flex gap-2 mb-10">
        <input 
          className="border p-3 flex-1 rounded text-black" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter a new task..."
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition">
          Add
        </button>
      </form>

      <ul className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500">No items found.</p>
        ) : (
          items.map((item) => (
            <li key={item._id} className="flex justify-between items-center p-4 border rounded shadow-sm bg-gray-50">
              <span className="text-lg font-medium">{item.title}</span>
              <button 
                onClick={() => deleteItem(item._id)} 
                className="text-red-500 font-bold hover:text-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}