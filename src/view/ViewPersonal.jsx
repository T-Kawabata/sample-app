import React from "react"

import { CircularProgress } from "@mui/material"
import { Avatar } from "@mui/material"
import { Box } from "@mui/material"
import { Grid			} from "@mui/material"
import { Button } from "@mui/material"
import { Container } from "@mui/material"
import { Toolbar } from "@mui/material"
import { Typography } from "@mui/material"
import { Paper } from "@mui/material"
import { Card			} from "@mui/material"
import { CardActions	} from "@mui/material"
import { CardContent	} from "@mui/material"
import { CardMedia		} from "@mui/material"


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend  } from 'recharts';


import { styled } from "@mui/material/styles"

import   moment		  from 'moment';

import { useAtom	} from "jotai"
import { LoginInfo  } from "./Store"

const ViewContainer = styled(Box)(({ theme }) => ({
}))
const ViewCenter = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}))
const ViewTopContainer = styled(Box)(({ theme }) => ({
	marginTop: 64,
	height: 316,
	display: 'flex',
	flex: 'nowrap',
}))
const LeftContainer = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: 540,
	height: 316,
	margin: 0,
	padding: 0,
}))
const LeftBox = styled(Box )(({ theme }) => ({
	width: 540,
	height: 316,
	objectFit: 'none',
}))
const LeftProgress = styled(CircularProgress )(({ theme }) => ({
	position: 'absolute',
	color: theme.palette.white,
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	margin: 'auto',
	filter: 'drop-shadow(0px 0px 6px #FC7400)',
}))
const LeftTextBox = styled(Box )(({ theme }) => ({
	position: 'absolute',
	width: 90,
	height: 30,
	color: theme.palette.white,
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	margin: 'auto',
	display: 'flex',
	alignItems: 'flex-end',
}))
const LeftText1 = styled(Typography )(({ theme }) => ({
	lineHeight: '22px',
	fontSize: '18px',
	textAlign: 'bottom',
}))
const LeftText2 = styled(Typography )(({ theme }) => ({
	lineHeight: '30px',
	fontSize: '25px',
	textAlign: 'bottom',
}))
const RightContainer = styled(Box)(({ theme }) => ({
	position: 'relative',
	backgroundColor: theme.palette.black,
	width: 600,
	height: 316,
	margin: 0,
	padding: 0,
}))
const ColumnMore = styled(Button)(({ theme }) => ({
	background: 'linear-gradient(#FFCC21,#FF963C)',
	color: theme.palette.tag.text,
	width:296,
	height:56,
	fontSize: '18px',
	lineHeight: '25px',
	margin: 16,
}))
const InputBox = styled(Box)(({ theme }) => ({
	width: 134,
	height: 134,
	margin: 0,

}))
const ColumnGrid = styled(Grid)(({ theme }) => ({
	margin: 8,
}))
const ColumnCard = styled(Card)(({ theme }) => ({
	width: 234,
	borderRadius: 0,
	boxShadow: 'none',
}))
const ColumnDate = styled(Typography)(({ theme }) => ({
	backgroundColor: theme.palette.tag.label,
	color: theme.palette.tag.text,
	bottom:0,
	left:0,
	padding: '0 8px',
	position: 'absolute',
	fontSize: '15px',
	lineHeight: '24px',
}))

export default function ViewPersonal() {
	const [loginInfo, ]	= useAtom(LoginInfo);

	const commands = [
		{ "image": "./assets/mornig.png"} ,
		{ "image": "./assets/lunch.png"},
		{ "image": "./assets/dinner.png"},
		{ "image": "./assets/snack.png"}
	]
	const inputs =[];
	commands.forEach((v,id) => {
		inputs.push(
			<Grid item key={id} >
				<Button>
					<InputBox component="img" src={v.image} />
				</Button>
			</Grid>
		)
	})

	const columns =[];
	loginInfo.history.forEach((v,id) => {
		columns.push(
			<ColumnGrid key={id} item>
			    <ColumnCard>
					<CardMedia
						sx={{ width: 234,height: 234, position:'relative'}}
						image={v.image}
					>
						<ColumnDate>{moment(v.date,"YYYY/MM/DD").format('MM.DD')+" "+v.text}</ColumnDate>
					</CardMedia>
				</ColumnCard>
			</ColumnGrid>
		);
	});

	return (
		<div>
			<ViewCenter>
				<ViewTopContainer>
					<LeftContainer>
						<LeftBox component="img" src={loginInfo.status.image} />
						<LeftProgress size={181} thickness={1} variant="determinate" value={loginInfo.status.progress} />
						<LeftTextBox><LeftText1>{moment(loginInfo.status.date,"YYYY/MM/DD").format('MM/DD')}</LeftText1><LeftText2>{loginInfo.status.progress}％</LeftText2></LeftTextBox>
					</LeftContainer>
					<RightContainer>
						<LineChart
							width={600}
							height={300}
							data={loginInfo.graph}
							margin={{ left:20,top: 20,right:20,bottom:0}}
						>
							<CartesianGrid horizontal={false} />
							<XAxis dataKey="date" tick={{ fill: 'white' }} axisLine={false} tickLine={false} />
							<Line type="linear" dataKey="y1" stroke="#FFCC21" strokeWidth={3}/>
							<Line type="linear" dataKey="y2" stroke="#8FE9D0" strokeWidth={3}/>
						</LineChart>
					</RightContainer>
				</ViewTopContainer>
				<ViewContainer sx={{width:800, marginTop:'16px'}}>
					<Grid container columns={4} columnSpacing={'64px'}>
						{inputs}
					</Grid>
				</ViewContainer>
				<Box sx={{display:'flex'}}>
					<Box sx={{width:48,height:48}}/>
					<Grid container columns={4} sx={{marginTop:'8px',width:1000}}>
						{columns}
					</Grid>
					<Box component="img" sx={{width:48,height:48,marginLefy:'16px',marginTop:'234px'}} src={"./assets/scroll.png"}/>
				</Box>
				<ColumnMore>記録をもっと見る</ColumnMore>
			</ViewCenter>
		</div>
	)
}
