"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Stack, Typography } from "@mui/material";
import { Counter } from "../counter";

interface ProgressCircleProps {
  percents: number;
  counter?: boolean;
  stroke?: string;
  emptyStroke?: string;
  emptyStrokeOpacity?: number;
  duration?: number;
  delay?: number;
  size?: number;
  strokeWidth?: number;
  caption?: string;
  fontSize?: number;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percents,
  counter = true,
  stroke = "white",
  emptyStroke = stroke,
  emptyStrokeOpacity = 0.25,
  duration = 3,
  delay = 0.5,
  size = 100,
  strokeWidth = 6,
  caption,
  fontSize = 50,
}) => {
  const radius = 45;
  const circumference = Math.ceil(2 * Math.PI * radius);
  const fillPercents = Math.abs(
    Math.ceil((circumference / 100) * (percents - 100))
  );

  const transition = {
    duration: duration,
    delay: delay,
    ease: "easeIn",
  };

  const variants = {
    hidden: {
      strokeDashoffset: circumference,
      transition,
    },
    show: {
      strokeDashoffset: fillPercents,
      transition,
    },
  };

  return (
    <>
      <Stack justifyContent="center" alignItems="center" position="relative">
        {counter && (
          <Typography position="absolute" fontSize={fontSize} fontWeight={500}>
            <Counter valueTo={percents} totalDuration={duration + delay} />%
          </Typography>
        )}
        <Box height={size} position="relative">
          <svg
            viewBox="0 0 100 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth={strokeWidth}
              stroke={emptyStroke}
              strokeOpacity={emptyStrokeOpacity}
              fill="transparent"
            />
          </svg>
          <svg
            viewBox="0 0 100 100"
            width={size}
            height={size}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transform: "rotate(-90deg)",
              overflow: "visible",
            }}
          >
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth={strokeWidth}
              stroke={stroke}
              fill="transparent"
              strokeDashoffset={fillPercents}
              strokeDasharray={circumference}
              variants={variants}
              initial="hidden"
              animate="show"
            />
          </svg>
        </Box>
      </Stack>
      {caption && (
        <Box width={size} fontSize={3} color="text.primary" textAlign="center">
          <Typography variant="caption">{caption}</Typography>
        </Box>
      )}
    </>
  );
};
