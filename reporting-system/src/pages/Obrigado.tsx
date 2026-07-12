import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export function Obrigado() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        {/* Ícone de Sucesso Visual */}
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-3">
          Denúncia Recebida com Sucesso!
        </h1>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          Seu relato foi criptografado e enviado de forma totalmente segura para o nosso sistema. Obrigado por colaborar com a segurança pública.
        </p>

        {/* Botão para retornar ao formulário inicial se necessário */}
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate("/")}
        >
          Fazer Nova Denúncia
        </Button>
      </div>
    </div>
  );
}