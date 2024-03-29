import Head from 'next/head'
import Image from 'next/image'
import loading from '../../../public/images/loading.gif'
import useAuth from '@/data/hook/useAuth'
import router from 'next/router'

export default function ForcarAutenticacao(props: { children: any }) {

    const context = useAuth()

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            if(!document.cookie?.includes("admin-template-auth")) {
                                window.location.href = "/autenticacao"
                            }
                        `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loading} alt="loading" />
            </div>
        )
    }

    if (!context.carregando && context.usuario?.email) {
        return renderizarConteudo()
    } else if (context.carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autenticacao')
        null
    }
}
