import Head from 'next/head';
import Button from '@material-ui/core/Button';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button variant="outlined">Hello</Button>
      </main>
    </div>
  );
}
