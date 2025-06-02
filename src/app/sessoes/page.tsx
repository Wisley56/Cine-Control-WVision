import SessaoList from "@/components/sessoes/SessaoList"; 

export default function SessoesPage(){
    return (
        <div className="p-8 bg-[var(--background)] min-h-screen">
            <div className="max-w-7xl mx-auto">
                <SessaoList/>
            </div>
        </div>
    )
}