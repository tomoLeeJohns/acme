import { FavoritesProvider } from "@/context/FavoritesContext";
import { TabsProvider } from "@/context/TabsContext";
import { SortingProvider } from "@/context/SortingContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { Poppins, Open_Sans, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

export async function generateMetadata() {
  return {
    title: "ACME",
    description: "ACME description",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${openSans.variable} ${playfair.variable} ${poppins.variable}`}
      >
        <CategoryProvider>
          <FavoritesProvider>
            <TabsProvider>
              <SortingProvider>
                <Header />
                {children}
              </SortingProvider>
            </TabsProvider>
          </FavoritesProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}
