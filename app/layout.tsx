import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import ReCaptchaProvider from "@/provider/RecaptchaProvider";
import { Toaster } from "@/components/ui/sonner";

const workSans = Work_Sans({
  weight: "400",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "JD Genie",
  description: "Ai - powered resume report generator",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} text-teal-800`}
      >
        <ReCaptchaProvider>
          <Toaster />
          {children}
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
