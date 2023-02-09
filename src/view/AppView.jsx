import React from "react"

import { AppViewBar		} from "."
import { ViewColumn		} from "."
import { ViewPersonal	} from "."
import { AppViewBottom	} from "."

import { useAtom	} from "jotai"
import { LoginInfo  } from "./Store"
import { ViewID		} from "./Store"

export default function AppView() {
	const [loginInfo, ]	= useAtom(LoginInfo);
	const [viewID	, ]	= useAtom(ViewID);

	return (
		<div>
			<AppViewBar />
			{ (loginInfo === undefined) &&
				<ViewColumn/>
			}
			{ (loginInfo !== undefined && viewID === 1) &&
				<ViewPersonal/>
			}
			{ (viewID !== undefined) &&
				<AppViewBottom/>
			}
		</div>
	)
}
