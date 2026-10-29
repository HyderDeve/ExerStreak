import AppButton from '@/components/AppButton';
import AuthShell from '@/components/AuthShell';
import FormField from '@/components/FormField';
import { goTo } from '@/lib/auth';
import { posthog } from '@/lib/posthog';
import { EMAIL_REGEX } from '@/lib/utils';
import { useSignIn } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const SignIn = () => {
  const { signIn, fetchStatus, errors } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailValid = emailAddress.length > 0 && EMAIL_REGEX.test(emailAddress);
  const passwordValid = password.length > 0;
  const formValid = emailValid && passwordValid;
  const busy = fetchStatus === 'fetching';

  const finalize = async (method: 'password' | 'email_code') => {
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          console.log(session.currentTask);
          return;
        }
        if (session?.user?.id) posthog?.identify(session.user.id);
        posthog?.capture('sign_in_completed', { auth_method: method });
        goTo(router, decorateUrl('/'));
      },
    });
  };

  const handleSubmit = async () => {
    if (!formValid) return;

    const { error } = await signIn.password({ emailAddress, password });
    if (error) {
      posthog?.captureException(new Error('Clerk sign-in request failed'), { auth_flow: 'password' });
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === 'complete') {
      await finalize('password');
    } else if (signIn.status === 'needs_client_trust') {
      const emailCodeFactor = signIn.supportedSecondFactors.find((f) => f.strategy === 'email_code');
      if (emailCodeFactor) await signIn.mfa.sendEmailCode();
    } else if (signIn.status === 'needs_second_factor') {
      console.log('MFA required (not implemented in this flow)');
    } else {
      console.error('Sign-in attempt not complete:', signIn);
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });
    if (signIn.status === 'complete') {
      await finalize('email_code');
    } else {
      console.error('Sign-in attempt not complete:', signIn);
    }
  };

  const handleResend = async () => {
    try {
      await signIn.mfa.sendEmailCode();
      posthog?.capture('verification_code_resent', { auth_flow: 'client_trust' });
    } catch (error) {
      posthog?.captureException(new Error('Clerk verification code resend failed'), { auth_flow: 'client_trust' });
      console.error('Verification code resend failed:', error);
    }
  };

  if (signIn.status === 'needs_client_trust') {
    return (
      <AuthShell title="Verify your identity" subtitle="We sent a verification code to your email">
        <FormField
          label="Verification code"
          value={code}
          onChangeText={setCode}
          placeholder="Enter 6-digit code"
          keyboardType="number-pad"
          autoComplete="one-time-code"
          maxLength={6}
          error={errors.fields.code?.message}
        />
        <AppButton label={busy ? 'Verifying...' : 'Verify'} icon={null} onPress={handleVerify} disabled={!code || busy} />
        <AppButton label="Resend code" variant="secondary" onPress={handleResend} disabled={busy} />
        <AppButton label="Start over" variant="secondary" onPress={() => signIn.reset()} disabled={busy} />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to keep your streak going"
      footer={
        <View className="auth-link-row">
          <Text className="auth-link-copy">Don’t have an account?</Text>
          <Link href="/(auth)/sign-up" asChild>
            <Pressable>
              <Text className="auth-link">Create account</Text>
            </Pressable>
          </Link>
        </View>
      }
    >
      <FormField
        label="Email address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        onBlur={() => setEmailTouched(true)}
        placeholder="name@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        error={(emailTouched && !emailValid && 'Please enter a valid email address') || errors.fields.identifier?.message}
      />
      <FormField
        label="Password"
        value={password}
        onChangeText={setPassword}
        onBlur={() => setPasswordTouched(true)}
        placeholder="Enter your password"
        secureTextEntry
        autoComplete="password"
        error={(passwordTouched && !passwordValid && 'Password is required') || errors.fields.password?.message}
      />
      <AppButton label={busy ? 'Signing in...' : 'Sign in'} icon={null} onPress={handleSubmit} disabled={!formValid || busy} />
    </AuthShell>
  );
};

export default SignIn;
