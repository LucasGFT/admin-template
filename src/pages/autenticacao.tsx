/* eslint-disable @next/next/no-img-element */
import AuthInput from "../components/auth/AuthInput";
import { useState } from "react";
import Image from "next/image";
import { IconeAtencao } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {

    const context = useAuth()

    const [erro, setErro] = useState<string | null>(null);
    const [modo, setModo] = useState<'login' | 'cadastro'>('login');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function exibirErro(msg: string, tempoEmSegundos = 5) {
        setErro(msg);
        setTimeout(() => setErro(null), tempoEmSegundos * 1000);
    }

    async function submeter() {
        try {

            if (modo === 'login') {
                await context.login?.(email, senha)
            } else {
                await context.cadastrar?.(email, senha)
            }
        } catch (e: any) {
            exibirErro(e?.message ?? 'Algo deu errado')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <img src="https://picsum.photos/640/657" alt="Imagem da Tela de Autenticação" className="h-screen w-full object-cover" />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-2/3">
                <h1 className="text-3xl font-bold mb-5">
                    {modo === 'login' ? 'Entre com a sua conta' : 'Cadastre na plataforma'}
                </h1>
                {erro ? (
                    <div className={`
                    flex items-center
                    bg-red-400 text-white py-3 px-5 my-2
                    border border-red-700 rounded-lg
                `}>
                        {IconeAtencao()}
                        <span className="ml-3">{erro}</span>
                    </div>
                ) : false}

                <AuthInput
                    label="E-mail"
                    valor={email}
                    tipo="email"
                    valorMudou={setEmail}
                    obrigatorio
                />
                <AuthInput
                    label="Senha"
                    valor={senha}
                    tipo="password"
                    valorMudou={setSenha}
                    obrigatorio
                />
                <button onClick={submeter} className={`
                w-full bg-indigo-500 hover:bg-indigo-400
                text-white rounded-lg px-4 py-3 mt-6
            `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>
                <hr className="my-6 border-gray-300 w-full" />
                <button onClick={context.loginGoogle} className={`
                w-full bg-red-500 hover:bg-red-400
                text-white rounded-lg px-4 py-3
            `}>
                    Entrar com Google
                </button>

                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}> Criar uma conta gratuitamente</a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Ja faz parte da nossa comunidade?
                        <a onClick={() => setModo('login')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                        `}> Entre com as suas Credenciais</a>
                    </p>
                )}

            </div>
        </div>
    )
}
