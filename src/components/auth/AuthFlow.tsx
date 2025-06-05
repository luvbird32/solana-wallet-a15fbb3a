
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ResetPasswordScreen from './ResetPasswordScreen';

type AuthView = 'login' | 'signup' | 'reset';

const AuthFlow = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const { state } = useAuth();

  // If user is authenticated, this component shouldn't render
  if (state.isAuthenticated) {
    return null;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'signup':
        return (
          <SignupScreen 
            onSwitchToLogin={() => setCurrentView('login')} 
          />
        );
      case 'reset':
        return (
          <ResetPasswordScreen 
            onBack={() => setCurrentView('login')} 
          />
        );
      case 'login':
      default:
        return (
          <LoginScreen 
            onSwitchToSignup={() => setCurrentView('signup')}
            onSwitchToReset={() => setCurrentView('reset')}
          />
        );
    }
  };

  return renderCurrentView();
};

export default AuthFlow;
