import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react"; // 1. Importamos os hooks para lidar com APIs
import { Button } from "../components/ui/button";

// 2. Definimos o "molde" (Interface) de como a denúncia vem do banco real
interface Denuncia {
  id: string;
  data: string;
  nome: string;
  localizacao: string;
  ocorrencia: string;
  descricao: string;
  status: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  
  // 3. Criamos dois estados: um para as denúncias reais e outro para o carregamento
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [carregando, setCarregando] = useState(true);

  // 4. O useEffect roda uma função assim que o painel abre na tela
  useEffect(() => {
    async function buscarDenunciasDoBanco() {
      try {
        // Faz a requisição de leitura para o nosso servidor Node.js
        const response = await fetch("http://localhost:3000/denuncias");
        
        if (!response.ok) {
          throw new Error("Erro ao ler dados do servidor.");
        }

        const dadosDoBanco = await response.json();
        
        // Guarda os dados reais recebidos dentro do estado
        setDenuncias(dadosDoBanco);
      } catch (error) {
        console.error("Falha ao conectar com o back-end:", error);
      } finally {
        // Desativa a mensagem de carregando, independentemente de ter dado certo ou errado
        setCarregando(false);
      }
    }

    buscarDenunciasDoBanco();
  }, []); // Os colchetes vazios garantem que isso só rode 1 vez ao abrir a página

  function getStatusColor(status: string) {
    if (status === "Pendente") return "bg-yellow-100 text-yellow-800";
    if (status === "Em Análise") return "bg-blue-100 text-blue-800";
    if (status === "Resolvido") return "bg-green-100 text-green-800";
    return "bg-slate-100 text-slate-800";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Menu Lateral (Sidebar) */}
      <aside className="w-64 bg-slate-900 text-slate-50 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-3 border-b border-slate-800 pb-5">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/34/Logo_PMESP.png" 
              alt="Brasão PMESP" 
              className="w-12 h-14 object-contain" 
            />
          </Link>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-slate-100">PAINEL ADMIN</span>
            <span className="text-xs text-blue-400 font-medium">PMESP</span>
          </div>
        </h2>
        <nav className="space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-md bg-slate-800 font-medium">
            Denúncias
          </button>
          <button className="w-full text-left px-4 py-2 rounded-md hover:bg-slate-800 text-slate-300 transition-colors">
            Estatísticas
          </button>
        </nav>
        <div className="absolute bottom-6 w-52">
          <Button variant="secondary" className="w-full" onClick={() => navigate("/")}>
            Sair / Voltar
          </Button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Painel de Denúncias</h1>
            <p className="text-slate-500 mt-1">Gerencie e acompanhe as ocorrências registradas em tempo real.</p>
          </div>
        </div>

        {/* Tabela de Dados */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Data</th>
                  <th className="p-4 font-medium">Denunciante</th>
                  <th className="p-4 font-medium">Localização</th>
                  <th className="p-4 font-medium">Ocorrência</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* 5. Validação de estados da tabela */}
                {carregando ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-sm text-slate-500">
                      Buscando dados no servidor da PMESP...
                    </td>
                  </tr>
                ) : denuncias.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-sm text-slate-500">
                      Nenhuma denúncia registrada no banco de dados até o momento.
                    </td>
                  </tr>
                ) : (
                  denuncias.map((denuncia) => (
                    <tr key={denuncia.id} className="hover:bg-slate-50 transition-colors">
                      {/* Encurta o UUID gerado pelo banco para não quebrar a tabela */}
                      <td className="p-4 text-sm font-medium text-slate-900 max-w-[100px] truncate" title={denuncia.id}>
                        {denuncia.id}
                      </td>
                      <td className="p-4 text-sm text-slate-500">
                        {/* Formata a data ISO do banco para o padrão brasileiro (DD/MM/AAAA) */}
                        {new Date(denuncia.data).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="p-4 text-sm text-slate-700">{denuncia.nome}</td>
                      <td className="p-4 text-sm text-slate-500">{denuncia.localizacao}</td>
                      <td className="p-4 text-sm text-slate-700">{denuncia.ocorrencia}</td>
                      <td className="p-4 text-sm">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(denuncia.status)}`}>
                          {denuncia.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-right">
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}