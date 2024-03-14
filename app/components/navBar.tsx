"use client";

import { cx } from "@/lib/cx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  return (
    <header
      aria-label="site-header"
      className={cx(
        "flex h-[var(--top-navbar-height)] items-center border-b-2 border-x-gray-200 px-3 lg:px-12 ",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
          <h2 className="text-xl text-primary">Resume Builder</h2>
        </Link>
        <nav
          aria-label="navigation"
          className="flex items-center gap-2 text-sm font-medium"
        >
          {[
            ["/resume-builder", "Builder"],
            ["/resume-parser", "Parser"],
          ].map(([href, label]) => (
            <Link
              key={label}
              href={href}
              className="rounded px-2 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
