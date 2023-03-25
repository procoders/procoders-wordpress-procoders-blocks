import { __ } from '@wordpress/i18n';
import 'slick-carousel';
import { useBlockProps, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { Button, 
         Panel,
         PanelBody,
         PanelRow,
         ToggleControl, 
         RangeControl 
       } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';

export default function edit({attributes, setAttributes}) {
    const carouselRef = useRef(null);
    const {images, nav, dots, transition, speed} = attributes;
    const [selectedImage, setSelectedImage] = useState(null);


    const onSelectImage = (newImage) => {
        const newImages = images.concat(newImage);
        setAttributes({images: newImages});
    };

    const onRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setAttributes({images: newImages});
    };

    const onCaptionChange = (index, newCaption) => {
        const newImages = [...images];
        newImages[index].caption = newCaption;
        setAttributes({images: newImages});
    };

    const onLinkChange = (index, newLink) => {
        const newImages = [...images];
        newImages[index].link = newLink;
        setAttributes({images: newImages});
    };
    useEffect(() => {
        jQuery(carouselRef.current).slick({
          // arrows: attributes.nav,
          // dots: attributes.dots,
          // fade: true,
          // speed: attributes.speed,
          // autoplay: true,
          // autoplaySpeed: attributes.transition,
      });
    }, []);

    return (
        <div {...useBlockProps()}>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    multiple={true}
                    render={({open}) => (
                        <Button isPrimary onClick={open}>
                            {__('Add Images')}
                        </Button>
                    )}
                />
            </MediaUploadCheck>
            <InspectorControls style={{ marginBottom: "40px" }}>
                <Panel header="Slider Settings">
                    <PanelBody  title="Slider Settings" initialOpen={ true }>
                        <ToggleControl
                            label={__('Navigation')}
                            checked={nav}
                            onChange={(value) => setAttributes({nav: value})}
                        />
                        <ToggleControl
                            label={__('Dots')}
                            checked={dots}
                            onChange={(value) => setAttributes({dots: value})}
                        />
                        <RangeControl
                            label={__('Transition Duration (ms)')}
                            value={transition}
                            onChange={(value) => setAttributes({transition: value})}
                            min={100}
                            max={2000}
                        />
                        <RangeControl
                            label={__('Slide Speed (ms)')}
                            value={speed}
                            onChange={(value) => setAttributes({speed: value})}
                            min={500}
                            max={10000}
                        />
                        
                    </PanelBody>
                </Panel>
            </InspectorControls>
            
            <div className="carousel-wrapper">
                <div className="slick-carousel" ref={carouselRef}>
                    {images.map((image, index) => (
                        <div key={index} className="carousel-item">
                            <img
                                src={image.url}
                                alt={image.alt}
                                onClick={() => setSelectedImage(index)}
                            />
                            <div className="carousel-caption">
                                <input
                                    type="text"
                                    placeholder={__('Caption')}
                                    value={image.caption}
                                    onChange={(e) =>
                                        onCaptionChange(index, e.target.value)
                                    }
                                />
                            </div>
                            <a
                                href={image.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="carousel-link"
                            >
                                {__('Link')}
                            </a>
                            <button
                                className="remove-image"
                                onClick={() => onRemoveImage(index)}
                            >
                                {__('Remove Image')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};