import Head from 'next/head';
import { Button, Container, Grid as GridBase } from '@material-ui/core';
import styled from 'styled-components';

const wireframes = false;

const Grid = styled(GridBase)`
  border: ${wireframes ? '1px solid red' : 'none'};
  padding: 200px;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxWidth="lg">
          <Grid container direction="row" alignContent="center" alignItems="center" justify="center">
            <Grid item>
              <Button variant="outlined">Hello</Button>
            </Grid>
          </Grid>
          <Grid container direction="row" alignContent="center" alignItems="center" justify="center">
            <Grid item>
              <Button variant="outlined">Hello</Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
