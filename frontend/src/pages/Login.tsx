import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthForm } from '@/components/auth/AuthForm';
import { loginSchema } from '@/lib/validations/auth';
import { useAuthStore } from '@/stores/authStore';

export function Login() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const onSubmit = async (data: any) => {
        try {
            await login(data);
            toast.success('Logged in successfully');
            navigate('/');
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-6"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground">Enter your credentials to access your account</p>
                </div>

                <div className="border rounded-lg p-6 space-y-6">
                    <AuthForm type="login" schema={loginSchema} onSubmit={onSubmit} />

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Link to="/signup" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
