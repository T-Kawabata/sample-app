import   React		  from "react";
import { useState	} from 'react';
import { useEffect	} from 'react';

import { Container	 	} from "@mui/material"
import { Divider		} from '@mui/material';
import { Grid			} from "@mui/material"
import { Card			} from "@mui/material"
import { CardContent	} from "@mui/material"
import { CardMedia		} from "@mui/material"
import { Typography		} from "@mui/material"
import { styled			} from "@mui/material/styles"

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
}))
const ColumnText = styled(Typography)(({ theme }) => ({
	height: 48,
	marginTop: 8,
	fontSize: '15px',
	lineHeight: '22px',
}))
const ColumnTag = styled(Typography)(({ theme }) => ({
	color: theme.palette.column.tag,
	height: 24,
	marginTop: 8,
	fontSize: '12px',
	lineHeight: '22px',
}))
const ViewCenter = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}))

export default function ViewColumn() {
	const [ initialized	, setInitialized	] = useState(false);
	const [ content		, setContent		] = useState(undefined);

	useEffect(() => {
		if(!initialized) {
			fetch("./api/column.json")
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

	console.log(content);

	const tags =[];
	content.tags.forEach(v => {
		tags.push(
			<TagGrid item>
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
	content.columns.forEach(v => {
		const columnTags =[];
		v.tags.forEach(x => {
			columnTags.push(x+" ");
		})

		columns.push(
			<ColumnGrid item>
			    <ColumnCard>
					<CardMedia
						sx={{ width: 234,height: 144 }}
						image={v.image}
					/>
					<CardContent sx={{padding:0}}>
						<ColumnText>{v.text}</ColumnText>
						<ColumnTag>{columnTags}</ColumnTag>
					</CardContent>
				</ColumnCard>

				<Container sx={{width:234}}></Container>
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
			</ViewCenter>
		</ViewContainer>
	)
}
