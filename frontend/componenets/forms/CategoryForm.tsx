"use client";

import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function CategoryForm() {
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      category,
    });

    setCategory("");
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Add Asset Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          label="Category Name"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <Button type="submit">
          Save Category
        </Button>

      </form>
    </div>
  );
}
