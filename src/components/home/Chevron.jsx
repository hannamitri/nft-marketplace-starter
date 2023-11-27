import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

export default function Chevron({right = false, onClick}) {
    return (
        <div
            onClick={onClick}
            className=' rounded-circle'
            style={{
                border: '2px solid #EDEDED',
                backgroundColor: 'white',
                height: 32,
                width: 32,
                padding: '0',
                position: 'absolute',
                top: '65%',
                left: !right && 25,
                right: right && 25,
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