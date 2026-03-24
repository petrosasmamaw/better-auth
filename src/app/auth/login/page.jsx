import LoginForm from "./Form";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/9f/86/f1/9f86f195892b6f3b797f8a7ad13ffff6.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <LoginForm />
    </div>
  );
}
