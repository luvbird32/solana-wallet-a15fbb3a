
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from './AuthLayout';

const resetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ResetFormData = z.infer<typeof resetSchema>;

interface ResetPasswordScreenProps {
  onBack: () => void;
}

const ResetPasswordScreen = ({ onBack }: ResetPasswordScreenProps) => {
  const { state, resetPassword, clearError } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormData) => {
    try {
      clearError();
      await resetPassword(data.email);
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      // Error is handled by context
    }
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive reset instructions"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Back Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mb-4 -ml-2"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </Button>

        {/* Instruction Text */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Mail className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{state.error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={state.loading}
        >
          {state.loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Reset Link...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Send Reset Link
            </>
          )}
        </Button>

        {/* Help Text */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            Remember your password?{' '}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-primary hover:text-primary/80 text-xs"
              onClick={onBack}
            >
              Sign in instead
            </Button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordScreen;
