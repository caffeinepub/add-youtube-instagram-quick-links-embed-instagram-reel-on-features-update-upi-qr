import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import SiteLayout from "./components/site/SiteLayout";
import ContactPage from "./pages/ContactPage";
import DemoPage from "./pages/DemoPage";
import FeaturesPage from "./pages/FeaturesPage";
import FreeToolsPage from "./pages/FreeToolsPage";
import HomePage from "./pages/HomePage";
import MonthlyPricingPage from "./pages/MonthlyPricingPage";
import PricingPage from "./pages/PricingPage";
import SecurePaymentPage from "./pages/SecurePaymentPage";

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/features",
  component: FeaturesPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: PricingPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/demo",
  component: DemoPage,
});

const monthlyPricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/monthly-pricing",
  component: MonthlyPricingPage,
});

const payRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pay/$tier",
  component: SecurePaymentPage,
});

const toolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools",
  component: FreeToolsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  featuresRoute,
  pricingRoute,
  contactRoute,
  demoRoute,
  monthlyPricingRoute,
  payRoute,
  toolsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
