import { useEffect, useRef, useState } from "react"
import FormLRSelector from "./FormLRSelector"

export default function FormDatePicker({
    emptyText,
    errorText,
    defaultSelectionText,
    daysNames = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"],
    lastSelection,
    setSelection,
    prefixText = "",
    postfixText = "",
    dayShift = 0,
}) {
    const grid = true
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [textOnClose, setTextOnClose] = useState("")
    const [height, setHeight] = useState(0)
    const [spin, setSpin] = useState(0)
    const [error, setError] = useState(false)
    const [showError, setShowError] = useState(false)

    const [variants, setVariants] = useState(null)
    const [year, setYear] = useState(0)
    const [month, setMonth] = useState(null)
    const minDate = new Date()
    const [shift, setShift] = useState(dayShift)

    const gridRef = useRef()

    useEffect(() => {
        setMonth(minDate.getMonth())
        setYear(0)
    }, [])

    useEffect(() => {
        if (month !== null && year !== null) {
            var d = new Date(year + minDate.getFullYear(), month, 0);
            setShift(d.getDay() + dayShift)
            setVariants(new Date(year + minDate.getFullYear(), month + 1, 0).getDate())
        }
    }, [month, year])

    useEffect(() => {
        if (lastSelection !== null) {
            setSelected(lastSelection)
            setTextOnClose(prefixText + lastSelection.day + "." + lastSelection.month + "." + lastSelection.year + postfixText)
        } else {
            setTextOnClose(emptyText)
            setSelected(null)
        }
    }, [lastSelection])

    useEffect(() => {
        if (gridRef.current) {
            setHeight(gridRef.current.offsetHeight + 70)
        }
    }, [variants, spin])

    const errorInterval = () => {
        setShowError(true);
        setOpen(false)
        setTimeout(() => {
            setShowError(false)
        }, 1000)
    }

    const getDays = () => {
        let content = []
        for (let i = 0; i < 7; i++) {
            content.push(
                <div className="formDayName" key={daysNames[i]}>
                    {daysNames[i]}
                </div>)
        }
        for (let i = 0; i < shift; i++) {
            content.push(<div key={i + "shift"} />)
        }
        for (let i = 0; i < variants; i++) {
            content.push(<div className={open ? "agVisible " : "agHidden "} key={i}>
                <div className={grid ? (i === selected ? "formFieldItemDayGridSelected" : "formFieldItemDayGrid") : (i === selected ? "formFieldItemSelected" : "formFieldItem")} onClick={(e) => {
                    e.stopPropagation();
                    setSelected(i)
                    setSelection(year + minDate.getFullYear(), month + 1, i + 1)
                    setOpen(false)
                    setSpin(spin + 1)
                }}>
                    {i + 1}
                </div>
            </div>)
        }
        return content
    }

    const monthPrev = () => {
        if (year === 0 && month === minDate.getMonth()) {
            return
        }
        if (month < 1) {
            setYear(year - 1)
            setMonth(11)
        } else {
            setMonth(month - 1)
        }
    }

    const monthNext = () => {
        if (month === 11 && year === 3) {
            return;
        }
        if (month > 10) {
            setYear(year + 1)
            setMonth(0)
        } else {
            setMonth(month + 1)
        }
    }

    const yearPrev = () => {
        if (year === 0) {
            return
        }
        if (year === 1 && month < minDate.getMonth()) {
            setMonth(minDate.getMonth())
        }
        setYear(year - 1)
    }

    const yearNext = () => {
        if (year < 3)
            setYear(year + 1)
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
                {open && <div onClick={(e) => { e.stopPropagation() }}>
                    <div className="formLRSelectorWrapper">
                        <FormLRSelector
                            selected={month}
                            setSelectedLeft={monthPrev}
                            setSelectedRight={monthNext}
                            variants={["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]}
                        />
                        <div style={{ flex: 1 }} />
                        <FormLRSelector
                            selected={year}
                            setSelectedLeft={yearPrev}
                            setSelectedRight={yearNext}
                            variants={[minDate.getFullYear() + "", minDate.getFullYear() + 1 + "", minDate.getFullYear() + 2 + "", minDate.getFullYear() + 3 + ""]}
                        />
                    </div>
                    <div ref={gridRef} className={grid ? "formFieldDayWrapper" : ""}>
                        {getDays()}
                    </div>
                </div>}
            </div>}
        </div>
    )
}