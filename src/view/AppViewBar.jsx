import React		  from "react"
import { useState	} from "react"
import { useCallback} from "react"

import { AppBar		} from "@mui/material"
import { Avatar		} from "@mui/material"
import { Box		} from "@mui/material"
import { Badge		} from "@mui/material"
import { Button		} from "@mui/material"
import { Container	} from "@mui/material"
import { Toolbar	} from "@mui/material"
import { Typography	} from "@mui/material"
import { Menu		} from "@mui/material"
import { MenuItem	} from "@mui/material"
import { styled		} from "@mui/material/styles"

import { useAtom	} from "jotai"
import { LoginInfo  } from "./Store"
import { ViewID		} from "./Store"

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

const TextNav = styled(Typography,{ shouldForwardProp: (prop) => prop !== 'active'})(({ active,theme }) => ({
	color: active ? theme.palette.badge.main : theme.palette.white,
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
	const [anchorEl	, setAnchorEl]	 = useState(null);
	const [loginInfo, setLoginInfo]	= useAtom(LoginInfo);
	const [viewID	, setViewID]	= useAtom(ViewID);

	const handleOpen = useCallback((event) => {
		setAnchorEl(event.currentTarget);
	});

	const handleClose = useCallback((event) => {
		setAnchorEl(null);
	});

	const handleLogin = useCallback((event) => {
		if(!loginInfo)
		{
			fetch("./api/login.json")
			.then(response => response.json())
			.then(json => {
				setLoginInfo(json);
				setViewID(1);
			});
		}
		else{
			setLoginInfo(undefined);
			setViewID(0);
		}
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
						<Button sx={{ width: 160 }} onClick={()=>{if(loginInfo){setViewID(2)}}}>
							<IconNav src="./assets/icon_memo.png" />
							<TextNav active={viewID && viewID === 2} >自分の記録</TextNav>
						</Button>
						<Button sx={{ width: 160 }} onClick={()=>{if(loginInfo){setViewID(3)}}}>
							<IconNav src="./assets/icon_challenge.png" />
							<TextNav>チャレンジ</TextNav>
						</Button>
						<Button sx={{ width: 160 }} onClick={()=>{if(loginInfo){setViewID(4)}}}>
							<IconBadge badgeContent={loginInfo ? 1 : 0} color="badge" >
								<IconNav src="./assets/icon_info.png" />
							</IconBadge>
							<TextNav>お知らせ</TextNav>
						</Button>
					</Box>
					<Box>
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
							<MenuItem sx={{ background: 'white'}} onClick={handleLogin}>{(loginInfo)? "ログアウト":"ログイン"}</MenuItem>
						</MenuNav>
					</Box>
				</Toolbar>
			</Container>
		</ViewAppBar>
	)
}
