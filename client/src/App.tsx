import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AssistantProvider } from "@/components/AssistantProvider";
import Chat from "@/pages/chat";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Chat} />
      <Route component={Chat} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AssistantProvider>
          <Toaster />
          <Router />
        </AssistantProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
