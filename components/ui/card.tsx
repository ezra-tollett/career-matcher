
export function Card(props: React.PropsWithChildren<{ className?: string }>) {
    return <div className={`bg-white rounded shadow-md ${props.className}`}>{props.children}</div>;
}

export function CardContent(props: React.PropsWithChildren<{ className?: string }>) {
    return <div className={`p-4 ${props.className}`}>{props.children}</div>;
}

export function CardHeader(props: React.PropsWithChildren<{ className?: string }>) {
    return <div className={`p-4 border-b ${props.className}`}>{props.children}</div>;
}

export function CardTitle(props: React.PropsWithChildren<{ className?: string }>) {
    return <h2 className={`text-xl font-semibold ${props.className}`}>{props.children}</h2>;
}