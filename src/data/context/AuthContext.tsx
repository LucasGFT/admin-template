import { createContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config'
import Cookies from 'js-cookie'
import Usuario from '@/model/Usuario'
import router from 'next/router'

interface AuthContextProps {
    usuario?: Usuario
    carregando?: boolean
    loginGoogle?: () => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    cadastrar?: (email: string, senha: string) => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User | null): Promise<Usuario | undefined> {
    if (usuarioFirebase?.email) {
        const token = await usuarioFirebase.getIdToken()
        return {
            uid: usuarioFirebase.uid,
            nome: usuarioFirebase.displayName,
            email: usuarioFirebase.email,
            token,
            provedor: usuarioFirebase.providerData[0]?.providerId,
            imagemUrl: usuarioFirebase.photoURL
        }
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-auth', 'sim', {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-auth')
    }
}

export function AuthProvider(props: { children: any }) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>()

    async function configurarSessao(usuarioFirebase: firebase.User | null) {
        if (usuarioFirebase && usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario?.email
        } else {
            setUsuario(undefined)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function login(email: string, senha: string) {
        try {
            setCarregando(true)
            const resposta = await firebase.auth().signInWithEmailAndPassword(email, senha)
            if (resposta.user) {
                await configurarSessao(resposta.user)
                router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email: string, senha: string) {
        try {
            setCarregando(true)
            const resposta = await firebase.auth().createUserWithEmailAndPassword(email, senha)
            await configurarSessao(resposta.user)
            router.push('/')
        } finally {
            setCarregando(false)
        }
    }


    async function loginGoogle() {
        try {
            setCarregando(true)
            const resposta = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            if (resposta.user) {
                await configurarSessao(resposta.user)
                router.push('/')
            }
        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged((usuarioFirebase: any) => configurarSessao(usuarioFirebase))
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle,
            logout,
            carregando,
            login,
            cadastrar
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext