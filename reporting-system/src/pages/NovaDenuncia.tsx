import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom"; // 1. Importamos o hook de navegação
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

// 1. Definimos as regras (Schema) da denúncia
const denunciaSchema = z.object({
  localizacao: z.string().min(5, "A localização precisa ter pelo menos 5 caracteres."),
  nome: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres."),
  ocorrencia: z.string().min(5, "O título precisa ter pelo menos 5 caracteres."),
  descricao: z.string().min(20, "Por favor, detalhe mais a situação (mínimo de 20 caracteres)."),
});

// Tipagem gerada automaticamente pelo Zod
type DenunciaData = z.infer<typeof denunciaSchema>;

export function NovaDenuncia() {
  // 2. Inicializamos o navegador de rotas
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DenunciaData>({
    resolver: zodResolver(denunciaSchema),
  });

  // 3. Função assíncrona para lidar com o envio e o redirecionamento real
  async function enviarDenuncia(data: DenunciaData) {
    try {
      // Endereço real do seu servidor Node.js que criamos no passo anterior
      const API_URL = "http://localhost:3000/denuncias"; 

      // Enviando os dados captados do formulário para o servidor
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Converte o objeto TypeScript/JavaScript em texto JSON
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar a denúncia no servidor da PMESP.");
      }

      // Se o back-end respondeu com sucesso (Status 201), avançamos para a tela de obrigado
      navigate("/obrigado");

    } catch (error) {
      console.error("Erro na requisição:", error);
      
      // Se o servidor estiver desligado ou a rede falhar, o sistema exibe este alerta amigável
      alert("Não foi possível enviar a sua denúncia. Verifique se o servidor Back-end está rodando.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Fazer uma Denúncia</h1>
        <p className="text-slate-500 mb-6 text-sm">
          Seu relato é seguro. Preencha os dados abaixo com o máximo de detalhes possível.
        </p>

        <form onSubmit={handleSubmit(enviarDenuncia)} className="space-y-4">
          {/* Campo: Nome */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
            <Input 
              placeholder="Escreva seu nome" 
              {...register("nome")} 
              className={errors.nome ? "border-red-500" : ""}
            />
            {errors.nome && <span className="text-red-500 text-xs mt-1">{errors.nome.message}</span>}
          </div>
          {/* Campo: Localização */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Onde ocorreu o crime?</label>
            <Input 
              placeholder="Ex: Rua X, Bairro Y" 
              {...register("localizacao")} 
              className={errors.localizacao ? "border-red-500" : ""}
            />
            {errors.localizacao && <span className="text-red-500 text-xs mt-1">{errors.localizacao.message}</span>}
          </div>
          {/* Campo: Ocorrência */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Qual o ocorrido?</label>
            <Input 
              placeholder="Ex: Poluição sonora na rua X" 
              {...register("ocorrencia")} 
              className={errors.ocorrencia ? "border-red-500" : ""}
            />
            {errors.ocorrencia && <span className="text-red-500 text-xs mt-1">{errors.ocorrencia.message}</span>}
          </div>

          {/* Campo: Descrição */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição detalhada</label>
            <Textarea 
              placeholder="Descreva o que aconteceu, quem estava envolvido, etc..." 
              className={`min-h-[150px] ${errors.descricao ? "border-red-500" : ""}`}
              {...register("descricao")} 
            />
            {errors.descricao && <span className="text-red-500 text-xs mt-1">{errors.descricao.message}</span>}
          </div>

          {/* Adicionamos o 'disabled={isSubmitting}' para evitar que o usuário clique duas vezes enquanto envia */}
          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Denúncia"}
          </Button>
        </form>
      </div>
    </div>
  );
}