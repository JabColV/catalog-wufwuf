"use client";
import "@css/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

// export const metadata = {
//   title: "WufWuf",
//   description: "WHERE U FIND A WONDERFUL FRIEND",
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="es">
        <body>
          <div id="modal"></div>
          <main className="app">{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  );
};

export default RootLayout;
