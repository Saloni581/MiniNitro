import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";
import { SocketProvider } from "@/components/SocketContext.tsx";

createRoot(document.getElementById('root')!).render(
    <SocketProvider>
      <BrowserRouter>
          <App />
          <Toaster />
      </BrowserRouter>
    </SocketProvider>
)
