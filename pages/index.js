import { useEffect } from 'react';
import styled from "styled-components";
import Head from 'next/head';
import Default from '../components/Default';

const Container = styled.div`
    margin: 0;
    padding: 0;
	min-width: 1200px;
	--vh: 8.88px;
`;

export default function Home() {

  return (
    <Container>
        <Head>
            <title>Oops Market</title>
            <meta name="description" content="Hello!OopsMarket!" />
            <link rel="icon" href="/favicon.ico" />
            {/* Global Site Tag (gtag.js) - Google Analytics */}
        </Head>
		<Default />
    </Container>
  );
}
