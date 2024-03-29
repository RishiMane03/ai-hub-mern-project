import { useState } from 'react';
import VariableContext from './VariableContext'

const VariableProvider = (props) => {

    const [userInfo, setUserInfo] = useState('');

    return (
        <VariableContext.Provider value={{ userInfo, setUserInfo }}>
            {props.children}
        </VariableContext.Provider>
    );
}

export default VariableProvider;