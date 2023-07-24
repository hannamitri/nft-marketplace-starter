import React from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

function Chevron({right = false, onClick}) {
    return (
        <div onClick={onClick} className={`rounded-circle rounded-circle`} style={{
            borderColor: '#EDEDED',
            border: '2px solid #EDEDED',
            backgroundColor: 'white',
            height: 32,
            width: 32,
            padding: '0',
            position: 'absolute',
            top: '50%',
            left: !right && 12,
            right: right && 12,
            transform: 'translateY(-50%)',
            zIndex: 50,
            cursor: 'pointer'
        }}>
            {right ? (
                <ChevronRightIcon style={{color: 'rgb(85,85,85)'}}/>
            ) : (
                <ChevronLeftIcon style={{color: 'rgb(85,85,85)'}}/>
            )}
        </div>
    );
}

export default Chevron;