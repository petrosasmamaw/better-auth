import RegisterForm from "./Form";

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <RegisterForm />
    </div>
  );
}
