import React from 'react';

interface ProgressProps {
    className?: string;
    [key: string]: any;
}

export function Progress(props: ProgressProps) {
    const { className, ...rest } = props;
    return <progress className={`${className} w-full`} {...rest} />;
}