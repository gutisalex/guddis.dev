import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">404 - Page Not Found</CardTitle>
          <CardDescription>
            The page you&apos;re looking for doesn&apos;t exist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The page you requested could not be found. It may have been moved,
            deleted, or the URL might be incorrect.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            render={<Link href="/" />}
            variant="default"
            className="flex-1"
          >
            Go home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
