"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/studio", label: "AI 修图" },
  { href: "/community", label: "作品社区" },
  { href: "/spots", label: "校园取景" },
  { href: "/about", label: "关于光厘" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Link className="brand" href="/" aria-label="光厘首页" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            <span />
          </span>
          <span>
            <strong>光厘</strong>
            <small>GUANGLI</small>
          </span>
        </Link>

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="主导航">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                className={active ? "is-active" : ""}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link className="button button--small nav-cta" href="/studio" onClick={() => setOpen(false)}>
            开始修图
          </Link>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}