import {
    extendTheme,
    withDefaultColorScheme,
    theme as baseTheme,
} from '@chakra-ui/react';

export const customTheme = extendTheme(
    {
        components: {
            Badge: {
                sizes: {
                    sm: {
                        h: '12px',
                        fontSize: '8px',
                        px: '4px',
                    },
                },
            },
        },
        colors: {
            brand: baseTheme.colors.teal,
        },
    },
    withDefaultColorScheme({ colorScheme: 'brand' })
);
