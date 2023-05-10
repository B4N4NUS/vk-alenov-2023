export default function Arrow({
    id,
    style = { width: "30px", height: "30px" }
}) {
    return <svg style={style} viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path id={id} strokeLinecap='round' strokeLinejoin='round' strokeWidth={4}
            d="M19,12,7,5M19,12,7,19">
        </path>
    </svg>
}