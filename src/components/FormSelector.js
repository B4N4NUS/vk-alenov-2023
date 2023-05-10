import { useEffect, useRef, useState } from "react"

export default function FormSelector({
    emptyText,
    errorText,
    defaultSelectionText,
    prefixText,
    postfixText,
    variants,
    lastSelection,
    setSelection,
    grid
}) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [textOnClose, setTextOnClose] = useState("")
    const [height, setHeight] = useState(0)
    const [spin, setSpin] = useState(0)
    const [error, setError] = useState(false)
    const [showError, setShowError] = useState(false)
    const gridRef = useRef()

    useEffect(() => {
        if (!grid) {
            setHeight(variants.length * 44 + 30)
        }
        if (lastSelection !== null) {
            setSelected(lastSelection)
            setTextOnClose((prefixText ? prefixText : "") + variants[lastSelection] + (postfixText ? postfixText : ""))
        } else {
            setTextOnClose(emptyText)
            setSelected(null)
        }
    }, [lastSelection])

    useEffect(() => {
        if (grid && gridRef.current) {
            setHeight(gridRef.current.offsetHeight + 30)
        }
    }, [spin])

    useEffect(() => {
        if (variants) {
            setError(false)
        } else {
            setError(true)
        }
    }, [variants])

    const errorInterval = () => {
        setShowError(true);
        setOpen(false)
        setTimeout(() => {
            setShowError(false)
        }, 1000)
    }

    return (
        <div className={(open ? " formFieldSelected" : " formField") + (showError ? " formFieldError" : "")} onClick={() => {
            setOpen(!open)
            if (error) {
                errorInterval()
            } else {
                setSpin(spin + 1)
            }
        }} onMouseLeave={() => {
            if (open) {
                setSpin(spin + 1)
            }
            setOpen(false)
        }}>
            <div className={(selected !== null ? "formText" : (showError ? "formErrorText" : "formTextBlank")) + " formFieldSelectedHeader"}>
                {(open && selected === null) ? defaultSelectionText : (showError ? errorText : textOnClose)}
            </div>

            {!showError && <svg className={"iconTriangle"} style={{ transform: ("translate(0%, -50%) rotate(" + (spin * 60) + "deg)") }} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path id="triangle" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z" />
            </svg>}

            {!error && <div className={"translate"} style={(!open ? { height: 0 } : { height: height })}>
                {open && <div ref={gridRef} className={grid ? "formFieldGridWrapper" : ""}>
                    {variants.map((val, ind) => {
                        return <div className={open ? "agVisible " : "agHidden "} key={ind}>
                            <div className={grid ? (ind === selected ? "formFieldItemGridSelected" : "formFieldItemGrid") : (ind === selected ? "formFieldItemSelected" : "formFieldItem")} onClick={(e) => {
                                e.stopPropagation();
                                setSelected(ind)
                                setSelection(ind)
                                setOpen(false)
                                setSpin(spin + 1)
                            }}>
                                {val}
                            </div>
                        </div>
                    })}
                </div>}
            </div>}
        </div>
    )
}