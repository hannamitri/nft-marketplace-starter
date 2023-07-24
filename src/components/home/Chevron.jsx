import React, {useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

function Chevron({right = false, onClick}) {
    return (
        <div
            onClick={onClick}
            className='chevron--hover rounded-circle'
            style={{
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
                cursor: 'pointer',
                transition: 'scale 300ms ease',
                transformOrigin: 'top'
            }}
        >
            {right ? (
                <ChevronRightIcon style={{color: 'rgb(85,85,85)'}}/>
            ) : (
                <ChevronLeftIcon style={{color: 'rgb(85,85,85)'}}/>
            )}
        </div>
    );
}

export default Chevron;