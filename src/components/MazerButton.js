import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import "./MazerButton.css";

function MazerButton({ onReset }) {
    const [bgColor, setBgColor] = useState('seagreen');
    const [icon, setIcon] = useState('');
    const [visibility, setVisibility] = useState('visible');
    const [isClickable, setIsClickable] = useState(true);

    useEffect(() => {
        setIcon(newIcon());
        if(onReset) {
            handleReset();
        }
    }, [onReset]);

    const handleClick = () => {
        if(bgColor === 'seagreen'){
            setBgColor('slategray');
            setIcon(newIcon());
        } else if (bgColor === 'slategray'){
            setVisibility('hidden');
        }
    };
    
    const handleReset = () => {
        setBgColor('seagreen');
        setIcon(newIcon());
        setVisibility('visible');
        setIsClickable('true');
    }

    return (
        <Button
            variant="contained"
            className="mazer-button"
             style={{ width: '100%', minHeight: '100%', aspectRatio: '1 / 1', backgroundColor: bgColor, color: 'white', visibility: visibility, boxShadow: isClickable ? '0px 0px 5px rgba(0,0,0,0.5)' : 'none', }}
             disabled={!isClickable}
            onClick={handleClick}
        >
            {icon === 'frog' ? <FrogIcon /> : (icon === 'mouse' ? <MouseIcon /> : <BirdIcon />)}
        </Button>
    );
}

const widthIcon = "2em", heightIcon = "2em";

function newIcon(){
    const randomNumber = Math.floor(Math.random() * 3);

    // Determine the icon based on the random number
    switch (randomNumber) {
        case 0:
            // return <MouseIcon />;
            return 'mouse';
        case 1:
            // return <BirdIcon />
            return 'bird';
        default:
            // return <FrogIcon />;
            return 'frog';
    }
}

function MouseIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width={widthIcon} height={heightIcon} viewBox="0 0 24 24" style={{ transform: 'scaleX(-1)' }}>
        <path fill="currentColor" d="M21.33 17.39c1.4 1.27.47 3.61-1.41 3.61h-8.86A5.04 5.04 0 0 1 6 15.94v-.05c-2.3-.47-4-2.48-4-4.89c0-2.75 2.22-5 5-5h2.5c.3 0 .5-.23.5-.5S9.8 5 9.5 5H7V3h2.5C10.88 3 12 4.13 12 5.5C12 6.89 10.88 8 9.5 8H7c-1.66 0-3 1.33-3 3c0 1.37.92 2.5 2.14 2.87c.56-2.2 2.53-3.87 4.92-3.87c.8 0 1.6.22 2.3.55c-1.41.79-2.36 2.25-2.36 3.95c0 1.25.5 2.37 1.33 3.17l.7-.7c-.65-.61-1.03-1.5-1.03-2.47c0-2.59 2.34-3.5 3.5-3.5c2.08 0 3.95 1.89 3.44 4.23zM18 19c.56 0 1-.44 1-1s-.44-1-1-1s-1 .44-1 1s.44 1 1 1" />
    </svg>;
}

function BirdIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width={widthIcon} height={heightIcon} viewBox="0 0 24 24" style={{ transform: 'scaleX(-1)' }}>
        <g fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M16 7h.01M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" /><path d="m20 7l2 .5l-2 .5M10 18v3m4-3.25V21m-7-3a6 6 0 0 0 3.84-10.61" />
        </g>
    </svg>;
}

function FrogIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width={widthIcon} height={heightIcon} viewBox="0 0 512 512">
        <path fill="currentColor" d="M335.7 88.94c-4.742.194-9.563 1.486-14.204 4.165c-38.934 22.48-89.77 21.953-127.79.002c-6.09-3.516-12.285-4.61-18.145-3.892a46.38 46.38 0 0 1 9.438 28.09c0 23.15-17.037 42.83-39.176 45.095c-12.775 14.92-21.553 31.807-24.386 49.983c44.73-23.79 90.947-35.572 137.064-35.508c46.15.064 92.197 11.987 136.56 35.62c-2.69-18.15-11.216-35.043-23.794-49.92c-.585.026-1.17.048-1.76.048c-24.18 0-43.447-20.7-43.447-45.318c0-10.64 3.6-20.543 9.64-28.364zm-194.15 3.216c-12.67 0-23.277 10.85-23.277 25.15c0 14.297 10.608 25.147 23.278 25.147c12.67 0 23.276-10.85 23.276-25.148s-10.606-25.15-23.275-25.15zm227.956 0c-12.67 0-23.277 10.85-23.277 25.15c0 14.297 10.607 25.147 23.276 25.147c12.67 0 23.277-10.85 23.277-25.148s-10.608-25.15-23.277-25.15zm67.572 93.367c-8.525.088-17.893 1.546-27.853 4.243c6.926 19.457 8.57 40.725 2.695 62.656c-4.26 15.896.933 37.475 11.7 54.758l4.69 7.53l-7.02 5.43c-19.765 15.28-36.44 25.107-46.104 35.264c-9.664 10.158-13.887 19.59-10.915 40.875l1.525 10.91c3.596 4.7 7.678 9.43 12.142 14.06c19.876-14.55 36.01-23.887 68.344-4.094c-6.738-18.804 15.938-29.762 46.72-29.78c-36.91-15.88-64.98-25.62-86.438-30.376c67.492-72.188 97.182-127.96 66-159.188c-8.172-8.183-19.356-12.034-33.28-12.28a80.764 80.764 0 0 0-2.204-.01zm-361.617.002a79.679 79.679 0 0 0-2.397.006c-13.925.248-25.14 4.1-33.313 12.282c-31.182 31.227-1.492 87 66 159.188c-21.456 4.756-49.528 14.497-86.438 30.375c30.782.02 53.458 10.977 46.72 29.78c32.332-19.792 48.468-10.454 68.343 4.095c6.713-6.962 12.572-14.146 17.188-21.12l.537-3.85c2.972-21.283-1.25-30.716-10.914-40.874c-9.664-10.157-26.34-19.984-46.106-35.265l-7.02-5.427l4.692-7.53c10.73-17.228 15.858-39.233 11.7-54.76c-5.782-21.572-4.185-42.44 2.536-61.56c-11.336-3.388-21.954-5.216-31.527-5.338zm183.038 9.66c-46.096-.065-92.3 12.827-137.574 38.846a87.261 87.261 0 0 0 2.494 13.31v.002c5.453 20.354.593 42.93-9.484 62.297c15.89 11.634 30.343 20.526 41.478 32.23c10.36 10.89 16.795 25.132 16.955 43.712c-1.096 16.308-9.157 39.273-22.347 59.244c24.59-14.237 42.134-15.333 45.29 3.492c14.097-17.783 25.698-20.386 38.985-8.035c-3.745-31.452-11.117-52.887-17.258-65.097c-14.896-36.567-42.816-61.484-73.742-83.424l11.36-16.014c38.788 27.517 76.798 62.663 89.124 119.566c9.628.705 19.25.65 28.85-.16c12.362-56.81 50.334-91.918 89.085-119.408l11.36 16.016c-31.19 22.127-59.333 47.28-74.13 84.363c-6.045 12.357-13.14 33.493-16.793 64.158c13.29-12.35 24.89-9.748 38.987 8.035c3.153-18.825 20.697-17.73 45.288-3.492c-13.51-20.455-21.645-44.058-22.42-60.424c.415-18.01 6.81-31.872 16.95-42.533c11.135-11.705 25.586-20.595 41.474-32.23c-10.064-19.29-14.99-41.736-9.48-62.302a88.613 88.613 0 0 0 2.51-13.266c-44.85-25.79-90.852-38.82-136.964-38.886z" />
    </svg>;
}

export default MazerButton;