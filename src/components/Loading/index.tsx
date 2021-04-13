import React from "react"
import { Spin, Space } from "antd"

import "./index.less"

export default function SimpleBackdrop() {
	return (
		<div className="loading-container flex horizontal-center">
			<Space size="middle">
				<Spin size="large" />
			</Space>
		</div>
	);
}