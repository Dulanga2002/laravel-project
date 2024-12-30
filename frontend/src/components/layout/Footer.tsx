import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} MovieHub. All rights reserved.
                    </p>
                    <nav className="flex items-center gap-6">
                        <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                            About
                        </Link>
                        <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                            Privacy
                        </Link>
                        <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                            Terms
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
