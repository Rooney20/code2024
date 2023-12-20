import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAccount, useSendTransaction, useContractRead } from 'wagmi';
import { Menu, Button, Breadcrumb, Progress, Image, Card, Link, Space, Tooltip } from "@arco-design/web-react";
import { IconTwitter, IconGithub, IconSync } from '@arco-design/web-react/icon';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MainnetContractABI from "../abi/mainnet.json";
import "@arco-design/web-react/dist/css/arco.css";
import { ethers } from "ethers";

const BreadcrumbItem = Breadcrumb.Item;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Container = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;   
	min-height: calc(var(--vh, 1vh) * 100);
`;

const Top = styled.div`
    top: 0;
	width: 100%;
	position: relative;
    border-bottom: 1px solid rgb(229,231,235);
`;

const Head = styled.div`
    width: 1200px;
	margin: auto;
`;

const Main = styled.div`
	overflow: hidden;
	padding: 20px 0;
	position: relative;
	width: 1200px;
	margin: auto;
`;

const Box = styled.div`
    width: 100%;
	padding: 20px 0;
`;

const BoxPro = styled.div`
    width: 100%;
	padding: 10px 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CardList = styled.div`
    border-radius: 12px;
	border: 1px solid #eee;
	padding: 20px;
	display: grid;
	grid-template-columns: repeat(auto-fit, calc(33% - 10px));
	grid-auto-flow: dense;
	grid-gap: 20px;
	gap: 20px;
	width: 100%;
`;

const Bottom = styled.div`
    flex: 1 1 0%;
    flex-direction: column;
    display: flex;
	width: 100%;
	line-height: 80px;
	align-items: center;
`;

const Foot = styled.div`
    display: flex;
`;

export default function Home() {
	const [hold, setHold] = useState(0);
	const { address, isConnected } = useAccount();
	const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_CONTRACT_URL);
	const contractABI = MainnetContractABI;
	const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
	const userAddress = address;
	const contract = new ethers.Contract(contractAddress, contractABI, provider);
	useEffect( async() => {
	    try {
			if(isConnected){
				const hold = await contract.balanceOf(userAddress);
				setHold(hold.toString());
			}
	    } catch (error) {
	      console.error('Error:', error);
	    }
	}, []);
    return (
    <Container>
        <Head>
            <title>OopsMarket</title>
            <meta name="description" content="Hello!OopsMarket!" />
            <link rel="icon" href="/favicon.ico" />
            {/* Global Site Tag (gtag.js) - Google Analytics */}
        </Head>
		<Top>
		    <Head>
		        <Menu style={{height: 90}} mode='horizontal' defaultSelectedKeys={['4']}>
		            <MenuItem
		                key='0'
		                style={{ padding: 0, marginRight: 38, }}
		                disabled
		            >
		    			<Image
		    			    preview={false}
		    			    width={105}
		    			    src='/images/logo.png'
		    			    alt='lamp'
		    			/>
		            </MenuItem>
		            <MenuItem key='1'><a href="/">Home</a></MenuItem>
		            <MenuItem key='2'><a href="/deploy">Deploy</a></MenuItem>
		            <MenuItem key='3'><a href="/market">Marketplace</a></MenuItem>
		            <MenuItem key='4'><a href="/space">My Space</a></MenuItem>
		            <MenuItem disabled style={{float: `right`, display: `flex`, alignItems: `center`}}>
		    		    <ConnectButton />
		        	</MenuItem>
		        </Menu>
		    </Head>
		</Top>
		<Main>
		    <div style={{display: `flex`, alignItems: `center`}}>
		        <span>Refresh</span>
		        <IconSync style={{marginLeft: 10, cursor: `pointer`}} onClick={ async ()=>{
		        	if(isConnected){
		        		const hold = await contract.balanceOf(userAddress);
		        		setHold(hold.toString());
		        	}
		        }}/>
		    </div>
		</Main>
		<Main>
		    <Space>
		          <Card
		            style={{ width: 360, background: `#fcfcfc`, borderRadius: 15 }}
		            title='Oops'
		            hoverable
					actions={[
						<Tooltip content='Coming Soon'>
						    <Button size="large" shape='round' type='primary' status="danger" >List</Button>
						</Tooltip>,
						<Tooltip content='Coming Soon'>
						    <Button size="large" shape='round' type='primary' status="danger">Transfer</Button>
						</Tooltip>
					]}
		          >
		            <div style={{color: `rgb(var(--danger-6))`, fontSize: 30, fontWeight: 800, textAlign: `center`}}>{hold}</div>
		          </Card>
		        </Space>
		</Main>
		<Bottom>
		    <Foot>
			   <Image
			       preview={false}
			       width={22}
			       src='/images/twitter.svg'
			       alt='telegram'
			   />
				<Image
				    style={{marginLeft: `30px`}}
				    preview={false}
				    width={25}
				    src='/images/telegram.svg'
				    alt='telegram'
				/>
				<a href="https://oopsdoc.gitbook.io/oops">
				    <Image
				        style={{marginLeft: `30px`}}
				        preview={false}
				        width={25}
				        src='/images/gitbook.svg'
				        alt='gitbook'
				    />
				</a>
			</Foot>
		</Bottom>
    </Container>
  );
}
