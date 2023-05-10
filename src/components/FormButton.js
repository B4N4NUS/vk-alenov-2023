import { useState } from "react"

export default function FormButton({
    textFirst,
    text,
    image,
    previewImage,
    doClick
}) {
    const [hovering, setHovering] = useState(false)

    return <div className={"formButton"} style={{ flexDirection: !textFirst ? "row" : "row-reverse" }} onClick={() => { doClick() }} onMouseEnter={() => setHovering(true)} onMouseLeave={() => { setHovering(false) }}>
        <div style={{ minWidth: 30, minHeight: 30 }}>
            {hovering ? image : previewImage}
        </div>
        <div style={{ minWidth: 10 }} />
        <div>
            {text}
        </div>
    </div>
}