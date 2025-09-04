import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui';
interface OTPTimerProps {
  duration?: number; // Optional, will use default if not provided
  onResend?: () => void; // Optional, will use default if not provided
}

const OTPTimerText = ({
  duration = 60,
  onResend = () => console.log('Resend OTP pressed (default)'),
}: OTPTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft > 0) {
      setIsResendDisabled(true);
      // Assign the interval ID to the ref's current property
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    // Cleanup function: Clear the interval when the component unmounts
    // or when dependencies (timeLeft, duration) change and a new interval starts.
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Reset the ref
      }
    };
  }, [timeLeft, duration]); // Depend on timeLeft and duration

  const handleResend = () => {
    if (!isResendDisabled) {
      onResend(); // Call the resend function passed as a prop
      setTimeLeft(duration); // Reset the timer
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}s`;
  };

  return (
    <View className="mt-10 items-center justify-center">
      <View className="mb-2 flex-row items-center">
        <Text
          testID="form-title"
          className="mr-1 text-center font-inter-medium text-base"
        >
          Didn't receive any OTP?
        </Text>
        {!isResendDisabled && (
          <Button
            label="Resend"
            size="sm"
            variant="ghost"
            onPress={handleResend}
            textClassName="font-inter-semibold text-base text-primary-400"
          />
        )}
      </View>
      {isResendDisabled && (
        <Text className="text-center text-[#16161699]">
          Request new code in {formatTime(timeLeft)}
        </Text>
      )}
    </View>
  );
};

export default OTPTimerText;
