import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import SecondPage from "@/pages/second-page";
import ThirdPage from "@/pages/third-page";
import FourthPage from "@/pages/fourth-page";
import FifthPage from "@/pages/fifth-page";
import SixthPage from "@/pages/sixth-page";
import SeventhPage from "@/pages/seventh-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SixthPage} />
      <Route path="/landing" component={Landing} />
      <Route path="/second-page" component={SecondPage} />
      <Route path="/third-page" component={ThirdPage} />
      <Route path="/fourth-page" component={FourthPage} />
      <Route path="/fifth-page" component={FifthPage} />
      <Route path="/sixth-page" component={SixthPage} />
      <Route path="/seventh-page" component={SeventhPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
