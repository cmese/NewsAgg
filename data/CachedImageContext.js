import React, { useState, createContext } from 'react';

const CachedImageDicContext = createContext({})

const CachedImageDicProvider = ({ children }) => {
    const [cacheDic, setCacheDic] = useState({})

    const updateDic = (key, value) => {
        //TODO: reset dictionary if becomes too large?
        setCacheDic(prevCacheDic => {
            if (prevCacheDic[key]) { //a necessary check to make sure dic is consistent while multiple component's update it simultaneously 
                console.log("inside")
                return prevCacheDic
            } else {
                return { ...prevCacheDic, [key]: value }
            }
        })
    }
    console.log(cacheDic)
    return (
        <CachedImageDicContext.Provider value={{ cacheDic, updateDic }}>
            {children}
        </CachedImageDicContext.Provider >
    )
}

export { CachedImageDicContext, CachedImageDicProvider }