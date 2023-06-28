interface AuthInputProps {
    label: string;
    valor: any;
    obrigatorio?: boolean;
    naoRenderizarQuando?: boolean;
    tipo?: 'text' | 'email' | 'password'
    valorMudou: (novoValor: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
    return props.naoRenderizarQuando ? null : (
        <div className="flex flex-col mt-4">
            <label>{props.label}</label>
            <input
                value={props.valor}
                type={props.tipo ?? 'text'}
                required={props.obrigatorio}
                // esse ponto de interrogação é porque se a funcao for realmente definida, ai sim vai ser chamada
                onChange={e => props.valorMudou?.(e.target.value)}
                className={`
                    px-4 py-3 rounded-lg bg-gray-200 mt-2
                    border focus:border-blue-500 focus:bg-white
                    focus:outline-none
                `}
            />
        </div>
    )
}
