import React from "react"

import { Button		} from "@mui/material"
import { Container	} from "@mui/material"
import { Typography	} from "@mui/material"
import { styled		} from "@mui/material/styles"


const ViewContent = styled('div')(({ theme }) => ({
	background: theme.palette.background,
	width: '100%',
	height: 128,
}))
const ViewContainer = styled(Container)(({ theme }) => ({
	height: '100%',
	display: 'table',
}))
const ViewInner = styled('div')(({ theme }) => ({
	display: 'table-cell',
	verticalAlign: 'middle',
}))
const ViewItem = styled(Button)(({ theme }) => ({
	marginLeft: 45,
}))
const ViewText = styled(Typography)(({ theme }) => ({
	color: theme.palette.white,
	fontSize: '11px',
}))

export default function AppViewBottom() {
	return (
		<ViewContent>
			<ViewContainer>
				<ViewInner>
					<ViewItem><ViewText>会員登録</ViewText></ViewItem>
					<ViewItem><ViewText>運営会社</ViewText></ViewItem>
					<ViewItem><ViewText>利用規約</ViewText></ViewItem>
					<ViewItem><ViewText>個人情報の取扱について</ViewText></ViewItem>
					<ViewItem><ViewText>特定商取引法に基づく表記</ViewText></ViewItem>
					<ViewItem><ViewText>お問い合わせ</ViewText></ViewItem>
				</ViewInner>
			</ViewContainer>
		</ViewContent>
	)
}
