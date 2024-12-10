import { useControls } from 'leva';
import React from 'react';

const Testgui = () => {
    const { name, aNumber } = useControls({ name: 'World', aNumber: 0 })

    return (
        <div>
          {/* Hey {name}, hello! {aNumber} */}
        </div>
            
    );
};

export default Testgui;


