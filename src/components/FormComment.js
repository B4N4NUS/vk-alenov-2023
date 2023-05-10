export default function FormComment({
    setText,
    lastText,
    hint = "Комментарий..."
}) {
    return (
        <div className="formFieldComment" onMouseLeave={() => { }}>
            <div className="growWrap">
                <textarea className="formFieldInput" placeholder={hint} onInput={(e) => {
                    e.target.parentNode.dataset.replicatedValue = e.target.value + " "
                    setText(e.target.value)
                }} 
                value={lastText ? lastText : ""}>
                </textarea>
            </div>
        </div>
    )
}