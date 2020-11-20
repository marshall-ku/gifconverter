import React, { useState, useEffect } from "react";
import FilePicker from "./FilePicker";
import DisplayProgress from "./DisplayProgress";
import DisplayOutput from "./DisplayOutput";
import ResetButton from "./ResetButton";
import Loader from "./Loader";
import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import "./App.css";
import DownloadButton from "./DownloadButton";

declare global {
    interface Window {
        ratio: number;
        displayProgress: React.Component;
    }
}

const ffmpeg: FFmpeg = createFFmpeg({ log: true, progress: progressRatio });

function progressRatio(status: { ratio: number }) {
    window.displayProgress.setState({
        ratio: status.ratio,
    });
}

interface AppProps {}

function App({}: AppProps) {
    const [ready, setReady] = useState<boolean>(false);
    const [input, setInput] = useState<{
        file: File;
        type: string;
    }>();
    const [output, setOutput] = useState<string>("");

    const load = async () => {
        await ffmpeg.load();
        setReady(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        if (files !== null && files[0]) {
            const file = files[0];
            const { type } = file;

            if (type === "image/gif" || type === "video/mp4") {
                setInput({
                    file: files[0],
                    type,
                });
            }
        }
    };

    const convertFile = async () => {
        if (input === undefined) return;
        const { file, type } = input;

        if (type === "image/gif") {
            // convert gif to mp4

            ffmpeg.FS("writeFile", "input.gif", await fetchFile(file));
            await ffmpeg.run(
                "-f",
                "gif",
                "-i",
                "input.gif",
                "-movflags",
                "+faststart",
                "-pix_fmt",
                "yuv420p",
                "-vf",
                "scale=trunc(iw/2)*2:trunc(ih/2)*2",
                "output.mp4"
            );

            const data = ffmpeg.FS("readFile", "output.mp4");

            const url = URL.createObjectURL(
                new Blob([data.buffer], { type: "video/mp4" })
            );

            setOutput(url);
        } else {
            // convert mp4 to gif

            ffmpeg.FS("writeFile", "input.mp4", await fetchFile(file));
            await ffmpeg.run(
                "-f",
                "mp4",
                "-i",
                "input.mp4",
                "-t",
                "3",
                "-ss",
                "0.5",
                "-filter_complex",
                "[0:v] split [a][b];[a] palettegen [p];[b][p] paletteuse",
                "output.gif"
            );

            const data = ffmpeg.FS("readFile", "output.gif");

            const url = URL.createObjectURL(
                new Blob([data.buffer], { type: "image/gif" })
            );

            setOutput(url);
        }
    };

    const reset = () => {
        setInput(undefined);
        setOutput("");
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        convertFile();
    }, [input]);

    return (
        <>
            {ready ? (
                <>
                    {input ? (
                        output ? (
                            <>
                                <DisplayOutput
                                    outputUrl={output}
                                    type={input.type}
                                />
                                <div className="output__control">
                                    <DownloadButton outputUrl={output} />
                                    <ResetButton reset={reset} />
                                </div>
                            </>
                        ) : (
                            <DisplayProgress />
                        )
                    ) : (
                        <FilePicker handleChange={handleChange} />
                    )}
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}

export default App;
