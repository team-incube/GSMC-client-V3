interface ScrollDownProps {
    width?: number;
    height?: number;
    color?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    className?: string;
}

export default function ScrollDown({width = 24,height = 15,color = 'white', className, onClick,}: ScrollDownProps) {
    return (
        <svg 
            onClick={onClick} 
            width={width} 
            height={height} 
            viewBox="0 0 24 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M13.6952 13.6944C13.2265 14.1625 12.591 14.4255 11.9285 14.4255C11.266 14.4255 10.6306 14.1625 10.1619 13.6944L0.731878 4.26771C0.263108 3.79872 -0.000156211 3.16272 6.95392e-08 2.49962C0.00015635 1.83653 0.26372 1.20065 0.732711 0.731879C1.2017 0.263109 1.8377 -0.000156211 2.5008 6.95389e-08C3.1639 0.00015635 3.79977 0.263721 4.26854 0.732712L11.9285 8.39271L19.5885 0.732712C20.0598 0.27709 20.6912 0.0248021 21.3467 0.030187C22.0022 0.035572 22.6294 0.298198 23.0931 0.761502C23.5569 1.22481 23.8201 1.85172 23.8261 2.50721C23.8321 3.1627 23.5804 3.79433 23.1252 4.26605L13.6969 13.696L13.6952 13.6944Z" 
                fill={color}
            />
        </svg>
    )
}