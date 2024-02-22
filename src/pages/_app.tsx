import ProviderAuth from "@hooks/useAuth";
import RootLayout from "@layouts/layout";

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ProviderAuth>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ProviderAuth>
  );
}
