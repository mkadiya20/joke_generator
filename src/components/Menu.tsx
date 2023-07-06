import React, { useState, useEffect } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';

import Dropdown from './Dropdown';
import { LanguageProps, LanguageData, MenuProps } from '../interface/interface';


const Menu = (props: MenuProps) => {
    const [languages, setLanguages] = useState<LanguageProps[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // set the dropdown visibility
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  
    // set the settings panel visibility
    const toggleSettings = () => {
      props.setShowPanel(!props.showPanel);
    };

    // dismiss the dropdown when the user clicks outside of it
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>) => {
      if (event.currentTarget === event.target) {
        setShowDropdown(false);
      }
    };

    // get the languages from the API
    useEffect(() => {
    fetch(process.env.REACT_APP_TRANSLATOR_ENDPOINT + "/Languages?api-version=3.0&scope=translation", {
        headers: {
        'Ocp-Apim-Subscription-Key': process.env.REACT_APP_TRANSLATOR_KEY as string
        }})
          .then((response) => response.json())
          .then((data) => {
          // console.log(data);
          
          // create an array of objects with the key of code and name
          const extractedData = Object.entries<LanguageData>(data.translation).map(([code, value]) => ({ code, name: value.name }));

          setLanguages(extractedData);
        }
    );
    }, []);
    
    return (
      <div className='flex flex-row w-1/3 h-1/2 px-5 space-x-4 items-center justify-center rounded-2xl shadow-lg shadow-black bg-gray-400'>
          <button className='flex relative w-fit h-1/3 p-3 items-center rounded-full justify-center bg-slate-300 hover:bg-slate-200 transition-colors duration-100' onClick={toggleSettings}>
            <IoSettingsSharp className='text-xl' />
          </button>
          <div className='flex flex-col relative w-1/2 h-1/2 items-center justify-center'>
            <button
                    className={"flex w-full h-full rounded-2xl bg-slate-300 hover:bg-slate-200 transition-colors duration-100 items-center justify-center"}
                    onClick={() => toggleDropdown()}
                    onBlur={(e) => dismissHandler(e)}
                >
              {showDropdown && (
                <Dropdown
                  languages={languages}
                  language={props.language}
                  setLanguage={props.setLanguage}
                />
              )}
              Language: {props.language.name}
            </button>
          </div>
          <button className='flex w-1/2 h-1/2 items-center justify-center rounded-2xl bg-slate-300 hover:bg-slate-200 transition-colors duration-100' onClick={e => props.getJoke()}>Get Joke</button>
        </div>
    )
    
};

export default Menu;