// app/layout.tsx
import WalletContextProvider from '@/components/WalletContextProvider';

export const metadata = {
  title: 'Solana Wallet Authentication',
  description: 'Multi-wallet login',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  );
}
