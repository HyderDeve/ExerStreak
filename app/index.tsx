import '@/global.css';
import { useProfile } from '@/lib/useProfile';
import { Redirect } from 'expo-router';

const Index = () => {
  const { onboarded } = useProfile();

  return <Redirect href={onboarded ? '/(tabs)' : '/onboarding'} />;
};

export default Index;
