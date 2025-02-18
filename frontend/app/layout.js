import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'BLT Bot - Metal 3D Printer Assistant',
  description: 'Learn anything about BLT metal 3D printers with our intelligent assistant.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-secondary">{children}</body>
    </html>
  );
}
