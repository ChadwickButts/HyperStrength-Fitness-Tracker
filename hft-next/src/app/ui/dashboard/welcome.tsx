'use client'
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function Welcome() {
    return (
        <Card>
            <CardContent >
                <Typography variant="body2">
                    This site is a companion for the book, Science of Strength Training:
                    Understand the Anatomy and Physiology to Change Your Life
                </Typography> 
            </CardContent>
        </Card>
    )
}