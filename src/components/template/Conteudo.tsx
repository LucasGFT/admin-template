interface ConteudoProps {
    children?: any
}

export default function Conteudo(props: ConteudoProps) {
    return (
        // flex-col =  flex-direction coluna
        // mt-7 = margem top 7px
        <div className={`
        flex flex-col mt-7
        dark:text-gray-200
        `}>
            {props.children}
        </div>
    )
}
