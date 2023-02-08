import React from "react"

import { AppBar } from "@mui/material"
import { Avatar } from "@mui/material"
import { Box } from "@mui/material"
import { Button } from "@mui/material"
import { Container } from "@mui/material"
import { Toolbar } from "@mui/material"
import { Typography } from "@mui/material"
import { Paper } from "@mui/material"
import { styled } from "@mui/material/styles"

import { AppViewBar	} from "."
import { ViewColumn } from "."

const ViewTopContainer = styled(Box)(({ theme }) => ({
	marginTop: 64,
	display: 'flex',
	flex: 'nowrap',
}))
const ViewContainer = styled(Container)(({ theme }) => ({
}))

export default function ViewPersonal() {
	return (
		<div>
			<ViewTopContainer>
				<Container>
					<div>aaa</div>
				</Container>
				<Container>
					<div>aaa</div>
				</Container>
			</ViewTopContainer>
		</div>
	)
}
