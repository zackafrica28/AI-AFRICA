"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import styles from "./Button.module.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "glass" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(styles.button, styles[variant], styles[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <span className={styles.loader} />}
                {!isLoading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
                <span className={styles.content}>{children}</span>
                {!isLoading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export default Button;
