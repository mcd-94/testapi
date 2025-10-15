import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import ClientLayout from "@/app/ClientLayout"; // client logic goes here
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Desactiva la auto-adición de CSS (lo controlamos manualmente)
config.autoAddCss = false;
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata ya no puede tener tipo explícito en JS, solo se exporta como objeto
export const metadata = {
  title: "Clínica Austral", // Definir nombre de la clínica
  description: "Your site description.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClientLayout>{children}</ClientLayout>

        </body>
      </html>
    </StoreProvider>
  );
}
