"use client";

import { ReactNode, AnchorHTMLAttributes } from "react";
import { isValidUrl } from "@/app/lib/url-utils";

interface SecureExternalLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  openInNewTab?: boolean;
}

/**
 * SecureExternalLink Component
 *
 * A security-hardened external link component that automatically applies
 * security best practices for external navigation.
 *
 * Security Features:
 * - Prevents tabnabbing attacks (window.opener access)
 * - Prevents referrer leakage
 * - Validates external URLs
 * - Type-safe with TypeScript
 *
 * @param href - The URL to link to
 * @param children - Link content
 * @param className - Optional CSS classes
 * @param ariaLabel - Accessibility label
 * @param openInNewTab - Whether to open in new tab (default: true)
 */
export default function SecureExternalLink({
  href,
  children,
  className = "",
  ariaLabel,
  openInNewTab = true,
  ...props
}: SecureExternalLinkProps) {
  // If URL is invalid, render as span with warning
  if (!isValidUrl(href)) {
    console.warn(`SecureExternalLink: Invalid URL provided: ${href}`);
    return (
      <span className={className} title="Invalid URL">
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
