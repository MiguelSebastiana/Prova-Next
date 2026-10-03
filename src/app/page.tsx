"use client";

// PASSO HOME 1: Importar 'useState' e 'useEffect' do React
import { useState, useEffect, useMemo} from "react";
// PASSO HOME 2: Importar o componente 'CardCurso' de '@/components/CardCurso'
import CardCurso from "../components/CardCurso";
import { text } from "stream/consumers";

// PASSO HOME 3: Criar a interface 'CursoAPI' mapeando a estrutura de dados da API:
// id, nome, titulo, title, descricao, description, preco, price, categoria, category, imagem, imagemUrl, imageUrl
interface CursoAPI{
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
}

export default function Home() {
  // PASSO HOME 4: Criar o estado 'cursos' para armazenar os itens vindos da API (iniciar com[])
  const [cursos, setCursos] = useState<CursoAPI[]>([]);
  // PASSO HOME 5: Criar o estado 'busca' para o termo digitado no campo de pesquisa (iniciar com "")
  const [busca, setBusca] = useState("");
  // PASSO HOME 6: Criar o estado 'carregando' (boolean) para indicar o carregamento dos dados(iniciar com true)
  const [carregando, setCarregando] = useState(true);
  // PASSO HOME 7: Criar o estado 'erro' para capturar eventuais falhas da requisição (iniciar com null)
  const [erro, setErro] = useState("");

  const [categoria, setCategoria] = useState("Cursos");

// PASSO HOME 8: Usar o 'useEffect' para consumir a API REST ao carregar a página
// Endpoint: https://dynamic-events-api.onrender.com/api/eventos
// LÓGICA DO FETCH:
// 1. Executar a requisição fetch
// 2. Converter a resposta para JSON
// 3. Filtrar o array para manter APENAS os itens cuja categoria seja "Cursos" ou "Curso"
// 4. Salvar o resultado filtrado no estado 'cursos'
// 5. Atualizar o estado 'carregando' para false
// PASSO HOME 9: Criar a lógica de filtro do campo de busca
// Filtrar a lista 'cursos' para verificar se o título ou a descrição contêm o texto digitado na variável 'busca'

  useEffect(() => {
    fetch("https://dynamic-events-api.onrender.com/api/eventos")
    .then((res) => {
      if(!res.ok) {
        throw new Error("Não foi possivel carregar os cursos")
      }

      return res.json();
    })
    .then((data: CursoAPI[]) => {
      setCursos(data.slice(0, 12));
      setErro("");
    })
    .catch(() => {
      setErro("Erro ao carregar os cursos. Tente novamente")
    })
    .finally(() => {
      setCarregando(false);
    })
  }, []);

  const limparBusca = () => {
    setBusca("");
  }

  const categorias = useMemo(() => {
    return Array.from(new Set(cursos.map((curso) => curso.categoria)));
  }, [cursos]);

  const cursosFiltrados = useMemo(() => {
    const texto = busca.toLowerCase().trim();

    return cursos.filter((curso) => {
      const correspondeBusca = 
            curso.descricao.toLowerCase().includes(texto) ||
            curso.nome.toLocaleLowerCase().includes(texto);

      const correspondeCategoria =
        curso.categoria === categoria;
    
      return correspondeBusca && correspondeCategoria;
    })
  }, [cursos, busca, categoria]);

  return (
    <main className="p-8">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600">Catálogo de Cursos</h1>
            <p className="mt-1 text-sm text-slate-500">
              Treinamentos e capacitações técnicas exclusivas
            </p>
          </div>
          {/* CAMPO DE BUSCA */}
          <div className="relative w-full sm:w-72">
            <input
              id="busca"
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar curso..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 
              outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            
            {/* PASSO HOME 11: Renderizar o botão de limpar campo apenas quando houver algo digitado na busca */}
            <button   
            onClick={limparBusca}
            disabled={busca === ""}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600">
              ✕
            </button>
          </div>
        </section>
        {/* MENSAGEM DE ERRO */}
        {/* PASSO HOME 12: Exibir mensagem de erro caso o estado 'erro' não seja nulo */}
        {erro && (
          <p className="text-center text-red-400 py-10">{erro}</p>
        )}
        {/* MENSAGEM DE CARREGAMENTO */}
        {/* PASSO HOME 13: Exibir a mensagem "Carregando catálogo..." caso o estado 'carregando' seja true */}
        {carregando && (
          <p className="text-center text-slate-400 py-10">Carregando catálogo...</p>
        )}
        {/* GRID DE CURSOS */}
        {/* PASSO HOME 14: Caso 'carregando' seja false e existam itens, utilizar o método .map() na lista filtrada */}
        {/* PASSO HOME 15: Retornar o componente <CardCurso /> passando as props (id, title, description, category, price, image) */}
        {!carregando && !erro}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Exemplo de onde o map() irá renderizar os cards */}
          {cursosFiltrados.map((curso) => (
            <CardCurso
            key={curso.id}
            id={curso.id}
            nome={curso.nome}
            descricao={curso.descricao}
            preco={curso.preco}
            categoria={curso.categoria}
            imagem={curso.imagem}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
