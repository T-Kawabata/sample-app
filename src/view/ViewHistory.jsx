import   React		  from "react";
import { useState	} from 'react';
import { useEffect	} from 'react';

import { Container	 	} from "@mui/material"
import { Button		 	} from "@mui/material"
import { Divider		} from '@mui/material';
import { Grid			} from "@mui/material"
import { Card			} from "@mui/material"
import { CardActions	} from "@mui/material"
import { CardContent	} from "@mui/material"
import { CardMedia		} from "@mui/material"
import { Typography		} from "@mui/material"
import { styled			} from "@mui/material/styles"

import { useAtom	} from "jotai"
import { ViewID		} from "./Store"

const ViewContainer = styled(Container)(({ theme }) => ({
	marginTop: 72,
}))
const TagGrid = styled(Grid)(({ theme }) => ({
	margin: 8,
}))
const TagContainer = styled(Container)(({ theme }) => ({
	width: 264,
	height: 144,
	textAlign: 'center',
	verticalAlign: 'middle',
	display: 'table-cell',
	background: theme.palette.tag.container,
}))
const TagLabel = styled(Typography)(({ theme }) => ({
	color: theme.palette.tag.label,
	lineHeight: '27px',
}))
const TagDivider = styled(Divider)(({ theme }) => ({
	margin: 'auto',
	width: 56,
	borderWidth: 1,
	borderColor: '#FFFFFF',
	opacity: '0.3'
}))
const TagText = styled(Typography)(({ theme }) => ({
	color: theme.palette.tag.text,
	lineHeight: '26px',
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
	const [ viewID		, setViewID			] = useAtom(ViewID);

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

	const tags =[];
	content.tags.forEach((v,id) => {
		tags.push(
			<TagGrid key={id} item>
				<TagContainer>
					<TagLabel>{v.label_1}</TagLabel>
					<TagLabel>{v.label_2}</TagLabel>
					<TagDivider/>
					<TagText>{v.text}</TagText>
				</TagContainer>
			</TagGrid>
		);
	});
	const columns =[];
	content.columns.forEach((v,id) => {
		const columnTags =[];
		v.tags.forEach((x,xid) => {
			columnTags.push(<ColumnTag key={xid} size="small">{x}</ColumnTag>);
		})

		columns.push(
			<ColumnGrid key={id} item>
			    <ColumnCard>
					<CardMedia
						sx={{ width: 234,height: 144, position:'relative'}}
						image={v.image}
					>
						<ColumnDate>{v.date}</ColumnDate>
					</CardMedia>
					<CardContent sx={{padding:0}}>
						<ColumnText>{v.text}</ColumnText>
					</CardContent>
					<CardActions disableSpacing sx={{padding:0}}>
						{columnTags}
					</CardActions>
				</ColumnCard>
			</ColumnGrid>
		);
	});



	return (
		<ViewContainer>
			<ViewCenter>
				<Grid container columns={4} sx={{width:1120}}>
					{tags}
				</Grid>
				<Grid container columns={4} sx={{marginTop:'8px',width:1000}}>
					{columns}
				</Grid>
				<ColumnMore>コラムをもっと見る</ColumnMore>
			</ViewCenter>
		</ViewContainer>
	)
}
