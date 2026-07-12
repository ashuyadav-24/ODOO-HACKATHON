"use client";

import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function AssetForm() {
  const [formData, setFormData] = useState({
    assetName: "",
    assetCode: "",
    category: "",
    purchaseDate: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    setFormData({
      assetName: "",
      assetCode: "",
      category: "",
      purchaseDate: "",
      status: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Add New Asset
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <Input
          label="Asset Name"
          name="assetName"
          value={formData.assetName}
          placeholder="Laptop"
          onChange={handleChange}
        />

        <Input
          label="Asset Code"
          name="assetCode"
          value={formData.assetCode}
          placeholder="AST-001"
          onChange={handleChange}
        />

        <Input
          label="Category"
          name="category"
          value={formData.category}
          placeholder="Electronics"
          onChange={handleChange}
        />

        <Input
          label="Purchase Date"
          name="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={handleChange}
        />

        <Input
          label="Status"
          name="status"
          value={formData.status}
          placeholder="Available"
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <Button type="submit">
            Add Asset
          </Button>
        </div>
      </form>
    </div>
  );
}
