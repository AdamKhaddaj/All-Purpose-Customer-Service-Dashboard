

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "cancel";
    size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = "primary", size = "md", className = "", children, disabled, ...props }: ButtonProps) {
    const base = "px-4 py-2 rounded-lg font-medium transition-colors";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50",
        secondary: "bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50",
        danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50",
        cancel: "!bg-transparent text-gray-400 hover:text-gray-200",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {variant === "cancel" ? "✕" : children}
        </button>
    );
}


