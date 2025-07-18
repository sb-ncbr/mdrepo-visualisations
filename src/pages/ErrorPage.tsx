import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">404</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl mb-2">Page Not Found</p>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to={"/"}>
            <Button variant="default" size="lg">
              Go back home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
