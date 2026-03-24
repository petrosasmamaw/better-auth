import RegisterForm from "./Form";

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <RegisterForm />
    </div>
  );
}
