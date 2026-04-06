import Link from "next/link";

interface BackToHomeButtonProps {
  className?: string;
  href?: string;
  label?: string;
}

export default function BackToHomeButton({
  className,
  href = "/home",
  label = "Back to Home",
}: BackToHomeButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full bg-[#f3d088] px-4 py-2 text-sm font-semibold text-[#4a3219] shadow-md transition-transform hover:-translate-y-0.5 hover:brightness-105 ${className ?? ""}`.trim()}
    >
      <span aria-hidden="true">←</span>
      {label}
    </Link>
  );
}
