import {GoDotFill} from "react-icons/go";
import {useEffect, useState} from "react";

export function HomeSlider() {
    const images = ['/HomeSlider/slider_1 Pc.webp', '/HomeSlider/slider_2 Pc.webp'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevState => (prevState + 1) % images.length)
        }, 3000)

        return () => clearInterval(interval);
    })

    return (
        <>
            <div className="mx-24 my-8 relative">
                <img className="w-full rounded-[16px]" src={images[currentImageIndex]} alt=""/>
                <div className="absolute bottom-2 left-1/2 translate-x-1/2 flex items-center">
                    {images.map((_, index) => (
                        <GoDotFill key={index} onClick={() => setCurrentImageIndex(index)} className={`text-[${index === currentImageIndex ? '#007AFF' : '#7AC2C2'}] cursor-pointer`}/>
                    ))}
                </div>
            </div>
        </>
    )
}