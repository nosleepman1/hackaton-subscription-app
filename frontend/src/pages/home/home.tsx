import { Button } from "@/components/ui/button"

/**
 * Partie accueil pour hackton, 
 * 1. Bienvenue etc ...
 * 2. Liste de quelques projets et leurs themes avec un boutton voir plus mais en meme temps le hackathon en vedette sur le bienvenue "ISI INOVATIONS DAY" avec dutexte
 * 3. CTA avec je m interresse a un projet avec le boutton et l autre qu est creer une equipe
 */

const Home = () => {
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