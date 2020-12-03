import React from "react";
import Loader from "./Loader";
import "./ConvertOptions.css";

class OptionInput extends React.Component<OptionInputProps, { value: string }> {
    constructor(props: OptionInputProps) {
        super(props);
        this.state = {
            value: this.props.value,
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        this.setState({
            value: value,
        });

        this.props.onUpdate(this.props.option, value);
    };

    handleClick = () => {
        const { video } = this.props;

        if (video) {
            const { currentTime } = video;

            this.setState({
                value: `${currentTime}`,
            });
            this.props.onUpdate(this.props.option, `${currentTime}`);
        }
    };

    render() {
        const { video } = this.props;
        return (
            <div>
                <input
                    type="number"
                    min={this.props.min}
                    max={this.props.max ? this.props.max : ""}
                    value={this.state.value}
                    onChange={this.handleChange}
                    step={`${this.props.option.includes("Time") ? 0.01 : 1}`}
                />
                {!!video && (
                    <button onClick={this.handleClick} title="Current Time">
                        <svg viewBox="0 0 256 256">
                            <circle
                                cx="128"
                                cy="128"
                                r="96"
                                fill="none"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                            />
                            <polyline
                                points="128 72 128 128 184 128"
                                fill="none"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                            />
                        </svg>
                    </button>
                )}
            </div>
        );
    }
}

export default class ConvertOptions extends React.Component<
    ConvertOptionsProps,
    { video: HTMLVideoElement | null }
> {
    options: GifOption;
    constructor(props: ConvertOptionsProps) {
        super(props);

        const { gifOption } = this.props;

        this.options = {
            startTime: gifOption.startTime,
            endTime: gifOption.endTime,
            fps: gifOption.fps,
            scale: gifOption.scale,
        };

        this.state = {
            video: null,
        };
    }

    handleVideoLoad = (
        event: React.SyntheticEvent<HTMLVideoElement, Event>
    ) => {
        if (this.state.video) return;
        const video = event.target as HTMLVideoElement;

        this.options.endTime = `${video.duration}`;
        this.options.scale = `${video.offsetWidth}`;

        this.setState({
            video: video,
        });
    };

    updateOption = (option: optionNames, value: string) => {
        this.options[option] = value;
    };

    convert = () => {
        const { startTime, endTime, scale, fps } = this.options;

        if (startTime >= endTime || endTime === "0") return;

        this.props.setGifOption({
            startTime: startTime,
            endTime: endTime,
            fps: fps,
            scale: scale,
        });

        setTimeout(() => {
            this.props.preConvert(true);
            this.props.convert();
        }, 0);
    };

    render() {
        const { startTime, endTime, fps, scale } = this.options;
        const { video } = this.state;

        return (
            <>
                {!!this.state.video || <Loader />}
                <div className={`${this.state.video ? "loaded " : ""}option`}>
                    <div className="option__preview">
                        <video
                            src={URL.createObjectURL(this.props.input)}
                            onLoadedMetadata={this.handleVideoLoad}
                            autoPlay
                            playsInline
                            muted
                            loop
                            controls
                        ></video>
                    </div>
                    {!!video && (
                        <>
                            <div className="option__input">
                                <div className="title">Start</div>
                                <OptionInput
                                    value={startTime}
                                    min="0"
                                    max={endTime}
                                    option="startTime"
                                    onUpdate={this.updateOption}
                                    video={video}
                                />
                            </div>
                            <div className="option__input">
                                <div className="title">End</div>
                                <OptionInput
                                    value={endTime}
                                    min="0"
                                    max={endTime}
                                    option="endTime"
                                    onUpdate={this.updateOption}
                                    video={video}
                                />
                            </div>
                            <div className="option__input">
                                <div className="title">FPS</div>
                                <OptionInput
                                    min="1"
                                    value={fps}
                                    option="fps"
                                    onUpdate={this.updateOption}
                                />
                            </div>
                            <div className="option__input">
                                <div className="title">Size (width)</div>
                                <OptionInput
                                    min="1"
                                    value={scale}
                                    max={scale}
                                    option="scale"
                                    onUpdate={this.updateOption}
                                />
                            </div>
                            <button>
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 256 256"
                                    className="option__convert"
                                    onClick={this.convert}
                                >
                                    <circle
                                        cx="128"
                                        cy="128"
                                        r="96"
                                        fill="none"
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"
                                    />
                                    <polyline
                                        points="134.059 161.941 168 128 134.059 94.059"
                                        fill="none"
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"
                                    />
                                    <line
                                        x1="88"
                                        y1="128"
                                        x2="168"
                                        y2="128"
                                        fill="none"
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </>
        );
    }
}