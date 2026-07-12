import SignupForm from "../../componenets/forms/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          AssetFlow
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create your account
        </p>

        <SignupForm />
      </div>
    </main>
  );
}