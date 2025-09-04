import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/components/ui';
export function HomeTakeAssessmentAction() {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.9 }}
      colors={['#4F2BDA', '#2A1774']}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 8,
        paddingHorizontal: 20,
        paddingBottom: 8,
        bottom: 0,
        gap: 16,
      }}
    >
      <Button label="Take Assessment " className="flex-1 bg-[##FFFFFF33]" />
      <Button
        label="How it work"
        variant="outline"
        className="flex-1"
        textClassName="color-white font-imb-medium"
      />
    </LinearGradient>
  );
}
