export default interface Usuario {
    uid: string;
    nome: string | null;
    email: string;
    token: string;
    provedor: string | undefined;
    imagemUrl: string | null
}