import { useEffect, useState } from "react"
import FormLRSelector from "./FormLRSelector"

export default function FormTimePicker({
    minValue = { hours: 0, minutes: 0 },
    maxValue = { hours: 23, minutes: 3 },
    minuteIntervals = ['00', '15', '30', '45'],
    hourIntervals = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
    emptyText,
    defaultSelectionText,
    prefixText = "",
    postfixText = "",
    lastSelection,
    setSelection,
}) {
    const [open, setOpen] = useState(false)
    const [textOnClose, setTextOnClose] = useState("")
    const [spin, setSpin] = useState(0)
    const [selected, setSelected] = useState({ hours: 0, minutes: 0 })

    useEffect(() => {
        if (lastSelection !== null) {
            setSelected({ hours: lastSelection.hours, minutes: lastSelection.minutes })
            setTextOnClose(prefixText + hourIntervals[lastSelection.hours] + ":" + minuteIntervals[lastSelection.minutes] + postfixText)
        } else {
            setTextOnClose(emptyText)
            if (minValue) {
                setSelected({ hours: minValue.hours, minutes: minValue.minutes })
            }
        }
    }, [lastSelection])

    const hourPrev = () => {
        if (selected.hours === 0 || selected.hours === minValue.hours) {
            return
        }
        if (selected.hours - 1 === minValue.hours) {
            setSelected({ hours: selected.hours - 1, minutes: minuteIntervals.length - 1 })
            setSelection(selected.hours - 1, minuteIntervals.length - 1)
            return
        }
        setSelection(selected.hours - 1, selected.minutes)
        setSelected({ hours: selected.hours - 1, minutes: selected.minutes })
    }

    const hourNext = () => {
        if (selected.hours === hourIntervals.length - 1 || selected.hours === maxValue.hours) {
            return
        }
        if (selected.hours + 1 === maxValue.hours) {
            setSelected({ hours: selected.hours + 1, minutes: selected.minutes })
            setSelection(selected.hours + 1, selected.minutes)
            return
        }
        setSelection(selected.hours + 1, selected.minutes)
        setSelected({ hours: selected.hours + 1, minutes: selected.minutes })
    }

    const minutePrev = () => {
        if ((selected.hours === minValue.hours && selected.minutes - 1 < minValue.minutes)) {
            return
        }
        if (selected.minutes === 0 && selected.hours > 0) {
            setSelected({ hours: selected.hours - 1, minutes: minuteIntervals.length - 1 })
            setSelection(selected.hours - 1, minuteIntervals.length - 1)
            return
        }
        setSelection(selected.hours, selected.minutes - 1)
        setSelected({ hours: selected.hours, minutes: selected.minutes - 1 })
    }

    const minuteNext = () => {
        if (selected.minutes === minuteIntervals.length - 1) {
            if (selected.hours < hourIntervals.length - 1) {
                setSelected({ hours: selected.hours + 1, minutes: 0 })
                setSelection(selected.hours + 1, 0)
                return
            } else {
                return
            }
        }
        setSelection(selected.hours, selected.minutes + 1)
        setSelected({ hours: selected.hours, minutes: selected.minutes + 1 })
    }

    return (
        <div className={(open ? " formFieldSelected" : " formField")} onClick={() => {
            setOpen(!open)
            setSpin(spin + 1)
        }}
            onMouseLeave={() => {
                if (open) {
                    setSpin(spin + 1)
                }
                setOpen(false)
            }}
        >
            <div className={(lastSelection !== null ? "formText" : "formTextBlank") + " formFieldSelectedHeader"}>
                {(open && lastSelection === null) ? defaultSelectionText : textOnClose}
            </div>

            <svg className={"iconTriangle"} style={{ transform: ("translate(0%, -50%) rotate(" + (spin * 60) + "deg)") }} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path id="triangle" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z" />
            </svg>

            <div className={"translate"} style={{ height:!open ?  0 : 80, margin: "0 auto" }} onClick={(e) => e.stopPropagation()}>
                {open && <div className="formTimeWrapper" style={{width:"fit-content", alignContent:"center"}}>
                    <FormLRSelector
                        selected={selected.hours}
                        setSelectedLeft={hourPrev}
                        setSelectedRight={hourNext}
                        variants={hourIntervals}
                        fontSize="40px"
                    />
                    <input value={":"} disabled={true} className="formTimeInput" style={{ borderBottom: "none", fontSize: "40px" }} />
                    <FormLRSelector
                        selected={selected.minutes}
                        setSelectedLeft={minutePrev}
                        setSelectedRight={minuteNext}
                        variants={minuteIntervals}
                        fontSize="40px"
                    />
                </div>}
            </div>
        </div>
    )
}