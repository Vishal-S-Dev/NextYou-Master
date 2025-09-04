import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Text } from 'react-native';
import * as z from 'zod';

import { TitleSubTitleText } from '@/components';
import { Button, ControlledInput, View } from '@/components/ui';
import { ControlledDatePickerInput } from '@/components/ui/input-date-picker';
import ControlledGenderSelect from '@/components/ui/input-gender-select';
import { colors } from '@/lib';

const dateFormat = 'YYYY-MM-DD';

const schema = z.object({
  name: z
    .string({
      required_error: 'Enter your full name',
    })
    .refine((val) => val.trim().length > 0, {
      message: 'Name cannot be blank',
    }),
  dob: z
    .string({
      required_error: 'Select date of birth',
    })
    .refine(
      (dateStr) => {
        const birthDate = moment(dateStr, dateFormat).toDate();
        if (isNaN(birthDate.getTime())) return false;
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      },
      {
        message: 'You must be at least 18 years old',
      }
    ),
  gender: z.string({
    required_error: 'Select gender',
  }),
});

export type BasicInfoFormType = z.infer<typeof schema>;

export type BasicInfoFormProps = {
  loading?: boolean;
  onSubmit?: SubmitHandler<BasicInfoFormType>;
};

export const BasicInfoForm = ({
  loading,
  onSubmit = () => {},
}: BasicInfoFormProps) => {
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { isValid },
  } = useForm<BasicInfoFormType>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    //mode: 'onChange', // Required for real-time isValid
    defaultValues: {
      name: '',
      dob: '',
      gender: '',
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1  p-8">
        <TitleSubTitleText
          title="Let’s Get Started"
          subText="We need a few details to kickstart your journey"
          containerClassName="justify-start items-start"
          titleClassName="text-2xl"
        />
        <View className="h-12" />

        <ControlledInput
          testID="name-input"
          control={control}
          name="name"
          clearErrors={clearErrors}
          placeholder="Enter Full Name"
          rightComponent={
            <Text className="text-center text-[#16161699]">Name</Text>
          }
        />

        <View className="h-10" />
        <ControlledDatePickerInput
          control={control}
          name="dob"
          dateFormat={dateFormat}
          clearErrors={clearErrors}
          placeholder="Select date of birth"
          rightComponent={
            <Text className="text-center text-[#16161699]">DOB</Text>
          }
          disabled
        />
        <View className="h-10" />
        <ControlledGenderSelect
          name="gender"
          control={control}
          label="Select your gender"
        />
      </View>
      <View className="absolute bottom-4 w-full p-8">
        <Button
          testID="otp-button"
          label="Create Account"
          disabled={!isValid}
          variant="login"
          size="login"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
