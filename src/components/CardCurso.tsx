import Image from "next/image";

interface CardCursoProps {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    imagem: string;
}

export default function CardCurso({
    id,
    nome,
    descricao,
    preco,
    categoria,
    imagem
}: CardCursoProps){
    return (
        <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm 
        transition-all duration-300 hover:border-blue-500 hover:shadow-md">
            <div>
                {/* IMAGEM DO CURSO */}
                <div className="relative mb-4 h-44 w-full overflow-hidden rounded-lg bg-slate-100">
                    {/* PASSO CARD 5: Substituir a tag <img> pelo componente <Image /> otimizado do Next.js */}
                    {/* Utilizar as propriedades: src, alt, fill e className */}
                    <Image
                        src={imagem}
                        alt={nome}
                        fill
                        className="h-full w-full object-cover"
                    />
                </div>
                {/* DETALHES DO CURSO */}
                {/* PASSO CARD 6: Exibir a prop 'category' */}
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {categoria}
                </span>
                {/* PASSO CARD 7: Exibir a prop 'title' */}
                <h2 className="mt-1 text-xl font-bold text-slate-800 line-clamp-1">
                    {nome}
                </h2>
                {/* PASSO CARD 8: Exibir a prop 'description' */}
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {descricao}.
                </p>
            </div>
            {/* RODAPÉ DO CARD */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                {/* PASSO CARD 9: Exibir o preço retornado pela prop 'price' */}
                <span className="text-sm font-bold text-slate-900">R$ {preco.toFixed(2).replace(".", ",")}</span>
                {/* PASSO CARD 10: Criar o link dinâmico para navegar até a rota de detalhes '/curso/[id]' */}
                <a
                    href={`/curso/${id}`}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-whitetransition-colors hover:bg-blue-700"
                >
                    Ver Detalhes →
                </a>
            </div>
        </div>
    );
}
