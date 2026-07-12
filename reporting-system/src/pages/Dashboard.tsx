
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";

// 1. Criamos dados falsos para simular o Banco de Dados
const mockDenuncias = [
  {
    id: "DEN-001",
    data: "12/07/2026",
    nome: "João Silva",
    localizacao: "Rua das Flores, 123",
    ocorrencia: "Poluição Sonora",
    status: "Pendente",
  },
  {
    id: "DEN-002",
    data: "12/07/2026",
    nome: "Anônimo",
    localizacao: "Av. Principal, Centro",
    ocorrencia: "Atividade Suspeita",
    status: "Em Análise",
  },
  {
    id: "DEN-003",
    data: "11/07/2026",
    nome: "Maria Oliveira",
    localizacao: "Praça da Matriz",
    ocorrencia: "Vandalismo",
    status: "Resolvido",
  }
];

export function Dashboard() {
  const navigate = useNavigate();

  // Função para escolher a cor da etiqueta baseada no status
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
  {/* O componente Link faz a imagem ser clicável e redirecionar para a Home "/" */}
  <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/3/34/Logo_PMESP.png" 
      alt="Brasão PMESP" 
      className="w-12 h-14 object-contain" // Ajustado para W-12 (48px) e H-14 (56px) para respeitar a proporção vertical do brasão
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
            <p className="text-slate-500 mt-1">Gerencie e acompanhe as ocorrências registradas.</p>
          </div>
        </div>

        {/* Tabela de Dados (Tailwind Puro) */}
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
                {mockDenuncias.map((denuncia) => (
                  <tr key={denuncia.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-slate-900">{denuncia.id}</td>
                    <td className="p-4 text-sm text-slate-500">{denuncia.data}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}