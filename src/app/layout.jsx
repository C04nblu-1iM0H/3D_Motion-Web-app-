import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import {Providers} from "./providers";
import { AppProvider } from '@/components/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={inter.className}>
        <Providers>
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
