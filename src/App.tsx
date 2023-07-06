import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import SettingsPanel from './components/SettingsPanel';
import Display from './components/Display';

import { JokeProps, LanguageProps, TagProps } from './interface/interface';


function App() {
  const [joke, setJoke] = useState<JokeProps>({ languageCode: 'en', text: 'Click the button to get a joke!' });
  const [language, setLanguage] = useState<LanguageProps>({ code: 'en', name: 'English' });
  const [showPanel, setShowPanel] = useState<boolean>(false);
  
  const [categories, setCategories] = useState<TagProps[]>([
    { name: 'Programming', selected: false },
    { name: 'Misc', selected: false },
    { name: 'Dark', selected: false },
    { name: 'Pun', selected: false },
    { name: 'Spooky', selected: false },
    { name: 'Christmas', selected: false }
  ]);

  const [blacklist, setBlacklist] = useState<TagProps[]>([
      { name: 'NSFW', selected: false },
      { name: 'Religious', selected: false },
      { name: 'Political', selected: false },
      { name: 'Racist', selected: false },
      { name: 'Sexist', selected: false },
      { name: 'Explicit', selected: false }
  ]);

  // get a joke from the API
  const getJoke = () => {
    // URL is generated based on selected categories and blacklist items
    const response = fetch(getRequest(), {
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => response.json())
      .then((data) => {
        // if current language is not English, translate the joke
        if (language.code !== 'en') {
          translateJoke(data.lang, language.code, data.joke);
        } else {
          setJoke({ languageCode: 'en', text: data.joke })
        }
      });
  };

  // translate the joke
  const translateJoke = (fromCode: string, toCode: string, jokeText: string) => {
    const response = fetch(`${process.env.REACT_APP_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&from=${fromCode}&to=${toCode}`, {
      method: "POST",
      body: JSON.stringify([{
        text: jokeText
      }]),
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.REACT_APP_TRANSLATOR_KEY as string,
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((data) => {
        setJoke({ languageCode: language.code, text: data[0].translations[0].text })
      }
    ).catch((error) => {
      console.log(error);
    });
  };

  const getRequest = () => {
    // get selected categories and blacklist items
    const selectedCategories = categories.filter((category) => category.selected).map((category) => category.name);
    const selectedBlacklist = blacklist.filter((item) => item.selected).map((item) => item.name);

    // build request url
    let requestUrl = 'https://v2.jokeapi.dev/joke/';
    if (selectedCategories.length > 0) {
      requestUrl += `${selectedCategories.join(',')}`;
    } else {
      requestUrl += 'Any';
    }

    requestUrl += '?type=single';

    if (selectedBlacklist.length > 0) {
      requestUrl += `&blacklistFlags=${selectedBlacklist.join(',')}`;
    }

    return requestUrl;
  };

  // translate the joke if the language is changed
  useEffect(() => {
    if (language.code !== joke.languageCode) {
      translateJoke(joke.languageCode, language.code, joke.text);
    }
  }, [language, joke]);

  return (
    <div className='flex flex-col w-screen h-screen bg-slate-700'>
      <div className='flex w-full h-1/6 items-center justify-center'>
        <span className='flex text-5xl font-bold underline underline-offset-8 text-center text-yellow-300'>Joke Generator</span>
      </div>
      <div className='flex w-full h-4/6 items-center justify-center'>
        <Display
          joke={joke}
          delay={10}/>
      </div>
      <div className='flex w-full h-2/6 justify-center'>
        {showPanel ? (
          <SettingsPanel 
            showPanel={showPanel}
            setShowPanel={setShowPanel}
            categories={categories}
            setCategories={setCategories}
            blacklist={blacklist}
            setBlacklist={setBlacklist}
          />
        ) : (
          <Menu
            language={language}
            setLanguage={setLanguage}
            getJoke={getJoke}
            showPanel={showPanel}
            setShowPanel={setShowPanel}
          />
        )}
        
      </div>
    </div>
  );
};


export default App;
