import AnimatedPage from "../components/AnimatedPage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-6xl md:text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-foreground mt-4 mb-2">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild className="transition-transform duration-300 ease-in-out hover:scale-105">
          <Link to="/">Go back to Homepage</Link>
        </Button>
      </div>
    </AnimatedPage>
  );
};

export default NotFound;
