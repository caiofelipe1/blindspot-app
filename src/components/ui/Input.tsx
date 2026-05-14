import { View, Text, TextInput, type TextInputProps } from 'react-native';
import type { ReactNode } from 'react';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  rightIcon?: ReactNode;
}

export function Input({ label, error, rightIcon, className = '', ...props }: InputProps) {
  return (
    <View className="gap-2">
      {label && (
        <Text className="text-subtle-dark text-base font-medium tracking-[0.2px]">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center border rounded-lg h-12 px-3 ${
          error ? 'border-red-400' : 'border-subtle-light'
        }`}
      >
        <TextInput
          className={`flex-1 text-normal text-base ${className}`}
          placeholderTextColor="#AFB1B6"
          {...props}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
      {error && (
        <Text className="text-red-500 text-xs">{error}</Text>
      )}
    </View>
  );
}
