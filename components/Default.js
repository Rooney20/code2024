import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAccount, useSendTransaction, useContractRead } from 'wagmi';
import { Menu, Button, Breadcrumb, Progress, Image } from "@arco-design/web-react";
import { IconTwitter, IconGithub } from '@arco-design/web-react/icon';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { enNumber, NumbertoFixed } from "../utils";
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
	flex: 1 1 0%;
	overflow: hidden;
	padding-top: 20px;
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

const Card = styled.div`
    width: 100%;
    border-radius: 15px;
    padding: 20px;
	background: #f8f8f8;
`;

const CardTitle = styled.div`
    width: 100%;
`;

const CardTag = styled.span`
    color: #444;
    text-align: center;
    background: rgba(0,0,0,0.1);
	border-radius: 10px;
	padding: 6px 10px;
	font-size: 12px;
	font-weight: 600;
`;

const CardTotal = styled.div`
    width: 100%;
	font-size: 30px;
	font-weight: 600;
	line-height: 80px;
	color: rgb(var(--danger-6));
`;

const CardLabel = styled.div`
    width: 100%;
	font-size: 11px;
	color: #999;
	span{
		font-weight: 400;
		margin-left: 5px;
		color: #555;
	}
`;

const Say = styled.div`
    width: 100%;
	margin-top: 100px;
    padding: 100px 0;
	background: rgb(20,23,27);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    width: 1200px;
    margin: auto;
	color: #fff;
	line-height: 30px;
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

function Inscribe() {
	const { address, isConnected } = useAccount();
	const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
	    to: process.env.NEXT_PUBLIC_SEND_ADDRESS,
	    value: BigInt(0.00001 * Math.pow(10,18)),
	})
	return isConnected && <Button
				style={{height: 60, width: 200, fontSize: 20, fontWeight: 600}}
				size="large"
				shape='round' 
				type='primary'
				status="danger" 
				loading={isLoading}
				onClick={()=>{
					isLoading || isConnected && sendTransaction();
				}}
				>
			{isLoading ? <>Check Wallet</> : <>Inscribe</>}
			</Button>
}

function InscribeTMP() {
	return <Button
				style={{height: 60, width: 500, fontSize: 20, fontWeight: 600}}
				size="large"
				shape='round' 
				type='primary' 
				status="danger" 
				>Open on Dec 21st at 12:00 UTC</Button>
}

function Default() {
	const [total, setTotal] = useState(0);
	const [hold, setHold] = useState(0);
	const [holder, setHolder] = useState(0);
	const { address, isConnected } = useAccount();
	
	const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_CONTRACT_URL);
	const contractABI = MainnetContractABI;
	const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
	const userAddress = address;
	const contract = new ethers.Contract(contractAddress, contractABI, provider);
	
	useEffect( async() => {
	    try {
	        const total = await contract.totalSupply();
			if(isConnected){
				const hold = await contract.balanceOf(userAddress);
				setHold(hold.toString());
			}
	    	const holder = await contract.utxoCounter();
			setTotal(total.toString());
			setHolder(holder.toString());
	    } catch (error) {
	      console.error('Error:', error);
	    }
	}, []);
	
    return (
    <Container>
	    <Top>
		    <Head>
			    <Menu style={{height: 90}} mode='horizontal' defaultSelectedKeys={['1']}>
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
		    <Box>
			    <Breadcrumb>
			        <BreadcrumbItem><span style={{fontSize: 20, fontWeight: 600, color: `rgb(var(--danger-6))`}}>Oops</span></BreadcrumbItem>
			    </Breadcrumb>
			</Box>
			<Box>
			    <Progress percent={NumbertoFixed(holder * 100 / 21000000)} strokeWidth={25} color={{
                    '0%': 'rgb(var(--danger-6))',
                    '100%': 'rgb(var(--danger-6))',
                }} />
			</Box>
			<BoxPro><Inscribe /></BoxPro>
			<Box>
			    <CardList>
					<Card>
					    <CardTitle>
						    <CardTag>Total</CardTag>
						</CardTitle>
						<CardTotal>21,000,000 Opps</CardTotal>
					</Card>
					<Card style={{position: `relative`}}>
					    <CardTitle>
					    	<CardTag>You Hold</CardTag>
					    </CardTitle>
					    <CardTotal>{enNumber(hold)} Opps</CardTotal>
					    <CardLabel>ADDR:<span>{isConnected && address}</span></CardLabel>
						{
						    isConnected || <div style={{borderRadius: `15px`, border: `1px solid #eee` , position: `absolute`, zIndex: 9, left: 0, top: 0, width: `100%`, height: `100%`, background: `rgba(255,255,255,0.8)`, display: `flex`, alignItems: `center`, justifyContent: `center`}}>
						        <ConnectButton />
						    </div>
						}
					</Card>
					<Card>
					    <CardTitle>
							<CardTag>Holder</CardTag>
						</CardTitle>
					    <CardTotal>987</CardTotal>
					</Card>
				</CardList>
			</Box>
		</Main>
		<Say>
		    <Content>
			    <div style={{fontSize: 20, fontWeight: 600, marginBottom: 40}}>Oops: Your Gateway to Immutable Inscriptions on Optimism.</div>
				<div>Oops brings the art of permanent record to the Optimism network, enabling you to deploy inscriptions with unparalleled ease and security. Designed for both newcomers and seasoned developers, Oops offers a streamlined process to immortalize your data on the blockchain efficiently and at a fraction of the cost. Experience the next evolution of digital inscriptions with Oops, where your creations become a lasting part of the Optimism ecosystem.</div>
		    </Content>
		</Say>
		<Bottom>
		    <Foot>
                      <a href="https://twitter.com/OrigerE56081" target="_blank">
			   <Image
			       preview={false}
			       width={22}
			       src='/images/twitter.svg'
			       alt='x'
			   />
			</a>
				<Image
				    style={{marginLeft: `30px`}}
				    preview={false}
				    width={25}
				    src='/images/telegram.svg'
				    alt='telegram'
				/>
				<a href="https://gitbook.io/">
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

export default Default;
