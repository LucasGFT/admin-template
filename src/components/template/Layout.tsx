import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import MenuLateral from "./MenuLateral"

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

// este arquivo vai ser usado para estruturar cada uma das paginas da aplicacao
export default function Layout(props: LayoutProps) {
    return (
        // se colocar a classe dark no div, vai aplicar tudo que tiver a baixo no modo escuro
        <div className={`dark flex h-screen w-screen`}>
            <MenuLateral />
            {/* w-full significa que vai ocupar toda a largura da tela
                p-7 significa que vai ocupar 7px de padding*/}
            <div className={`flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800`}>
                <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
                <Conteudo>
                    {props.children}
                </Conteudo>
            </div>
        </div>
    )
}
