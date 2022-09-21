import {
  Box,
  List,
  ListItem,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import main_page_image from '../../public/images/main_page.png';

const CustomListItem = styled(ListItem)(({}) => ({
  padding: 0,
  '&.MuiListItem-root': {
    display: 'list-item',
  },
}));

function About() {
  const {
    palette: { color },
  } = useTheme();

  return (
    <Box>
      <Box width="100%" sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={main_page_image}
          alt="main page"
          width="100%"
          height="calc(100vw / 2)"
        />
        <Box
          sx={{
            bgcolor: 'rgba(250, 250, 250, 0.5)',
            padding: '15px',
            position: 'absolute',
            bottom: '4px',
            left: 0,
            border: `1px solid ${color.grey}`,
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: {
                xs: '2rem',
                sm: '3rem',
                md: '4rem',
              },
            }}
            color="primary"
          >
            Open today 9 am - 9 pm
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          p: '40px',
          maxWidth: '1000px',
          width: '100%',
          marginX: 'auto',
        }}
      >
        <Typography
          color="primary"
          marginBottom="20px"
          fontSize={{ xs: '2rem', sm: '2.5rem', md: '3rem' }}
          fontWeight="bold"
        >
          About Library
        </Typography>
        <Stack spacing="15px">
          <Typography>
            The opening date of the library is deemed to be December 31, 1910,
            when there by the decision of the Vernenskaya city duma opened the
            library-reading room. In 1931 there by the decree of the Presidium
            of the Central Executive Committee of the Soviets of the KazSSR
            dated March 12, 1931 “On the establishment of the State Public
            library of the KASSR” the library was transformed into the State
            public library of the Kazakh SSR. From May 5, 1931 it started
            servicing the first readers. In February, 1937 the library was given
            the name of A.S.Pushkin as the sign of commemoration of the memory
            of the great Russian poet and in connection with the centenary from
            the day of his death.
          </Typography>
          <Typography>
            In 1991 there by the Decree of the Cabinet of Ministers of the
            Kazakh SSR dated December 9, 1991 №775 “About the National library
            of the Kazakh SSR” the State library of the Kazakh SSR after A.S.
            Pushkin was renamed into National library of the Kazakh SSR and thus
            it acquired the state and public significance as an especially
            valuable object of culture.
          </Typography>
          <Typography>
            In 2020 there by the Decree of the President of the Republic of
            Kazakhstan dated November 20, 2020 about the giving of the status of
            “National” to some organizations of culture to National library of
            the Republic of Kazakhstan was given the status of “National”.{' '}
          </Typography>
          <Typography>
            National library is the largest scientific-methodological centre of
            the libraries of Kazakhstan; the depositary of legal copy of the
            works of print of Kazakhstan; the depositary of the Committee for
            the control in the sphere of education and science of the Ministry
            of education and science of the RK of the candidate and doctoral
            dissertations in all branches of science defended in Kazakhstan; the
            depositary of the abstracts of theses of the countries of the CIS;
            from 1993 – the depositary of scientific dissertations and editions
            of UNESCO; from 2005 – the depositary of the literature published by
            the State programme “Cultural heritage”; from 2012 – the depositary
            of the editions of the Assembly of the people of Kazakhstan of
            Almaty city.
          </Typography>
          <Typography>
            The first director of the library – Uraz Dzhandosov, the prominent
            state and public figure of Kazakhstan. The main task in the activity
            of the library he deemed to be “the accumulation of all printed
            production in the Kazakh language and all the literature about
            Kazakhstan”. From that time the library functions as the state
            national book depositary which collects and keeps the documentary
            written heritage of the Kazakhs and the other peoples of Kazakhstan.
          </Typography>
          <Typography>
            The book fond numbers more than 78 mln units of storage. The annual
            visits of the readers constitutes more than 1 mln, book issuance –
            approximately 2 mln. the readers are serviced by the 14 specialized
            halls for 1500 seats.
          </Typography>
          <Typography>
            The visit-card of the library is its site www.nlrk.kz, the purpose
            of which is the organization of the single informational point of
            access to the electronic resources of the library. The annual
            virtual visits of the web-site constitutes more than 1,6 mln.
          </Typography>
          <Typography>
            The National library of the RK from 1992 is a member of the
            International Federation of Library Associations and Institutions
            (the IFLA), the Conference of Directors of National Libraries (the
            CDNL), fro0m 1993 – of the Non-commercial partnership “The Library
            Assembly of Eurasia” (the LAE). From 2008 it is the regional centre
            of the IFLA/PAC Main Programme in Preservation and Conservation.
          </Typography>
          <Typography>
            The strategical priorities of the National library of the RK:
          </Typography>
          <List
            sx={{
              paddingX: '20px',
              '&.MuiList-root': {
                listStyle: 'disc',
              },
            }}
          >
            <CustomListItem>
              The acquisition of the fonds and the provision of their
              preservation;
            </CustomListItem>
            <CustomListItem>
              The quality library-informational servicing;
            </CustomListItem>

            <CustomListItem>
              The development and inculcation of modern informational
              technologies;
            </CustomListItem>
            <CustomListItem>
              The initiation of the republican and international
              informational-library projects.
            </CustomListItem>
            <CustomListItem>
              The building of the library was built by special project in 1970
              and was entered into the State list of monuments of history and
              culture of the republican significance, approved by the Order of
              the Minister of culture and sport of the RK dated May 30, 2019
              №156
            </CustomListItem>
          </List>
        </Stack>
      </Box>
    </Box>
  );
}

export default About;
