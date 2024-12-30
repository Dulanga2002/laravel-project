import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { signUpSchema } from '@/lib/validations/auth';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';

export function SignUp() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { register, isLoading } = useAuthStore();

    const onSubmit = async (data: any) => {
        try {
            await register(data);
            toast({
                title: 'Success',
                description: 'Account created successfully',
            });
            navigate('/login');
        } catch (error) {
            let errorMessage = 'Registration failed. Please try again.';
            if (error.response?.data?.errors) {
                // Handle Laravel validation errors
                errorMessage = Object.values(error.response.data.errors).join(' ');
            } else if (error.response?.data?.message) {
                // Handle other backend errors
                errorMessage = error.response.data.message;
            }
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });
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
                    <h1 className="text-3xl font-bold">Create an account</h1>
                    <p className="text-muted-foreground">Enter your details to create your account</p>
                </div>

                <div className="border rounded-lg p-6 space-y-6">
                    <AuthForm type="signup" schema={signUpSchema} onSubmit={onSubmit} />

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link to="/login" className="text-primary hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
