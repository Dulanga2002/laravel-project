import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/movies', label: 'Movies' },
    { href: '/categories', label: 'Categories' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/favorites', label: 'Favorites', auth: true },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2.5 hover:opacity-80 transition-opacity">
                        <Film className="h-6 w-6" />
                        <span className="font-bold text-xl">MovieHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navItems.map((item) => {
                            if (item.auth && !isAuthenticated) return null;
                            if (item.label !== 'Dashboard' || user?.role === 'admin') {
                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }
                            return null;
                        })}
                        <div className="flex items-center space-x-4 pl-4 border-l border-border">
                            {isAuthenticated ? (
                                <Button 
                                    variant="ghost" 
                                    className="hover:bg-accent"
                                    onClick={async () => {
                                        await logout();
                                        navigate('/');
                                    }}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" className="hover:bg-accent">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="hover:opacity-90">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-accent">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <div className="flex flex-col space-y-6 mt-8">
                                    {navItems.map((item) => {
                                        if (item.auth && !isAuthenticated) return null;
                                        return (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                    <div className="flex flex-col space-y-4 pt-6 border-t">
                                        {isAuthenticated ? (
                                            <Button 
                                                variant="ghost" 
                                                className="w-full hover:bg-accent"
                                                onClick={() => {
                                                    logout();
                                                    setIsOpen(false);
                                                    navigate('/');
                                                }}
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Logout
                                            </Button>
                                        ) : (
                                            <>
                                                <Link to="/login" onClick={() => setIsOpen(false)}>
                                                    <Button variant="ghost" className="w-full hover:bg-accent">
                                                        Login
                                                    </Button>
                                                </Link>
                                                <Link to="/signup" onClick={() => setIsOpen(false)}>
                                                    <Button className="w-full hover:opacity-90">Sign Up</Button>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
