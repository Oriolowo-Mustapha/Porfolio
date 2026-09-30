"use server";

const ENDPOINT = "https://formspree.io/f/mldpwrky";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

/**
 * Server Action proxy to Formspree.
 *
 * The previous build posted to Formspree with a bare cross-origin
 * `<form action>`, which in the App Router triggers a hard navigation away
 * from the site. Proxying keeps the user on the page and gives us a real
 * pending + error state. Honeypot rejects bots that fill every field.
 */
export async function sendMessage(
  prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("project_description") ?? "").trim();

  // Honeypot: a real user never sees this field.
  if (String(formData.get("_gotcha") ?? "") !== "") {
    return { status: "success" };
  }

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { status: "error", message: "That email address looks incomplete." };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) {
      return {
        status: "error",
        message: "Something went wrong on the way. Please email me directly.",
      };
    }

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Network error. Please email me directly.",
    };
  }
}
