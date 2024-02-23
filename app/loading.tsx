import { BounceLoader } from "react-spinners";

const Loading = () => {
    return(
        <div className="flex items-center justify-center h-screen w-full">
            <p className="flex items-center gap-2">
                <BounceLoader
                    color="rgb(244 63 94)"
                />
            </p>
        </div>
    )
}

export default Loading;