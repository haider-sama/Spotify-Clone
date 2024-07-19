import { Roboto } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: 'Spotify - Web Player: Music for everyone',
    template: '%s - Spotify'
  },
  description: {
    default: 'Spotify is a digital music service that gives you access to millions of songs.',
    template: '%s - Spotify'
  },
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'Spotify', 'Music Player'],
  authors: [
    { name: 'Haider', url: 'https://github.com/haider-sama' }
  ]
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();
  
  return (
    <html lang="en">
    <body className={`${roboto.className}`}>
      <ToasterProvider />
      <SupabaseProvider>
        <UserProvider>
          <ModalProvider products={products} />
          <SideBar songs={userSongs}>
            {children}
          </SideBar>
          <Player />
        </UserProvider>
      </SupabaseProvider>
    </body>
    </html>
  );
}
