import ilustracionLogin from "@/assets/login-illustration.png";

export default function LoginIllustration() {
  return (
    <div className="flex w-full items-center justify-center">
      <img
        src={ilustracionLogin}
        alt="Ilustración de inicio de sesión"
        className="h-auto w-full max-w-5xl object-contain"
      />
    </div>
  );
}