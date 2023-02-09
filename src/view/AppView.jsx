import React from "react"

import { AppViewBar		} from "."
import { ViewColumn		} from "."
import { ViewPersonal	} from "."
import { ViewHistory	} from "."
import { AppViewBottom	} from "."

import { useAtom	} from "jotai"
import { LoginInfo  } from "./Store"
import { ViewID		} from "./Store"

export default function AppView() {
	const [loginInfo, ]	= useAtom(LoginInfo);
	const [viewID	, ]	= useAtom(ViewID);

	let content = null;
	let fotter = null;

	if(loginInfo === undefined)
	{
		content = (<ViewColumn/>)
	}
	else{
		if(viewID === 1)
		{
			content = (<ViewPersonal/>)
		}
		else if(viewID === 2)
		{
			content = (<ViewHistory/>)
		}
	}

	if(viewID !== undefined)
	{
		fotter = (<AppViewBottom/>)
	}

	return (
		<div>
			<AppViewBar />
			{ content }
			{ fotter }
		</div>
	)
}
