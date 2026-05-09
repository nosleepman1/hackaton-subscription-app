import { Button } from "@/components/ui/button"
import { useGetProjects } from "@/hooks/project/useGetProject"

const Home = () => {
    const {data, isLoading, isError, error} = useGetProjects()
    
    const projects = data?.data || []

    console.log(projects)

    if(isLoading) {
        return <div>Chargement...</div>
    }

    if(isError) {
        return <div>Erreur: {error.message}</div>
    }

    return (
        <div className="">
            <section className="px-4 py-20 md:py-32 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 mb-6">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-sm font-semibold text-orange-600">ISI Innovations Day</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Bienvenue sur la plateforme d'inscription aux hackathons
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                        Participez aux meilleurs hackathons, trouvez votre équipe et créez des projets innovants.
                    </p>



                    <div className="max-w-4xl mx-auto">
                        {/**projects list for interrests, use projects variable as an Project type array and map for display */}

                        <h1>Les projets</h1>

                        {projects.map((project) => (
                            <div key={project.id}>
                                <h2>{project.name}</h2>
                                <p>{project.description}</p>
                            </div>
                        ))}
                    </div>

                    
                    
                    
                    
                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Je m'inscris à un projet
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-slate-300 hover:bg-slate-50"
                        >
                            Créer une équipe
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home