import React from 'react';
import type { Entity, HighlightProps } from "../utils/types.ts";

const HighlightByType: React.FC<HighlightProps> = ({
                                                       line,
                                                       entities,
                                                       colorMap,
                                                       selectedType,
                                                       onSelectType,
                                                   }) => {
    if (!entities.length) return <span>{line}</span>;

    // map words → entity
    const lookup: Record<string, Entity> = {};
    entities.forEach((e) => (lookup[e.matchedText] = e));

    return (
        <>
            {line.split(" ").map((word, idx) => {
                const clean = word.replace(/^[^\w]+|[^\w]+$/g, "");
                const ent = lookup[clean];

                if (!ent) return <React.Fragment key={idx}>{word} </React.Fragment>;

                const isActive = ent.type === selectedType;
                return (
                    <React.Fragment key={ent.id + "-" + idx}>
            <span
                onClick={() => onSelectType(isActive ? null : ent.type)}
                style={{
                    backgroundColor: colorMap[ent.type] || "lightgray",
                    opacity: isActive ? 1 : 0.4,
                    borderRadius: "3px",
                    padding: "2px 4px",
                    cursor: "pointer",
                    fontWeight: 500,
                }}
            >
              {word}
            </span>{" "}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default HighlightByType;