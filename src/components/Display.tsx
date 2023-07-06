import React, { useState, useEffect } from 'react';

import { JokeProps } from '../interface/interface';

const Display = (props: {joke: JokeProps, delay: number}) => {
    const [currentText, setCurrentText] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    
    // reset the display when a new joke is fetched
    useEffect(() => {
        setCurrentText('');
        setCurrentIndex(0);
    }, [props.joke]);

    // display the joke one character at a time
    useEffect(() => {
        if (currentIndex < props.joke.text.length) {
          const timeout = setTimeout(() => {
            setCurrentText(prevText => prevText + props.joke.text[currentIndex]);
            setCurrentIndex(prevIndex => prevIndex + 1);
          }, props.delay);
      
          return () => clearTimeout(timeout);
        }
      }, [currentIndex, props.delay, props.joke.text]);

    return (
        <div className='flex w-2/3 h-5/6 p-10 items-center justify-center rounded-2xl shadow-lg shadow-black bg-yellow-300'>
          <span className='flex text-4xl font-bold text-center'>{currentText}</span>
        </div>
    )
};

export default Display;