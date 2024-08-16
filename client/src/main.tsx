import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import App from './App.tsx'
import TEST from '@/pages/TEST'
import './index.css'

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },
  {
    path: "/test",
    element:<TEST/>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
