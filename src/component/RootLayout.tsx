import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

const dashboardTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DashboardPageContent({ pathname }: { pathname: string }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography>Dashboard content for {pathname}</Typography>
        </Box>
    );
}

interface DashboardProps {
    window?: () => Window;
}

const RootLayout = (props: DashboardProps) => {

    const { window } = props;

    const router = useDemoRouter('/home');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return(
        <>
            <AppProvider
                navigation={[
                    {
                        segment: 'home',
                        title: 'Home',
                        icon: <DescriptionIcon />,
                    },
                    {
                        segment: 'about',
                        title: 'About Us',
                        icon: <DescriptionIcon />,
                    },
                ]}
                router={router}
                theme={dashboardTheme}
                window={demoWindow}
            >
                <DashboardLayout>
                    <DashboardPageContent pathname={router.pathname} />
                </DashboardLayout>
            </AppProvider>
            );
        </>
    )
}

export default RootLayout;