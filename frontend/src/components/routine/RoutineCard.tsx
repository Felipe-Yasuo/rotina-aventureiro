"use client";

import { Routine } from "@/modules/routine/types/RoutineTypes";
import { cn } from "@/lib/utils";

export function RoutineCard({
    routine,
    onComplete,
}: {
    routine: Routine;
    onComplete: () => void;
}) {
    return (
        <div
            className={cn(
                "p-4 rounded-xl shadow-md bg-white/40 border border-fogGray",
                "backdrop-blur-md transition hover:scale-[1.02]"
            )}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="font-title text-xl text-deepTwilight">{routine.title}</h2>
                    <p className="text-sm text-deepTwilight/70">{routine.difficulty}</p>
                </div>

                <img
                    src={routine.imageUrl}
                    className="w-14 h-14 rounded-lg object-cover border border-white/50"
                />
            </div>

            <p className="mt-3 text-deepTwilight">{routine.description}</p>

            <div className="flex gap-2 mt-3">
                {routine.attributes.map(attr => (
                    <span
                        key={attr.id}
                        className="text-xs px-2 py-1 bg-frierenBlue/40 text-deepTwilight rounded-lg border border-frierenBlue/60"
                    >
                        {attr.type}
                    </span>
                ))}
            </div>

            {!routine.completed && (
                <button
                    onClick={onComplete}
                    className="w-full mt-4 py-2 rounded-xl bg-frierenBlue text-deepTwilight font-title shadow hover:bg-skyMist transition"
                >
                    Completar rotina
                </button>
            )}
        </div>
    );
}
