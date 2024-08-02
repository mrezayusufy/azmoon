import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useEffect } from "react";
import { useAppContext } from "./contexts/app/app-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";


const App = () => {
 
const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />
     </QueryClientProvider>
     
   
  );
};

export default App;
