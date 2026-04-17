import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Navn, e-mail og besked er påkrævet." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Ugyldig e-mail-adresse." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { message: "Beskeden er for kort." },
        { status: 400 }
      );
    }

    const emailContent = `
Ny henvendelse fra dietzcc.dk

Navn: ${name}
E-mail: ${email}
Virksomhed: ${company || "Ikke angivet"}

Besked:
${message}
    `.trim();

    await resend.emails.send({
      from: "Dietz CC Hjemmeside <onboarding@resend.dev>",
      to: ["martin@dietzcc.dk"],
      subject: `Ny henvendelse fra ${name}${company ? ` (${company})` : ""}`,
      text: emailContent,
      replyTo: email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Serverfejl. Prøv igen eller skriv direkte til martin@dietzcc.dk" },
      { status: 500 }
    );
  }
}
