'use client'
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function Welcome() {
    return (
        <Card>
            <CardContent >
                <Typography variant="body2">
                   This app is meant to be my implementation of the science and methods for effective strength training 
                   and weight loss as discussed in the book, Science of Strength Training: Understand the 
                   anatomy and physiology to transform your body by Austin Current.
                </Typography> 
            </CardContent>
        </Card>
    )
}