import React		  from "react"
import { useEffect	} from "react"
import { useRef		} from "react"
import { useState	} from "react"
import { useCallback} from 'react';

import { AppBar		} from "@mui/material"
import { Avatar		} from "@mui/material"
import { Box		} from "@mui/material"
import { Badge		} from "@mui/material"
import { Button		} from "@mui/material"
import { Container	} from "@mui/material"
import { Toolbar	} from "@mui/material"
import { Typography	} from "@mui/material"


import { Popper		} from "@mui/material"
import { Paper	} from "@mui/material"
import { ClickAwayListener	} from "@mui/material"
import { Menu	} from "@mui/material"
import { MenuItem	} from "@mui/material"


import { styled		} from "@mui/material/styles"


const ViewAppBar = styled(AppBar)(({ theme }) => ({
	height: 64,
	background: theme.palette.background,
}))
const IconLogo = styled(Avatar)(({ theme }) => ({
	width: 144,
	height: 64,
}))
const IconNav = styled(Avatar)(({ theme }) => ({
	width: 32,
	height: 32,
}))
const IconBadge = styled(Badge)(({ theme }) => ({
	badge:{
		background: theme.palette.badge,
	}
}))

const TextNav = styled(Typography)(({ theme }) => ({
	color: theme.palette.white,
	margin: 8,
}))

const MenuNav = styled(Menu)(({ theme }) => ({
    '& .MuiList-root': {
		backgroundColor: theme.palette.white,
		'&:active': {
		  backgroundColor: theme.palette.white,
		},
	  },
}))



export default function AppViewBar() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleOpen = useCallback((event) => {
		setAnchorEl(event.currentTarget);
	});

	const handleClose = useCallback((event) => {
		setAnchorEl(null);
	});

	return (
		<ViewAppBar sx={{ with: 1280}}>
			<Container>
				<Toolbar>
					<Box sx={{ flexGrow: 1}}>
						<IconLogo src="./assets/logo.png" />
					</Box>
					<Box>
						<Button sx={{ width: 160 }}>
							<IconNav src="./assets/icon_memo.png" />
							<TextNav>自分の記録</TextNav>
						</Button>
						<Button sx={{ width: 160 }}>
							<IconNav src="./assets/icon_challenge.png" />
							<TextNav>チャレンジ</TextNav>
						</Button>
						<Button sx={{ width: 160 }}>
							<IconBadge badgeContent={1} color="badge" >
								<IconNav src="./assets/icon_info.png" />
							</IconBadge>
							<TextNav>お知らせ</TextNav>
						</Button>
						<Button id="menu-button" onClick={handleOpen}>
							<IconNav src="./assets/icon_menu.png" />
						</Button>
						<MenuNav
							open={Boolean(anchorEl)}
							anchorEl={anchorEl}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'menu-button',
							}}
						>
							<MenuItem sx={{ background: 'white'}} onClick={handleClose}>ログイン</MenuItem>
						</MenuNav>
					</Box>
				</Toolbar>
			</Container>
		</ViewAppBar>
	)
}
