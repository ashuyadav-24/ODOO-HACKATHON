"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <Input
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <Button type="submit">
        Create Account
      </Button>

    </form>
  );
}