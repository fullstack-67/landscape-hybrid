import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "@picocss/pico";
import "@picocss/pico/css/pico.colors.min.css";

const prompt = Prompt({
  weight: ["400", "700"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "Todo",
  description: "My Todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={prompt.className}>{children}</body>
    </html>
  );
}
