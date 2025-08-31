import React from 'react';
import HeroSection from './HeroSection';
import PilaresSection from './PilaresSection';
import CartasAlMarSection from './CartasAlMarSection';
import NewsletterForm from '../common/NewsletterForm';
import PreFooterSection from './PreFooterSection';
import { useInView } from 'react-intersection-observer';
import './Home.css';

const Home = () => {
    const { ref: newsletterRef, inView: newsletterInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <div className="home-container">
            <HeroSection />
            <PilaresSection />
            <CartasAlMarSection />
            
            <section className="newsletter-section">
                <div className={`newsletter__content ${newsletterInView ? 'is-in-view' : ''}`} ref={newsletterRef}>
                    <NewsletterForm />
                </div>
            </section>
            
            <PreFooterSection />
        </div>
    );
};

export default Home;