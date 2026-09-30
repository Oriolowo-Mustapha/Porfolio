"use client";

import { useActionState } from "react";

import { SectionHeading } from "@/components/primitives";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label as FieldLabel } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initial: ContactState = { status: "idle" };

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  { label: "WhatsApp", value: "+234 703 160 2720", href: site.whatsapp },
  { label: "GitHub", value: "@Oriolowo-Mustapha", href: site.links.github },
  { label: "LinkedIn", value: "Oriolowo Mustapha", href: site.links.linkedin },
] as const;

export function Contact() {
  const [state, action, pending] = useActionState(sendMessage, initial);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading label="Contact" numeral="04" />
        <h2
          id="contact-heading"
          className="font-display mt-8 max-w-2xl text-[clamp(2rem,5.5vw,3.5rem)]"
        >
          Let&rsquo;s build something{" "}
          <span className="italic text-signal">exceptional</span> together.
        </h2>
        <p className="mt-5 max-w-lg text-ink-muted">
          Whether it&rsquo;s a project, a stack deep-dive, or just to say hi —
          my digital door is always open.
        </p>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h3 className="label">Direct</h3>
            <dl className="mt-5 space-y-4">
              {channels.map((c) => (
                <div key={c.label}>
                  <dt className="label">{c.label}</dt>
                  <dd className="mt-1">
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        c.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="link-underline text-sm"
                    >
                      {c.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="label mt-10">
              {site.location} · Remote · {site.availability}
            </p>
          </div>

          <form action={action} className="space-y-5" noValidate>
            <p className="sr-only" aria-hidden>
              <label htmlFor="gotcha">Leave this field empty</label>
              <input
                id="gotcha"
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <FieldLabel htmlFor="project_description">
                Project details
              </FieldLabel>
              <Textarea
                id="project_description"
                name="project_description"
                required
                rows={5}
                placeholder="Briefly describe your project goals and timeline…"
              />
            </div>

            <div className="flex items-center gap-4">
              <Button
                type="submit"
                disabled={pending}
                className="pressable bg-ink text-paper hover:bg-signal"
              >
                {pending ? "Sending…" : "Send message"}
              </Button>

              <p
                role="status"
                aria-live="polite"
                className="text-sm"
              >
                {state.status === "success" ? (
                  <span className="text-signal">
                    Sent. I&rsquo;ll reply within a couple of days.
                  </span>
                ) : null}
                {state.status === "error" ? (
                  <span className="text-destructive">{state.message}</span>
                ) : null}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
