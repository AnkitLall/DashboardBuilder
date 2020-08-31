import React, { useState,useRef } from 'react';
import { Search,X } from 'react-bootstrap-icons';

import './../css/SearchBar.scss';

export default function SearchBar(props) {

    let [isSearching,setIsSearching] = useState(false);
    let inputTextField = useRef(null);

    const resetSearch = () => {
        setIsSearching(false);
        inputTextField.current.value = '';
        props.getSearchText('');
    }

    return(
        <div className={'lib-search-bar-container'}>
            <div className={'search-bar'}>
                <input 
                    ref={inputTextField}
                    type={'text'} 
                    className={'text-editor'} 
                    placeholder={'Search'}
                    onChange={(e) => {
                        setIsSearching(true);
                        props.getSearchText(e.target.value);
                    }}
                />
                <div className={'search-icon-container'}>
                    {
                        isSearching?
                        <div className={'close-icon'} onClick={() => resetSearch()}>
                            <X />
                        </div>                        
                        :
                        <Search />
                    }                    
                </div>
            </div>
        </div>
    )
}