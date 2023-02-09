import   React		  from "react";
import { useState	} from 'react';
import { useEffect	} from 'react';

import { Container	 	} from "@mui/material"
import { Box		 	} from "@mui/material"
import { Button		 	} from "@mui/material"
import { Divider		} from '@mui/material';
import { Grid			} from "@mui/material"
import { Card			} from "@mui/material"
import { CardActions	} from "@mui/material"
import { CardContent	} from "@mui/material"
import { CardMedia		} from "@mui/material"
import { Typography		} from "@mui/material"
import { styled			} from "@mui/material/styles"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend  } from 'recharts';

import { useAtom	} from "jotai"
import { ViewID		} from "./Store"
import moment from "moment";

const ViewContainer = styled(Box)(({ theme }) => ({
	marginTop: 72,
}))
const TagGrid = styled(Grid)(({ theme }) => ({
	width: 288,
	height: 288,
	padding: 24,
	margin: '0 24px',
	background: theme.palette.tag.label,
}))
const TagContainer = styled(Container)(({ theme }) => ({
	width: 240,
	height: 240,
	textAlign: 'center',
	verticalAlign: 'middle',
	display: 'table-cell',
	background: theme.palette.tag.container,
}))
const TagText = styled(Box)(({ theme }) => ({
	color: theme.palette.tag.label,
	fontSize: '25px',
	lineHeight: '30px',
}))
const TagLabel = styled(Box)(({ theme }) => ({
	color: theme.palette.white,
	background: theme.palette.column.tag,
	fontSize: '14px',
	lineHeight: '20px',
	display: 'inline-block',
	padding: '0 8px',
}))
const GraphContainer = styled(Box)(({ theme }) => ({
	position: 'relative',
	backgroundColor: theme.palette.black,
	width: 960,
	height: 420,
	margin: '56px 0 0 0',
	padding: 0,
}))
const GraphButton = styled(Button)(({ theme }) => ({
	color: theme.palette.column.tag,
	backgroundColor: theme.palette.white,
	margin: '16px  0 0 16px',
	width: 54,
	height: 24,
	borderRadius: 24,
}))


const TagDivider = styled(Divider)(({ theme }) => ({
	margin: 'auto',
	width: 56,
	borderWidth: 1,
	borderColor: '#FFFFFF',
	opacity: '0.3'
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
const ColumnText = styled(Typography)(({ theme }) => ({
	height: 48,
	marginTop: 8,
	fontSize: '15px',
	lineHeight: '22px',
}))
const ColumnTag = styled(Button)(({ theme }) => ({
	color: theme.palette.column.tag,
	height: 24,
	fontSize: '12px',
	lineHeight: '22px',
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
const ViewCenter = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}))

export default function ViewHistory() {
	const [ initialized	, setInitialized	] = useState(false);
	const [ content		, setContent		] = useState(undefined);

	useEffect(() => {
		if(!initialized) {
			fetch("./api/history.json")
			.then(response => response.json())
			.then(json => {
				setContent(json);
			});
			setInitialized(true);
		}
	},[initialized]);

	if(content === undefined){
		return null;
	}

	const commands = [
		{ "text":"BODY RECORD"	, "label":"自分のカラダの記録"	, "image": "./assets/MyRecommend-1.png"},
		{ "text":"MY EXERCISE"	, "label":"自分の運動の記録"	, "image": "./assets/MyRecommend-2.png"},
		{ "text":"MY DIARY"		, "label":"自分の日記"			, "image": "./assets/MyRecommend-3.png"}
	]
	const tags =[];
	commands.forEach((v,id) => {
		tags.push(
			<TagGrid key={id} item>
				<TagContainer>
					<TagText>{v.text}</TagText>
					<TagLabel>{v.label}</TagLabel>
				</TagContainer>
			</TagGrid>
		);
	});

	return (
		<ViewCenter>
			<ViewContainer >
				<Grid container columns={3} >
					{tags}
				</Grid>
			</ViewContainer>
			<GraphContainer >
				<Box sx={{display:'flex'}}>
					<Box sx={{margin:'16px 0 0 36px'}}>
						<Typography sx={{color:'white'}}>BODY</Typography>
						<Typography sx={{color:'white'}}>RECORD</Typography>
					</Box>
					<Typography sx={{color:'white',fontSize:'22px',margin:'8px 0 0 36px'}}>{moment(content.status.date,"YYYY/MM/DD").format("YYYY.MM.DD")}</Typography>
				</Box>
				<LineChart
					width={900}
					height={300}
					data={content.graph}
					margin={{ left:80,top: 20,right:20,bottom:0}}
				>
					<CartesianGrid horizontal={false} />
					<XAxis dataKey="date" tick={{ fill: 'white' }} axisLine={false} tickLine={false} />
					<Line type="linear" dataKey="y1" stroke="#FFCC21" strokeWidth={3}/>
					<Line type="linear" dataKey="y2" stroke="#8FE9D0" strokeWidth={3}/>
				</LineChart>
				<Box sx={{display:'flex'}}>
					<GraphButton>日</GraphButton>
					<GraphButton>週</GraphButton>
					<GraphButton>月</GraphButton>
					<GraphButton>年</GraphButton>
				</Box>
			</GraphContainer>
			<ViewContainer >

				<Grid container columns={4} sx={{marginTop:'8px',width:1000}}>
				</Grid>
				<ColumnMore>コラムをもっと見る</ColumnMore>
			</ViewContainer>
		</ViewCenter>
	)
}
