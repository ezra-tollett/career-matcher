import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' };

export function Button(props: ButtonProps) {
    const { variant = 'default', className, ...rest } = props;
    const styles = {
        default: `bg-blue-500 text-white`,
        outline: `border border-blue-500 text-blue-500`
    }



    return <button className={`${className} ${styles[variant]}`} {...rest}>{props.children}</button>;
}