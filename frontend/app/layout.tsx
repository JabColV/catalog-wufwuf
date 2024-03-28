import "@css/globals.css";

export const metadata = {
  title: "WufWuf",
  description: "WHERE U FIND A WONDERFUL FRIEND",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="es">
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
