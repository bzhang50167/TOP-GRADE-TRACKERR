"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import logoPlaceholder from '@/public/logo-placeholder.png';
import Image from 'next/image';

export default function HomepageCarousel() {
        return (
            <Carousel autoPlay={true} infiniteLoop={true} className="w-[400px] h-[400px]">
                <div>
                    <Image src={logoPlaceholder} alt='logo-placeholder'/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <Image src={logoPlaceholder} alt='logo-placeholder' />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <Image src={logoPlaceholder} alt='logo-placeholder' />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
