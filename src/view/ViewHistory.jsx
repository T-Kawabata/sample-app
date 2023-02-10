import   React		  from "react";
import { useState	} from 'react';
import { useEffect	} from 'react';

import { Container	 	} from "@mui/material";
import { Box		 	} from "@mui/material";
import { Button		 	} from "@mui/material";
import { Link			} from "@mui/material";
import { Grid			} from "@mui/material";
import { Card			} from "@mui/material";
import { Typography		} from "@mui/material";
import { styled			} from "@mui/material/styles";

import { LineChart		} from 'recharts';
import { Line			} from 'recharts';
import { XAxis			} from 'recharts';
import { CartesianGrid	} from 'recharts';

import   moment 		  from "moment";

const ViewContainer = styled(Box)(({ theme }) => ({
	marginTop: 72,
}))
const TagGrid = styled(Grid)(({ theme }) => ({
	width: 288,
	height: 288,
	padding: 24,
	margin: "0 24px",
	background: theme.palette.tag.label,
}))
const TagContainer = styled(Container, { shouldForwardProp: (prop) => prop !== "base" })(({ base, theme }) => ({
	width: 240,
	height: 240,
	textAlign: "center",
	verticalAlign: "middle",
	display: "table-cell",
	backgroundBlendMode: "luminosity",
	backgroundImage: "url(./assets/MyRecommend-" + base + ".png)",
	backgroundColor: theme.palette.tag.container,
}))

const TagText = styled(Box)(({ theme }) => ({
	color: theme.palette.tag.label,
	fontSize: "25px",
	lineHeight: "30px",
}))
const TagLabel = styled(Box)(({ theme }) => ({
	color: theme.palette.white,
	background: theme.palette.column.tag,
	fontSize: "14px",
	lineHeight: "20px",
	display: "inline-block",
	padding: "0 8px",
}))
const GraphContainer = styled(Box)(({ theme }) => ({
	position: "relative",
	backgroundColor: theme.palette.black,
	width: 960,
	height: 420,
	margin: "56px 0 0 0",
	padding: 0,
}))
const GraphButton = styled(Button, { shouldForwardProp: (prop) => prop !== "active" })(({ active, theme }) => ({
	color: active ? theme.palette.white : theme.palette.column.tag,
	backgroundColor: active ? theme.palette.column.tag : theme.palette.white,
	margin: "16px  0 0 16px",
	width: 54,
	height: 24,
	borderRadius: 24,
}))
const ListContainer = styled(Box)(({ theme }) => ({
	position: "relative",
	backgroundColor: theme.palette.black,
	width: 960,
	height: 280,
	margin: "56px 0 0 0",
	padding: 0,
}))

const ListGridContainer = styled(Box)(({ theme }) => ({
	height: 200,
	width: 930,
	overflow: "auto",
	"::-webkit-scrollbar": {
		width: "6px",
	},
	"::-webkit-scrollbar-track": {
		borderRadius: "6px",
		backgroundColor: "#777777",
	},

	"::-webkit-scrollbar-thumb": {
		borderRadius: "6px",
		backgroundColor: "#FFCC21",
	},
}))

const ListGrid = styled(Grid)(({ theme }) => ({
	width: 880,
	margin: "0 0 0 24px",
}))
const ListGridColumn = styled(Grid)(({ theme }) => ({
	width: 390,
	margin: "8px 40px 0 0",
	borderBottom: "1px solid #777777",
}))
const ListGridColumnText1 = styled(Typography)(({ theme }) => ({
	color: theme.palette.white,
	fontSize: "15px",
	lineHeight: "22px",
}))
const ListGridColumnText2 = styled(Typography)(({ theme }) => ({
	color: theme.palette.tag.label,
	fontSize: "15px",
	lineHeight: "18px",
}))
const ListGridColumnText3 = styled(Typography)(({ theme }) => ({
	color: theme.palette.tag.label,
	fontSize: "18px",
	lineHeight: "22px",
}))
const DiaryContainer = styled(Box)(({ theme }) => ({
	marginTop: "56px",
	width: 960,
}))
const ColumnGrid = styled(Grid)(({ theme }) => ({}))
const ColumnCard = styled(Card)(({ theme }) => ({
	width: 230,
	height: 230,
	border: "1px solid",
	borderRadius: 0,
	boxShadow: "none",
	padding: "16px",
}))
const ColumnText1 = styled(Typography)(({ theme }) => ({
	color: theme.palette.black,
	fontSize: "18px",
	lineHeight: "22px",
}))
const ColumnText2 = styled(Typography)(({ theme }) => ({
	color: theme.palette.black,
	fontSize: "12px",
	lineHeight: "17px",
}))

const ColumnMore = styled(Button)(({ theme }) => ({
	background: "linear-gradient(#FFCC21,#FF963C)",
	color: theme.palette.tag.text,
	width: 296,
	height: 56,
	fontSize: "18px",
	lineHeight: "25px",
	margin: 16,
}))
const ViewCenter = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
}))

