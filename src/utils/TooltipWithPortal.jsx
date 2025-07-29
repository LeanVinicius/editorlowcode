import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export function TooltipWithPortal({ children, content }) {
    const wrapperRef = useRef(null);
    const tooltipRef = useRef(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible && wrapperRef.current && tooltipRef.current) {
            const triggerRect = wrapperRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            setCoords({
                top: triggerRect.top + window.scrollY - tooltipRect.height - 8, // 8px de espaço
                left: triggerRect.left + triggerRect.width / 2 + window.scrollX,
            });
        }
    }, [visible]);

    return (
        <>
            <span
                ref={wrapperRef}
                className="relative inline-block"
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
            </span>

            {visible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className="fixed z-[9999] px-3 py-2 text-xs text-white bg-gray-800 rounded shadow-lg pointer-events-none transition-opacity duration-200"
                        style={{
                            top: coords.top,
                            left: coords.left,
                            transform: "translateX(-50%)",
                            maxWidth: "220px",
                            whiteSpace: "normal",
                        }}
                    >
                        {content}
                        <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-gray-800 rotate-45 -translate-x-1/2"></div>
                    </div>,
                    document.body
                )}
        </>
    );
}
