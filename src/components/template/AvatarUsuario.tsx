/* eslint-disable @next/next/no-img-element */
import useAuth from "../../data/hook/useAuth"
import Link from "next/link"

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {

    const context = useAuth()

    return (
        <Link href="/perfil">
            <img
                src={context.usuario?.imagemUrl || '/images/avatar.svg'}
                alt="Avatar do Usuario"
                className={`
                    h-10 w-10 rounded-full cursor-pointer
                    ${props.className}
                `}
            />
        </Link>
    )
}
