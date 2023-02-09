import React			  from 'react';

import { CssBaseline	} from '@mui/material';
import { createTheme	} from '@mui/material/styles';
import { ThemeProvider	} from '@mui/material/styles';
import { common			} from '@mui/material/colors';

import { AppView		} from './view'

const theme = createTheme({
	palette: {
		background: '#414141',
		black: common.black,
		white: common.white,
		badge: {
			main: '#EA6C00',
			contrastText: common.white,
		},
		tag: {
			container: '#2E2E2E',
			label: '#FFCC21',
			text: common.white,
		},
		column: {
			tag: '#FF963C',
		}
	},
});

export default function App() {
  return (
	<ThemeProvider theme={theme}>
		<CssBaseline/>
		<AppView/>
	</ThemeProvider>
  )
}
