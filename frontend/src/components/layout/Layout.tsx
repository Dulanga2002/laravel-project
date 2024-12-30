import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 min-h-[calc(100vh-4rem)]"
            >
                {children}
            </motion.main>
            <Footer />
        </div>
    );
}
