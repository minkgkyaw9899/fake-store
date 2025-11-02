import { Spacer, Text } from '@/components';
import { COLORS } from '@/constants/color';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useHandleTheme } from '@/hooks/useHandleTheme';
import { cn } from '@/utils/cn';
import { useQueryClient } from '@tanstack/react-query';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { Dispatch, SetStateAction } from 'react';
import { Pressable, ScrollView } from 'react-native';

type Props = {
  categories: string[];
  selectedCategory: string;
  isPending: boolean;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export const CategoryList = ({
  categories,
  selectedCategory,
  isPending,
  setSelectedCategory,
}: Props) => {
  const queryClient = useQueryClient();

  const { isDark } = useHandleTheme();
  const colorMode = isDark ? 'dark' : 'light';
  return isPending ? (
    <MotiView
      className="my-6 h-12 flex-row items-center justify-items-start gap-2 px-8"
      animate={{
        backgroundColor: isDark ? COLORS.SLATE_800 : COLORS.SLATE_100,
      }}
    >
      <Skeleton colorMode={colorMode} width={100} />
      <Spacer width={8} />
      <Skeleton colorMode={colorMode} width={100} />
      <Spacer width={8} />
      <Skeleton colorMode={colorMode} width={100} />
      <Spacer width={8} />
      <Skeleton colorMode={colorMode} width={100} />
      <Spacer width={8} />
      <Skeleton colorMode={colorMode} width={100} />
    </MotiView>
  ) : (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-8 gap-4 my-6 items-center"
    >
      {['All', ...categories].map(category => (
        <Pressable
          key={category}
          className={cn(
            'h-10 items-center justify-center rounded-3xl',
            selectedCategory === category
              ? 'bg-slate-900'
              : 'border border-slate-300 bg-slate-300 dark:bg-slate-700',
          )}
          onPress={() => {
            setSelectedCategory(category);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
          }}
        >
          <Text
            className={cn(
              'px-6 font-semibold capitalize text-white',
              selectedCategory === category
                ? 'text-white'
                : 'text-slate-900 dark:text-slate-200',
            )}
            value={category}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
};
