import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import 'slick-carousel';


export default function save({attributes}){
    // const carouselRef = useRef(null);
    const {images, nav, dots, transition, speed} = attributes;
    const settings = {
        dots: dots,
        arrows: nav,
        autoplay: true,
        autoplaySpeed: speed,
        speed: transition,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
    };

    return (
        <div className="carousel-wrapper">
            <div className="slick-carousel" {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="carousel-item">
                        <img src={image.url} alt={image.alt} />
                        {image.caption && (
                            <div className="carousel-caption">
                                {image.caption}
                            </div>
                        )}
                        {image.link && (
                            <a
                                href={image.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="carousel-link"
                            >
                                {__('Learn More')}
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

