import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    It might have been removed or the URL might be incorrect.
                </p>
                <Link to={'/'}>
                    <Button
                        className="mt-6 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700"
                    >

                        Go to Homepage
                    </Button>
                </Link>
            </div>
        </div>
    );
}
