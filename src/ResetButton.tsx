import React from "react";
import "./ResetButton.css";

interface ResetButtonProps {
    reset: () => void;
}

export default class ResetButton extends React.Component<ResetButtonProps> {
    constructor(props: ResetButtonProps) {
        super(props);
    }

    render() {
        return (
            <button
                className="output__control__reset button"
                onClick={this.props.reset}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="1.2rem"
                    height="1.2rem"
                >
                    <rect width="256" height="256" fill="none" />
                    <polyline
                        points="176.167 99.716 224.167 99.716 224.167 51.716"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                    />
                    <path
                        d="M190.2254,190.2254a88,88,0,1,1,0-124.4508l33.94112,33.94113"
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                    />
                </svg>
                Try another
            </button>
        );
    }
}
