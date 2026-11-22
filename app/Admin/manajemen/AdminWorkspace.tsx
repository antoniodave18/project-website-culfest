'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { KeyboardEvent, ReactNode } from 'react';
import AdminLogoutButton from '../AdminLogoutButton';
import { adminNavigation, adminRoutes } from './navigation';

function Navigation({ pathname }: { pathname: string }) {
  return (
    <nav className="admin-nav" aria-label="Navigasi administrasi">
      {adminNavigation.map(group => (
        <div key={group.label} className="admin-nav-group">
          <p>{group.label}</p>
          <ul aria-label={group.label}>
            {group.items.map(item => (
              <li key={item.label}>
                {item.href ? (
                  <Link href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                    {item.label}
                  </Link>
                ) : (
                  <span className="admin-nav-planned">
                    {item.label}<small>Rencana</small>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function closeDisclosure(event: KeyboardEvent<HTMLDetailsElement>) {
  if (event.key !== 'Escape' || !event.currentTarget.open) return;
  event.preventDefault();
  event.currentTarget.open = false;
  event.currentTarget.querySelector('summary')?.focus();
}

export default function AdminWorkspace({
  administrator, children,
}: { administrator: string; children: ReactNode }) {
  const pathname = usePathname();
  const page = Object.values(adminRoutes).find(route => route.href === pathname);

  return (
    <div className="admin-workspace" lang="id">
      <a className="admin-skip" href="#admin-content">Lompat ke konten</a>
      <aside className="admin-sidebar">
        <Link href={adminRoutes.dashboard.href} className="admin-brand">
          <Image src="/images/logo-culfest.png" width={38} height={38} alt="" />
          <span>CulFest<small>Administrasi</small></span>
        </Link>
        <Navigation pathname={pathname} />
      </aside>

      <div className="admin-column">
        <header className="admin-topbar">
          <details key={pathname} className="admin-mobile-nav" onKeyDown={closeDisclosure}>
            <summary>
              <Image src="/images/logo-culfest.png" width={24} height={24} alt="" />
              Menu
            </summary>
            <Navigation pathname={pathname} />
          </details>
          <nav aria-label="Jejak navigasi" className="admin-breadcrumb">
            {pathname === adminRoutes.dashboard.href ? (
              <span aria-current="page">Dasbor</span>
            ) : (
              <>
                <Link href={adminRoutes.dashboard.href}>Dasbor</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{page?.label ?? 'Administrasi'}</span>
              </>
            )}
          </nav>
          <details className="admin-account" onKeyDown={closeDisclosure}>
            <summary>
              <span className="admin-avatar" aria-hidden="true">{administrator.charAt(0).toLocaleUpperCase('id')}</span>
              <span className="admin-account-name">{administrator}</span>
            </summary>
            <div className="admin-account-panel">
              <p>{administrator}</p>
              <small>Administrator platform</small>
              <AdminLogoutButton />
            </div>
          </details>
        </header>
        <div className="admin-content" id="admin-content" tabIndex={-1}>{children}</div>
      </div>
    </div>
  );
}
