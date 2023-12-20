import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAccount, useSendTransaction, useContractRead } from 'wagmi';
import { Menu, Button, Breadcrumb, Progress, Image, Form, Input, Checkbox, Radio, Tooltip } from "@arco-design/web-react";
import { IconTwitter, IconGithub } from '@arco-design/web-react/icon';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import "@arco-design/web-react/dist/css/arco.css";

const BreadcrumbItem = Breadcrumb.Item;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
	const [layout, setLayout] = React.useState('horizontal');
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
		        <Menu style={{height: 90}} mode='horizontal' defaultSelectedKeys={['2']}>
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
		    <BoxPro>
			    <Form
			          style={{border:`1px solid #f8f8f8`, padding: `50px 0`, borderRadius: 15, background: `#fcfcfc`}}
			          autoComplete='off'
			          layout={layout}
			        >
			          <FormItem label='Choose' >
			            <RadioGroup onChange={setLayout} type='button' name='layout' value={layout}>
			              <Radio value='horizontal'>Deploy</Radio>
			            </RadioGroup>
			          </FormItem>
			          <FormItem label='Token' field='token' rules={[{ required: true }]}>
			            <Input style={{ width: 270 }} placeholder='name' />
			          </FormItem>
			          <FormItem label='Total Supply' rules={[{ required: true }]}>
			            <Input style={{ width: 270 }} placeholder='21000000' />
			          </FormItem>
					  <FormItem label='Limit Mint' rules={[{ required: true }]}>
					    <Input style={{ width: 270 }} placeholder='100' />
					  </FormItem>
			          <FormItem
			            wrapperCol={
			              layout === 'horizontal'
			                ? {
			                    offset: 5,
			                  }
			                : {}
			            }
			        >
					    <Tooltip content='Coming Soon'>
					        <Button disabled status="danger" htmlType='submit'>Deploy</Button>
					    </Tooltip>
			          </FormItem>
			        </Form>
			</BoxPro>
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
