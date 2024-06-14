import style from './Spinner.module.css';

function Spinner() {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-screen bg-gray-200 bg-opacity-50">
                <span className={`${style.loader} absolute top-1/2 left-[45%]`}></span>
            </div>
        </>
    )
}

export default Spinner;