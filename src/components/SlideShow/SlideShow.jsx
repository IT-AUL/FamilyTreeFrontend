import React, { useState, useEffect } from 'react';
import { Button } from 'baseui/button';
import { ChevronLeft, ChevronRight } from 'baseui/icon';
import './Slideshow.css';

const Slideshow = ({ nodes }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [story, setStory] = useState('');

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await fetch('/generate_story', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ node: nodes[currentIndex] }),
                });
                const data = await response.json();
                setStory(data.story);
            } catch (error) {
                console.error('Error generating story:', error);
            }
        };

        fetchStory();
    }, [currentIndex, nodes]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % nodes.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + nodes.length) % nodes.length);
    };

    return (
        <div className="slideshow-container">
            <h1>Семейное слайд-шоу</h1>
            <div className="slideshow">
                <Button onClick={prevSlide}><ChevronLeft size={24} /></Button>
                <div className="slide">
                    <img src={nodes[currentIndex].photo} alt={nodes[currentIndex].name} className="slide-image" />
                    <h2>{nodes[currentIndex].name}</h2>
                    <p>{story}</p>
                </div>
                <Button onClick={nextSlide}><ChevronRight size={24} /></Button>
            </div>
        </div>
    );
};

export default Slideshow;