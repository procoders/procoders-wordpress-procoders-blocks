import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import './style.scss';

import edit from "./edit";
import save from './save';

registerBlockType( 'procoders-block/image-carousel', {
    title: __( 'Image Carousel' ),
    icon: 'format-gallery',
    category: 'common',
    attributes: {
        images: {
            type: 'array',
            default: [],
            source: 'query',
            selector: '.carousel-item',
            query: {
                id: {
                    type: 'number',
                },
                url: {
                    type: 'string',
                    source: 'attribute',
                    attribute: 'src',
                    selector: 'img',
                },
                alt: {
                    type: 'string',
                    source: 'attribute',
                    attribute: 'alt',
                    selector: 'img',
                },
                caption: {
                    type: 'string',
                    source: 'html',
                    selector: '.carousel-caption',
                },
                link: {
                    type: 'string',
                    source: 'attribute',
                    attribute: 'href',
                    selector: '.carousel-link',
                },
            },
        },
        nav: {
            type: 'boolean',
            default: true,
        },
        dots: {
            type: 'boolean',
            default: true,
        },
        transition: {
            type: 'number',
            default: 500,
        },
        speed: {
            type: 'number',
            default: 3000,
        },
    },
    edit,
    save,
} );
