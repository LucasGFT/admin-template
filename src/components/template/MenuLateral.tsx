import { IconeAjustes, IconeCasa, IconeSair, IconeSino } from "../icons";
import Logo from "./Logo";
import MenuItens from "./MenuItens";

export default function MenuLateral() {
    return (
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900
        `}>
            <div className={`
            bg-gradient-to-r from-indigo-500 to-purple-800
            h-20 w-20
            flex flex-col items-center justify-center
             `}>
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItens url="/" texto="Início" icone={IconeCasa} />
                <MenuItens url="/ajustes" texto="Ajustes" icone={IconeAjustes} />
                <MenuItens url="/notificacoes" texto="Notificações" icone={IconeSino} />
            </ul>
            <ul>
                <MenuItens
                    className={`
                    text-red-600
                    hover:bg-red-400 hover:text-white
                    dark:text-red-400 dark:hover:text-white
                    `}
                    onClick={() => console.log('Sair')}
                    texto="Sair"
                    icone={IconeSair} />
            </ul>
        </aside>
    )
} 