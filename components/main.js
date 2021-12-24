import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const tiers = [
    {
        title: 'Теория и практика',
        description: [
            'Раздел состоит из 5 уровней, в каждом из которых Вы сможете попробовать разгадать головоломку либо сыграть в игру :)'
        ],
        buttonText: 'Начать',
        buttonVariant: 'outlined',
        link : '/lvl0'
    },
    {
        title: 'Сетевая игра',
        // subheader: 'Most popular',
        description: [
            'У Вас есть возможность сыграть в игру со своим другом',

        ],
        buttonText: 'Создать лобби',
        buttonVariant: 'outlined',
        link: '/multiplayer/create_multiplayer'
    },
    {
        title: 'Статья',
        description: [
            'Если Вас заинтересовала данная тема, Вы можете изучить статью, на основе которой был разработан данный проект'
        ],
        buttonText: 'Перейти',
        buttonVariant: 'outlined',
        link:'http://kvant.mccme.ru/1988/04/ramseevskaya_teoriya_grafov.htm'
    },
];

const footers = [
    {
        title: 'Разработчики',
        description: ['  • Хмарский Анатолий', '  • Странникова Наталья'],
    },
    {
        title: 'Как с нами связаться',
        description: [
            '  • tucha.989@gmail.com',
            '  • nsstrannikova@mail.ru',
        ],
    },
    // {
    //     title: 'Resources',
    //     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    // },
    // {
    //     title: 'Legal',
    //     description: ['Privacy policy', 'Terms of use'],
    // },
];

function PricingContent(props) {
    const router = props.router
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            {/* Hero unit */}
            <Container disableGutters maxWidth="2sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Рамсеевская теория графов
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    {/*// описание*/}
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="2.5md" component="main">
                <Grid container spacing={5} alignItems="center">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >


                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                <font size={+4}>{line}</font>

                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant} onClick={() => router.push(tier.link)}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
                <Grid container spacing={4} justifyContent="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={6} key={footer.title}>
                            <Typography variant="h7" color="text.primary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (

                                    <li key={item}>
                                        <font size={+4}>
                                            {item}
                                        </font>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>

            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}

export default function Main(props) {
    return <PricingContent router ={props.router}/>;
}