export default function ViewHistory() {
	const [initialized, setInitialized] = useState(false)
	const [content, setContent] = useState(undefined)

	useEffect(() => {
		if (!initialized) {
			fetch("./api/history.json")
				.then((response) => response.json())
				.then((json) => {
					setContent(json)
				})
			setInitialized(true)
		}
	}, [initialized])

	if (content === undefined) {
		return null
	}

	const commands = [
		{ text: "BODY RECORD", label: "自分のカラダの記録", link: "#RECORD" },
		{ text: "MY EXERCISE", label: "自分の運動の記録", link: "#EXERCISE" },
		{ text: "MY DIARY", label: "自分の日記", link: "#DIARY" },
	]
	const tags = []
	commands.forEach((v, id) => {
		tags.push(
			<TagGrid key={id} item>
				<Link href={v.link}>
					<TagContainer base={id}>
						<TagText>{v.text}</TagText>
						<TagLabel>{v.label}</TagLabel>
					</TagContainer>
				</Link>
			</TagGrid>
		)
	})

	const history = []
	content.history.forEach((v, id) => {
		history.push(
			<ListGridColumn item key={id} xs={1}>
				<Box sx={{ display: "flex", color: "white" }}>
					<ListGridColumnText1>・</ListGridColumnText1>
					<Box sx={{ flexGrow: 1 }}>
						<ListGridColumnText1>{v.text}</ListGridColumnText1>
						<ListGridColumnText2>{v.cal}</ListGridColumnText2>
					</Box>
					<ListGridColumnText3>{v.time}</ListGridColumnText3>
				</Box>
			</ListGridColumn>
		)
	})

	const diary = []
	content.diary.forEach((v, id) => {
		diary.push(
			<ColumnGrid item key={id}>
				<ColumnCard>
					<ColumnText1>{moment(v.date, "YYYY/MM/DD hh:mm").format("YYYY/MM/DD")}</ColumnText1>
					<ColumnText1>{moment(v.date, "YYYY/MM/DD hh:mm").format("hh:mm")}</ColumnText1>
					<ColumnText2 sx={{ marginTop: "12px" }}>{v.text1}</ColumnText2>
					<ColumnText2>{v.text2}</ColumnText2>
				</ColumnCard>
			</ColumnGrid>
		)
	})

	return (
		<ViewCenter>
			<ViewContainer>
				<Grid container columns={3}>
					{tags}
				</Grid>
			</ViewContainer>
			<GraphContainer id={"RECORD"}>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ margin: "16px 0 0 36px" }}>
						<Typography sx={{ color: "white" }}>BODY</Typography>
						<Typography sx={{ color: "white" }}>RECORD</Typography>
					</Box>
					<Typography sx={{ color: "white", fontSize: "22px", margin: "8px 0 0 36px" }}>
						{moment(content.status.date, "YYYY/MM/DD").format("YYYY.MM.DD")}
					</Typography>
				</Box>
				<LineChart width={900} height={300} data={content.graph} margin={{ left: 80, top: 20, right: 20, bottom: 0 }}>
					<CartesianGrid horizontal={false} />
					<XAxis dataKey="date" tick={{ fill: "white" }} axisLine={false} tickLine={false} />
					<Line type="linear" dataKey="y1" stroke="#FFCC21" strokeWidth={3} />
					<Line type="linear" dataKey="y2" stroke="#8FE9D0" strokeWidth={3} />
				</LineChart>
				<Box sx={{ display: "flex" }}>
					<GraphButton>日</GraphButton>
					<GraphButton>週</GraphButton>
					<GraphButton>月</GraphButton>
					<GraphButton active={true}>年</GraphButton>
				</Box>
			</GraphContainer>
			<ListContainer id={"EXERCISE"}>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ margin: "16px 0 0 36px" }}>
						<Typography sx={{ color: "white" }}>MY</Typography>
						<Typography sx={{ color: "white" }}>EXERCISE</Typography>
					</Box>
					<Typography sx={{ color: "white", fontSize: "22px", margin: "8px 0 0 36px" }}>
						{moment(content.status.date, "YYYY/MM/DD").format("YYYY.MM.DD")}
					</Typography>
				</Box>
				<ListGridContainer>
					<ListGrid container columns={2}>
						{history}
					</ListGrid>
				</ListGridContainer>
			</ListContainer>
			<DiaryContainer id={"DIARY"}>
				<Typography sx={{ fontSize: "22px", height: 33 }}>MY DIARY</Typography>
				<Grid container columns={4} sx={{ width: 1000 }} spacing={"12px"}>
					{diary}
				</Grid>
			</DiaryContainer>
			<ColumnMore>自分の日記をもっと見る</ColumnMore>
		</ViewCenter>
	)
}
