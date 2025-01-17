/*
 Copyright 2022 The Matrix.org Foundation C.I.C.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import React from "react";

import TextWithTooltip from "./TextWithTooltip";

interface IProps extends Omit<React.ComponentProps<typeof TextWithTooltip>, "tabIndex" | "onClick"> {}

export default class LinkWithTooltip extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { children, tooltip, ...props } = this.props;

        return (
            <TextWithTooltip
                // Disable focusing on the tooltip target to avoid double / nested focus. The contained anchor element
                // itself allows focusing which also triggers the tooltip.
                tabIndex={-1}
                tooltip={tooltip}
                onClick={(e) => (e.target as HTMLElement).blur()} // Force tooltip to hide on clickout
                {...props}
            >
                {children}
            </TextWithTooltip>
        );
    }
}
