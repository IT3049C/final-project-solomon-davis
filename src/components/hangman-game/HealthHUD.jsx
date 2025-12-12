
export function RevealStickFigure({attemptNum}) {
    const mainParts = [
        {key: "head", display: "O"},
        {key: "torso", display: "|"},
        {key: "right-arm", display: "\\`"},
        {key: "left-arm", display: "/"},
        {key: "left-leg", display: "/"},
        {key: "right-leg", display: "\\"}
    ];

    const wrongGuess = 6 - attemptNum;
    return (
        <div className="stick-figure">
            {mainParts.slice(0, wrongGuess).map((parts, partsIndex) => (
                <div key={partsIndex}>{parts}</div>
            ))}
        </div>  
    );
}