import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg";
}

export function Modal({ onClose, children, size = "md" }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    // Find or create modal root
    const modalRoot =
        document.getElementById("modal-root") ||
        (() => {
            const div = document.createElement("div");
            div.id = "modal-root";
            document.body.appendChild(div);
            return div;
        })();

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-3xl",
        lg: "max-w-6xl"
    };

    return createPortal(
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"
                onClick={onClose}
            />

            {/* Modal box */}
            <div className={`relative bg-gray-800 rounded-xl shadow-2xl p-8 ${sizeClasses[size]} w-full z-10 max-h-[90vh] overflow-y-auto border border-gray-700 transition-all duration-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                {children}
            </div>
        </div>,
        modalRoot
    );
}