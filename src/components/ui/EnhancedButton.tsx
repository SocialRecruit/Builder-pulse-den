import React from "react";
import { cn } from "@/lib/utils";

export interface EnhancedButtonProps {
  children: React.ReactNode;
  emoji?: string;
  effect?:
    | "scale"
    | "bounce"
    | "pulse"
    | "glow"
    | "flip"
    | "shake"
    | "rotate"
    | "slide";
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  customStyle?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    emojiSize?: "sm" | "md" | "lg" | "xl";
  };
}

const effectClasses = {
  scale: "hover:scale-110 transition-transform duration-300 ease-out",
  bounce: "hover:animate-bounce hover:scale-105 transition-all duration-300",
  pulse: "hover:animate-pulse hover:scale-105 transition-all duration-300",
  glow: "hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-500",
  flip: "hover:rotate-y-180 hover:scale-105 transition-all duration-500 transform-style-preserve-3d",
  shake: "hover:animate-wiggle hover:scale-105 transition-all duration-300",
  rotate: "hover:rotate-12 hover:scale-110 transition-all duration-300",
  slide: "hover:translate-y-2 hover:scale-105 transition-all duration-300",
};

const variantClasses = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white border-gray-500",
  success: "bg-green-500 hover:bg-green-600 text-white border-green-500",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500",
  danger: "bg-red-500 hover:bg-red-600 text-white border-red-500",
  info: "bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-500",
  gradient:
    "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-transparent",
};

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-6 py-4 text-lg",
  xl: "px-8 py-5 text-xl",
};

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const shadowClasses = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

const emojiSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function EnhancedButton({
  children,
  emoji,
  effect = "scale",
  variant = "primary",
  size = "md",
  rounded = "md",
  shadow = "md",
  onClick,
  className,
  disabled = false,
  customStyle,
}: EnhancedButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-3 font-medium transition-all duration-300 border cursor-pointer select-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
    effectClasses[effect],
    variantClasses[variant],
    sizeClasses[size],
    roundedClasses[rounded],
    shadowClasses[shadow],
    disabled && "pointer-events-none",
    className,
  );

  const customStyles = customStyle
    ? {
        backgroundColor: customStyle.backgroundColor,
        color: customStyle.textColor,
        borderColor: customStyle.borderColor,
      }
    : {};

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      style={customStyles}
    >
      {emoji && (
        <span
          className={cn(
            "transition-transform duration-300",
            effect === "scale" && "group-hover:scale-125",
            effect === "bounce" && "group-hover:animate-bounce",
            effect === "rotate" && "group-hover:rotate-12",
            emojiSizeClasses[customStyle?.emojiSize || "md"],
          )}
        >
          {emoji}
        </span>
      )}
      <span className="font-montserrat">{children}</span>
    </button>
  );
}

// Preset button components for common use cases
export function EmojiActionButton({
  emoji,
  children,
  effect = "scale",
  ...props
}: Omit<EnhancedButtonProps, "variant"> & {
  variant?: EnhancedButtonProps["variant"];
}) {
  return (
    <EnhancedButton
      emoji={emoji}
      effect={effect}
      variant="primary"
      size="lg"
      rounded="lg"
      shadow="lg"
      className="group"
      {...props}
    >
      {children}
    </EnhancedButton>
  );
}

export function GradientEmojiButton({
  emoji,
  children,
  effect = "glow",
  ...props
}: Omit<EnhancedButtonProps, "variant">) {
  return (
    <EnhancedButton
      emoji={emoji}
      effect={effect}
      variant="gradient"
      size="lg"
      rounded="full"
      shadow="xl"
      className="group bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 hover:from-orange-500 hover:via-pink-600 hover:to-purple-700"
      {...props}
    >
      {children}
    </EnhancedButton>
  );
}

export function InfoCardButton({
  emoji,
  title,
  description,
  effect = "scale",
  ...props
}: {
  emoji: string;
  title: string;
  description: string;
  effect?: EnhancedButtonProps["effect"];
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "group relative overflow-hidden bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-100",
        "border border-gray-200 hover:border-orange-300 rounded-2xl p-6",
        "transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20",
        effectClasses[effect],
        "text-left w-full",
        props.className,
      )}
      onClick={props.onClick}
    >
      <div className="relative z-10">
        <div
          className={cn(
            "text-4xl mb-4 transition-transform duration-300",
            effect === "scale" && "group-hover:scale-125",
            effect === "bounce" && "group-hover:animate-bounce",
            effect === "rotate" && "group-hover:rotate-12",
          )}
        >
          {emoji}
        </div>
        <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-2 group-hover:text-orange-800 transition-colors">
          {title}
        </h3>
        <p className="font-montserrat text-sm text-gray-600 group-hover:text-orange-700 transition-colors">
          {description}
        </p>
      </div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white to-transparent opacity-40 group-hover:animate-shine" />
      </div>
    </button>
  );
}
