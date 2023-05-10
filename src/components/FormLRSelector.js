import Arrow from "../assets/Arrow";

export default function FormLRSelector({
    selected,
    setSelectedLeft,
    setSelectedRight,
    variants,
    direction = 'row',
    wh = '20px',
    fontSize = '18px'
}) {
    return <div className="formLRSelectorWrapper" style={{ flexDirection: direction }}>
        <div style={{ alignSelf: "center" }} onClick={(e) => {
            e.stopPropagation()
            setSelectedLeft()
        }}>
            <Arrow id='lrArrow' style={{ transform: direction === 'row' ? "rotate(180deg)" : 'rotate(270deg)', width: wh, height: wh }} />
        </div>
        <div className="formLRText" style={{ alignSelf: "center", fontSize: fontSize, transform: "translateY(-2px)" }} >
            {variants[selected]}
        </div>
        <div style={{ alignSelf: "center" }} onClick={(e) => {
            e.stopPropagation()
            setSelectedRight()
        }}>
            <Arrow id='lrArrow' style={{ transform: direction === 'row' ? "rotate(0deg)" : 'rotate(90deg)', width: wh, height: wh }} />
        </div>
    </div>
}