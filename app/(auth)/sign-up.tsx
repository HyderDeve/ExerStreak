import AppButton from '@/components/AppButton';
import AuthShell from '@/components/AuthShell';
import FormField from '@/components/FormField';
import { goTo } from '@/lib/auth';
import { posthog } from '@/lib/posthog';
import { EMAIL_REGEX } from '@/lib/utils';
import { useAuth, useSignUp } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const SignUp = () => {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailValid = emailAddress.length > 0 && EMAIL_REGEX.test(emailAddress);
  const passwordValid = password.length >= 8;
  const formValid = emailValid && passwordValid;
  const busy = fetchStatus === 'fetching';

  const handleSubmit = async () => {
    if (!formValid) return;

    const { error } = await signUp.password({ emailAddress, password });
    if (error) {
      posthog?.captureException(new Error('Clerk sign-up request failed'), { auth_flow: 'password' });
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    await signUp.verifications.sendEmailCode();
    posthog?.capture('sign_up_verification_requested', { verification_method: 'email_code' });
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }
          if (session?.user?.id) posthog?.identify(session.user.id);
          posthog?.capture('sign_up_completed', { verification_method: 'email_code' });
          goTo(router, decorateUrl('/'));
        },
      });
    } else {
      console.error('Sign-up attempt not complete:', signUp);
    }
  };

  if (signUp.status === 'complete' || isSignedIn) return null;

  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0
  ) {
    return (
      <AuthShell title="Verify your email" subtitle={`We sent a verification code to ${emailAddress}`}>
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
        <AppButton label={busy ? 'Verifying...' : 'Verify email'} icon={null} onPress={handleVerify} disabled={!code || busy} />
        <AppButton label="Resend code" variant="secondary" onPress={() => signUp.verifications.sendEmailCode()} disabled={busy} />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start a streak that sticks"
      footer={
        <View className="auth-link-row">
          <Text className="auth-link-copy">Already have an account?</Text>
          <Link href="/(auth)/sign-in" asChild>
            <Pressable>
              <Text className="auth-link">Sign in</Text>
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
        error={(emailTouched && !emailValid && 'Please enter a valid email address') || errors.fields.emailAddress?.message}
      />
      <FormField
        label="Password"
        value={password}
        onChangeText={setPassword}
        onBlur={() => setPasswordTouched(true)}
        placeholder="At least 8 characters"
        secureTextEntry
        autoComplete="new-password"
        error={(passwordTouched && !passwordValid && 'Password must be at least 8 characters') || errors.fields.password?.message}
      />
      <AppButton label={busy ? 'Creating account...' : 'Create account'} icon={null} onPress={handleSubmit} disabled={!formValid || busy} />
    </AuthShell>
  );
};

export default SignUp;
