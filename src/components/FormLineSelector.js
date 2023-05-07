import { useEffect, useState } from "react"

export default function FormLineSelector({ emptyText, variants, lastSelection, setSelection }) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [textOnClose, setTextOnClose] = useState("")
    const [height, setHeight] = useState(0)
    const [spin, setSpin] = useState(0)

    useEffect(() => {
        setHeight(variants.length * 44 + 30)
        if (lastSelection !== null) {
            setSelected(lastSelection)
            setTextOnClose(variants[lastSelection])
        } else {
            setTextOnClose(emptyText)
        }
    }, [lastSelection])


    return (
        <div className={open ? " formFieldSelected" : " formField"} onClick={() => {
            setOpen(!open)
            setSpin(spin + 1)
        }}>
            <div className={(selected !== null ? "formText" : "formTextBlank") + " formFieldSelectedHeader"}>
                {textOnClose}
            </div>

            <svg className={"iconTriangle"} style={{ transform: ("translate(0%, -50%) rotate(" + (spin * 60) + "deg)") }} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path id="triangle" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z" />
            </svg>

            <div className="translate" style={(!open ? { height: 0 } : { height: height })}>
                {open && variants.map((val, ind) => {
                    return <div className={open ? "agVisible " : "agHidden "} key={ind}>
                        <div className={ind === selected ? "formFieldItemSelected" : "formFieldItem"} onClick={(e) => {
                            e.stopPropagation();
                            setSelected(ind)
                            setSelection(ind)
                            setOpen(false)
                        }}>
                            {val}
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    )
}