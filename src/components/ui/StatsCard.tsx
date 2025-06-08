import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  gradient: string;
  iconBg?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  iconBg = "bg-white/20",
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer",
        gradient,
        className,
      )}
    >
      <CardContent className="p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold">{value}</p>
              {trend && (
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    trend.isPositive
                      ? "bg-green-500/20 text-green-100"
                      : "bg-red-500/20 text-red-100",
                  )}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-white/70 text-xs mt-1">{subtitle}</p>
            )}
          </div>
          <div
            className={cn(
              "p-3 rounded-full transition-transform duration-300 hover:scale-110",
              iconBg,
            )}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "blue" | "green" | "orange" | "purple" | "gradient";
  onClick?: () => void;
  className?: string;
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  color,
  onClick,
  className,
}: QuickActionCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 group-hover:bg-blue-200 text-blue-600",
    green: "bg-green-100 group-hover:bg-green-200 text-green-600",
    orange: "bg-orange-100 group-hover:bg-orange-200 text-orange-600",
    purple: "bg-purple-100 group-hover:bg-purple-200 text-purple-600",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600 text-white",
  };

  const isGradient = color === "gradient";

  return (
    <Card
      className={cn(
        "hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group",
        isGradient &&
          "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl overflow-hidden relative",
        className,
      )}
      onClick={onClick}
    >
      {isGradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      <CardContent
        className={cn("p-8 text-center", isGradient && "relative z-10")}
      >
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300",
            isGradient
              ? "bg-white/20 group-hover:scale-110"
              : colorClasses[color],
          )}
        >
          <Icon className={cn("w-8 h-8", isGradient && "text-white")} />
        </div>
        <h4
          className={cn(
            "text-lg font-bold mb-2",
            isGradient ? "text-white" : "text-gray-900",
          )}
        >
          {title}
        </h4>
        <p
          className={cn(
            "text-sm",
            isGradient ? "text-white/80" : "text-gray-600",
          )}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
