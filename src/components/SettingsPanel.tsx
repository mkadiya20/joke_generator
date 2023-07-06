import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import { TagProps, SettingsPanelProps } from '../interface/interface';


const SettingsPanel = (props: SettingsPanelProps) => {
    // toggle the color of the category
    const toggleCategoryColor = (category: TagProps) => {
        const newCategories = [...props.categories];
        newCategories[props.categories.findIndex((cat) => cat.name === category.name)].selected = !category.selected;
        props.setCategories(newCategories);
    };

    // get the color of the category
    const getCategoryColor = (category: string) => {
        if (props.categories[props.categories.findIndex((cat) => cat.name === category)].selected) {
            return 'bg-yellow-200';
        }
        return 'bg-slate-300';
    };

    // toggle the color of the blacklist item
    const toggleBlacklistColor = (blacklistItem: TagProps) => {
        const newBlacklist = [...props.blacklist];
        newBlacklist[props.blacklist.findIndex((item) => item.name === blacklistItem.name)].selected = !blacklistItem.selected;
        props.setBlacklist(newBlacklist);
    };

    // get the color of the blacklist item
    const getBlacklistColor = (blacklistItem: string) => {
        if (props.blacklist[props.blacklist.findIndex((item) => item.name === blacklistItem)].selected) {
            return 'bg-red-400';
        }
        return 'bg-slate-300';
    };

    // toggle the settings panel
    const toggleSettingsPanel = () => {
        props.setShowPanel(!props.showPanel);
    };

    return (
        <div className='flex flex-row w-1/3 2xl:h-1/2 h-fit px-5 space-x-2 items-center justify-center rounded-2xl shadow-lg shadow-black bg-gray-400'>
            <button className='flex relative w-fit h-1/3 p-2 items-center rounded-full justify-center bg-slate-300 hover:bg-slate-200 transition-colors duration-100'
                onClick={toggleSettingsPanel}>
                <IoCheckmarkCircleOutline className='text-2xl' />
            </button>
            <div className='flex flex-col w-full h-full space-y-2 items-center justify-center'>
                <div className='flex flex-row flex-wrap w-fit h-1/2 space-x-1 space-y-1 items-center justify-center rounded-2xl'>
                    <span className='px-1 py-1 rounded-2xl'>Categories:</span>
                    {props.categories.map((category) => (
                        <span className={`px-2 py-1 rounded-md cursor-pointer ${getCategoryColor(category.name)} hover:bg-yellow-200`}
                            onClick={() => {
                                toggleCategoryColor(category);
                            }}
                            key={category.name}>
                            {category.name}
                        </span>
                    ))}
                </div>
                <div className='flex flex-row flex-wrap w-fit h-1/2 space-x-1 space-y-1 items-center justify-center rounded-2xl'>
                    <span className='px-1 py-1 rounded-2xl'>Blacklist:</span>
                    {props.blacklist.map((blacklistItem) => (
                        <span className={`px-2 py-1 rounded-md cursor-pointer ${getBlacklistColor(blacklistItem.name)} hover:bg-red-400`}
                            onClick={() => {
                                toggleBlacklistColor(blacklistItem);
                            }}
                            key={blacklistItem.name}>
                            {blacklistItem.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      )
};

export default SettingsPanel;