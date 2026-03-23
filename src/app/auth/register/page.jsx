import RegisterForm from "./Form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  async function signUpAction(formData) {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const res = await auth.api.signUpEmail({ body: { name, email, password } });
    if (!res || res.error) {
      throw new Error(res?.error?.message || "Registration failed");
    }
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <RegisterForm action={signUpAction} />
    </div>
  );
}
