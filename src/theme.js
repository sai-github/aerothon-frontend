import {
    extendTheme,
    withDefaultColorScheme,
    theme as baseTheme,
} from '@chakra-ui/react';

export const customTheme = extendTheme(
    {
        colors: {
            brand: baseTheme.colors.teal,
        },
    },
    withDefaultColorScheme({ colorScheme: 'brand' })
);
