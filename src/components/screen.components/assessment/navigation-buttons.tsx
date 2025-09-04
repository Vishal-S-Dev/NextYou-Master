import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui';

type NavigationButtonsProps = {
  nextButtonLabel: string;
  onPrev: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  showPrev?: boolean;
};

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  nextButtonLabel = 'Next',
  onPrev,
  onNext,
  isNextDisabled = false,
  showPrev = true,
}) => {
  return (
    <View className="flex-row gap-4">
      {showPrev && (
        <Button
          label="Prev"
          variant="login"
          size="login"
          className="flex-1"
          onPress={onPrev}
        />
      )}
      <Button
        label={nextButtonLabel}
        variant="login"
        size="login"
        className="flex-1"
        onPress={onNext}
        disabled={isNextDisabled}
      />
    </View>
  );
};

export default NavigationButtons;
