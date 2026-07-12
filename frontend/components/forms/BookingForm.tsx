"use client";

import { useState } from "react";
import { createAsset } from "@/services/api";

interface AssetFormProps {
  onSuccess?: () => void;
}

export default function BookingForm({ onSuccess }: AssetFormProps) {
  const [assetName, setAssetName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("Good");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchaseCost, setPurchaseCost] = useState("");
  const [warrantyExpiry, setWarrantyExpiry] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isShared, setIsShared] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createAsset({
        asset_name: assetName,
        serial_number: serialNumber,
        category_id: category,
        department_id: department,
        location,
        condition,
        purchase_date: purchaseDate,
        purchase_cost: Number(purchaseCost),
        warranty_expiry: warrantyExpiry,
        is_shared: isShared,
        photo_url: photoUrl,
        documents: [],
      });

      alert("Asset Created Successfully");

      onSuccess?.();

      setAssetName("");
      setSerialNumber("");
      setCategory("");
      setDepartment("");
      setLocation("");
      setCondition("Good");
      setPurchaseDate("");
      setPurchaseCost("");
      setWarrantyExpiry("");
      setPhotoUrl("");
      setIsShared(false);

    } catch (err: any) {
      alert(err.message || "Failed to create asset");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Register Asset
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >
        <input
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          placeholder="Asset Name"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          required
        />

        <input
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Serial Number"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          required
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category ID"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          required
        />

        <input
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department ID"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          required
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          required
        />

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        >
          <option>Excellent</option>
          <option>Good</option>
          <option>Fair</option>
          <option>Poor</option>
        </select>

        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          required
        />

        <input
          type="number"
          value={purchaseCost}
          onChange={(e) => setPurchaseCost(e.target.value)}
          placeholder="Purchase Cost"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          required
        />

        <input
          type="date"
          value={warrantyExpiry}
          onChange={(e) => setWarrantyExpiry(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
          required
        />

        <input
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Photo URL"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isShared}
            onChange={(e) => setIsShared(e.target.checked)}
          />

          <span className="text-white">
            Shared Asset
          </span>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600"
          >
            Register Asset
          </button>
        </div>
      </form>
    </div>
  );
}