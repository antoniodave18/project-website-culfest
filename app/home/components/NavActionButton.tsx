import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

interface NavActionButtonProps {
  href?: LinkProps["href"];
  className?: string;
  label: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function NavActionButton({
  href = "#",
  className,
  label,
  icon,
  iconPosition = "right",
}: NavActionButtonProps) {
  const baseClassName =
    "inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#ab3400] to-[#451500] px-6 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:brightness-105";

  return (
    <Link href={href} className={`${baseClassName} ${className ?? ""}`.trim()}>
      {iconPosition === "left" && icon ? <span aria-hidden="true">{icon}</span> : null}
      {label}
      {iconPosition === "right" && icon ? <span aria-hidden="true">{icon}</span> : null}
    </Link>
  );
}