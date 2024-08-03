import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ImageLinks } from '../data/links';
import { useState } from 'react';


const CarouselCard: React.FC = () => {
    const [banner, setBanner] = useState<boolean>(true);
    return (
        <div className="h-96 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
            >
                {ImageLinks.map((product) => (
                    <div key={product.id} className="flex items-center justify-center">
                        <img
                            src={product.link}
                            alt={product.name}
                            className="h-96 sm:h-64 xl:h-80 2xl:h-96"
                        />
                        <p className="legend">{product.name}</p>
                    </div>
                ))}
            </Carousel>
           {
            banner ? (
                <div className="fixed inset-x-0 bottom-0 p-4">
                <div
                    className="relative flex items-center justify-between gap-4 rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg"
                >
                    <p className="text-sm font-medium">
                        Winter Clothing
                        <a href="#" className="inline-block underline"> Check out this new Arrivals!</a>
                    </p>

                    <button
                        aria-label="Close"
                        className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
                        onClick={() => setBanner(!banner)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            ) : ""
           }
        </div>


    );
}

export default CarouselCard;
