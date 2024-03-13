import "@/styles/globals.css";
import api from "@/lib/api";

import {
  QueryClient,
  QueryClientProvider,
  QueryOptions,
} from '@tanstack/react-query';
import type { AppProps } from "next/app";

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const { data } = await api.get(`${queryKey?.[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
