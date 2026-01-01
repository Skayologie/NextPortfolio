"use client";

import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
    const init = async (engine: any) => {
        await loadFull(engine);
    };

    return (
        <Particles
            id="tsparticles"
            init={init}
            className="absolute inset-0 -z-10"
            options={{
                background: {
                    color: "transparent",
                },
                particles: {
                    number: {
                        value: 80,
                        density: { enable: true, area: 800 },
                    },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: {
                        value: 0.6,
                    },
                    size: {
                        value: 2,
                        random: true,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        outModes: "out",
                    },
                    links: {
                        enable: true,
                        color: "#ffffff",
                        opacity: 0.4,
                        distance: 130,
                    },
                },
                fullScreen: false,
            }}
        />
    );
}
