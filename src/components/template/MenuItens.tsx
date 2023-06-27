import Link from "next/link";

interface MenuItensProps {
    texto: string;
    icone: any;
    url?: string;
    className?: string
    // o onClick é quando vai deslogar e não vai ter link
    onClick?: (evento: any) => void;
}

export default function MenuItens(props: MenuItensProps) {

    const renderizarLink = () => {
        return (
            <div className={`flex flex-col justify-center items-center w-20 h-20 dark:text-gray-200 ${props.className}`}>
                {props.icone}
                <span className={`text-xs font-light`}>{props.texto}</span>
            </div>
        )
    }

    return (
        <li onClick={props.onClick} className={`hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}>
            {/* este primeiro é quando é um link mesmo */}
            {props.url ? (
                <Link href={props.url}>
                    {renderizarLink()}
                </Link>
            ) : (
                // ja aqui é quando vai deslogar e não vai ter link
                renderizarLink()
            )}
        </li>
    )
}
