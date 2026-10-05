import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col justify-center px-5 py-24 sm:px-8">
      <p className="label text-signal">Error 404</p>
      <h1 className="font-display mt-5 text-[clamp(3rem,9vw,5.5rem)]">
        Page not found<span className="text-signal">.</span>
      </h1>
      <p className="mt-6 max-w-md text-ink-muted">
        That page doesn&rsquo;t exist. It may have moved, or the link may be
        mistyped.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <Button
          render={<Link href="/" />}
          className="pressable"
        >
          Back to index
        </Button>
        <Button
          render={<Link href="/projects" />}
          variant="outline"
          className="pressable"
        >
          View projects
        </Button>
      </div>
    </div>
  );
}
