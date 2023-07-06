import React, { useState, useEffect } from 'react';
import { LanguageProps, DropdownProps } from '../interface/interface';


const Dropdown = (props: DropdownProps) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // set the language
    const onClick = (language: LanguageProps) => {
        props.setLanguage(language);
        setShowDropdown(false);
    };

    // set the dropdown visibility
    useEffect(() => {
        setShowDropdown(showDropdown);
    }, [showDropdown]);

    return (
        <div className='flex flex-col absolute bottom-16 w-full h-40 rounded-lg overflow-auto bg-slate-300'>
            {props.languages.map((language: LanguageProps, index: number) => {
                return (
                    <p key={index} className='m-0 px-2 py-1 text-left hover:bg-blue-500 hover:text-white' onClick={() => onClick(language)}>{language.name}</p>
                )
            })}
        </div>
    )
}

export default Dropdown;