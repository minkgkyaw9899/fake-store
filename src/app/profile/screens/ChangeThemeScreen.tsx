import React, { useEffect, useMemo, useState } from 'react';
import ContainerWithTitle from '@/components/ContainerWithTitle';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { StyleSheet } from 'react-native';
import { useHandleTheme } from '@/hooks/useHandleTheme';
import { COLORS } from '@/constants/color';

const ChangeThemeScreen = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const { changeCurrentTheme, currentTheme, isDark } = useHandleTheme();

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Light Theme',
        value: 'light',
        color: isDark ? COLORS.WHITE : COLORS.SLATE_800,
        containerStyle: styles.radioContainer,
        labelStyle: {
          ...styles.label,
          color: isDark ? COLORS.WHITE : COLORS.SLATE_800,
        },
      },
      {
        id: '2',
        label: 'Dark Theme',
        value: 'dark',
        color: isDark ? COLORS.WHITE : COLORS.SLATE_800,
        containerStyle: styles.radioContainer,
        labelStyle: {
          ...styles.label,
          color: isDark ? COLORS.WHITE : COLORS.SLATE_800,
        },
      },
      {
        id: '3',
        label: 'System Auto',
        value: 'system',
        color: isDark ? COLORS.WHITE : COLORS.SLATE_800,
        containerStyle: styles.radioContainer,
        labelStyle: {
          ...styles.label,
          color: isDark ? COLORS.WHITE : COLORS.SLATE_800,
        },
      },
    ],
    [isDark],
  );

  useEffect(() => {
    if (!selectedId) {
      switch (currentTheme) {
        case 'light':
          setSelectedId('1');
          return;
        case 'dark':
          setSelectedId('2');
          return;
        case 'system':
          setSelectedId('3');
          return;
      }
    }
  }, [currentTheme, selectedId]);

  const handleChangeTheme = (id: string) => {
    setSelectedId(id);
    const selectedTheme = radioButtons.find(i => i.id === id)?.value as
      | 'light'
      | 'dark'
      | 'system'
      | undefined;

    if (selectedTheme) {
      changeCurrentTheme(selectedTheme);
    }
  };

  return (
    <ContainerWithTitle className="py-8" title="Change Theme">
      <RadioGroup
        containerStyle={styles.radioGroupContainer}
        radioButtons={radioButtons}
        onPress={handleChangeTheme}
        selectedId={selectedId}
      />
    </ContainerWithTitle>
  );
};

const styles = StyleSheet.create({
  radioGroupContainer: {
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 8,
  },
  radioContainer: {
    width: '100%',
    gap: 16,
  },
  label: {
    fontSize: 16,
  },
});

export default ChangeThemeScreen;
