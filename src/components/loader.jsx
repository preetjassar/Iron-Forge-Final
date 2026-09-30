import { useEffect, useState } from "react";
import { Dumbbell } from "lucide-react";

const Loader = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);

                    setTimeout(() => {
                        onFinish();
                    }, 400);

                    return 100;
                }

                return prev + 2;
            });
        }, 35);

        return () => clearInterval(interval);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">

            {/* Background Glow */}
            <div className="absolute w-[450px] h-[450px] bg-orange-500/10 blur-[140px] rounded-full" />

            <div className="relative flex flex-col items-center">

                {/* Logo */}
                <div className="relative flex items-center justify-center">

                    <div className="absolute w-28 h-28 border border-orange-500/30 rounded-full animate-spin" />

                    <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg flex items-center justify-center shadow-xl">
                        <Dumbbell
                            size={36}
                            className="text-orange-500"
                        />
                    </div>

                </div>

                {/* Brand */}
                <h1 className="mt-8 text-4xl md:text-5xl font-black tracking-[6px]">
                    <span className="text-white">IRON </span>
                    <span className="text-orange-500">FORGE</span>
                </h1>

                <p className="mt-2 text-sm uppercase tracking-[5px] text-gray-500">
                    Forging Strength
                </p>

                {/* Progress */}
                <div className="mt-10 w-72">

                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Loading</span>
                        <span>{progress}%</span>
                    </div>

                    <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-orange-500 transition-all duration-300 rounded-full"
                            style={{ width: `${progress}%` }}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Loader;