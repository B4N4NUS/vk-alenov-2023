export default function Cross({ id }) {
    return <svg width="30px" height="30px" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path id={id} strokeLinecap='round' strokeLinejoin='round' strokeWidth={4}
            d="M19,19,5,5M19,5,5,19">
        </path>
    </svg>
}