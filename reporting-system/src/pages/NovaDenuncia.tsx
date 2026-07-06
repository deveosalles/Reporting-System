import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

// 1. Definimos as regras (Schema) da denúncia
const denunciaSchema = z.object({
  titulo: z.string().min(5, "O título precisa ter pelo menos 5 caracteres."),
  descricao: z.string().min(20, "Por favor, detalhe mais a situação (mínimo de 20 caracteres)."),
});

// Tipagem gerada automaticamente pelo Zod
type DenunciaData = z.infer<typeof denunciaSchema>;

export function NovaDenuncia() {
  // 2. Iniciamos o formulário conectando com o Zod
  const { register, handleSubmit, formState: { errors } } = useForm<DenunciaData>({
    resolver: zodResolver(denunciaSchema),
  });

  // 3. Função que será chamada ao clicar em enviar
  function enviarDenuncia(data: DenunciaData) {
    console.log("Dados prontos para o Back-end:", data);
    alert("Denúncia estruturada com sucesso! (Olhe o console do navegador)");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Fazer uma Denúncia</h1>
        <p className="text-slate-500 mb-6 text-sm">
          Seu relato é seguro. Preencha os dados abaixo com o máximo de detalhes possível.
        </p>

        <form onSubmit={handleSubmit(enviarDenuncia)} className="space-y-4">
          {/* Campo: Título */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Título resumido</label>
            <Input 
              placeholder="Ex: Poluição sonora na rua X" 
              {...register("titulo")} 
              className={errors.titulo ? "border-red-500" : ""}
            />
            {errors.titulo && <span className="text-red-500 text-xs mt-1">{errors.titulo.message}</span>}
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

          <Button type="submit" className="w-full mt-4">
            Enviar Denúncia
          </Button>
        </form>
      </div>
    </div>
  );
}