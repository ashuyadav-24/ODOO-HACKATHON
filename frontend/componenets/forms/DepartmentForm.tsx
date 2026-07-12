"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function DepartmentForm() {
  const [department, setDepartment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      department,
    });

    setDepartment("");
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Add Department
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          label="Department Name"
          placeholder="Enter department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <Button type="submit">
          Save Department
        </Button>

      </form>
    </div>
  );
}