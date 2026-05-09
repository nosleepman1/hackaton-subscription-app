
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { useState } from "react"
import useRegister from "@/hooks/auth/useRegister"
import type { RegisterRequest } from "@/types/auth"
import { Spinner } from "@/components/ui/spinner"
import { useGrade } from "@/hooks/grade/useGrade"
import { useFiliere } from "@/hooks/filiere/useFiliere"
import type { Grade } from "@/types/grade"
import type { Filiere } from "@/types/filiere"


const Register = () => {

    const [matricule, setMatricule] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [firstname, setFirstname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [grade, setGrade] = useState<string>("")
    const [filiere, setFiliere] = useState<string>("")
    const [phone, setPhone] = useState<string>("")

    const {loading, register, error} = useRegister()

    const {data:grades, isLoading:isGradeLoading, isError:isGradeError, error:gradeError} = useGrade()
    const {data:filieres, isLoading:isFiliereLoading, isError:isFiliereError, error:filiereError} = useFiliere()


    console.log(grades);
    console.log(filieres);  
    


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user : RegisterRequest = {
            matricule,
            lastname,
            firstname,
            email,
            password,
            grade,
            filiere,
            phone
        }
        register(user)    
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p className="text-red-500">Une erreur est survenue</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                        Recharger la page
                    </Button>
                </div>
            </div>
        )
    }



    return (

        <Card className="w-full py-10 px-2 max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-bold">S'inscrire</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center mt-2 text-sm text-muted-foreground">Inscrivez-vous à votre compte </p>
                <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="grid gap-4">

                            <div className="grid gap-2">
                                <Label htmlFor="matricule">Matricule</Label>
                                <Input 
                                    id="matricule" 
                                    type="text" 
                                    placeholder="Matricule" 
                                    value={matricule}
                                    onChange={(e) => setMatricule(e.target.value)}/>
                            </div>

                            <div className="flex gap-3">
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input 
                                        id="name" 
                                        type="text" 
                                        placeholder="Nom" 
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="prename">Prenom</Label>
                                    <Input 
                                        id="prename" 
                                        type="text" 
                                        placeholder="Prenom"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email"  
                                    type="email" 
                                    placeholder="[EMAIL_ADDRESS]" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>

                            <div className="grid gap-2">
                                {/*phone number*/}
                                <Label htmlFor="phone">Téléphone</Label>
                                <Input 
                                    id="phone" 
                                    type="text" 
                                    placeholder="Téléphone" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)} 
                                />
                            </div>
                                
                        </div>


                        {/**configure error boundaries in thes selects fields */}
                        <ErrorBoundary> 
                        <div className="flex gap-3 ">
                            <div className="grid gap-2 w-full">
                                    <Label htmlFor="level">Niveau</Label>
                                    <Select 
                                        value={grade}
                                        onValueChange={(value) => setGrade(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Niveau" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="selectionner" disabled>Selectionner un niveau</SelectItem>
                                            {isGradeLoading ? (
                                                <SelectItem value="erreur" disabled>Chargement...</SelectItem>
                                            ) : gradeError ? (
                                                <SelectItem value="chargement" disabled>Erreur de chargement</SelectItem>
                                            ) : (
                                                grades?.data?.map((grade: Grade) => (
                                                    <SelectItem key={grade.value} value={grade.value}>
                                                        {grade.label}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="filiere">Filiere</Label>
                                    <Select 
                                        value={filiere}
                                        onValueChange={(value) => setFiliere(value)}    
                                        >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filiere" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="" disabled>Selectionner une filiere</SelectItem>
                                            {isFiliereLoading ? (
                                                <SelectItem value="" disabled>Chargement...</SelectItem>
                                            ) : filiereError ? (
                                                <SelectItem value="" disabled>Erreur de chargement</SelectItem>
                                            ) : (
                                                filieres?.data?.map((filiere: Filiere) => (
                                                    <SelectItem key={filiere.value} value={filiere.value}>
                                                        {filiere.label}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                        </div>
                        </ErrorBoundary>

                        <Button type="submit" className="w-full mt-4">
                            {loading ? "Inscription en cours" + <Spinner/> : "S'inscrire"}
                        </Button>

                        {error && <p>Erreur lors de l'inscription</p>}
                        
                        <div className="text-center mt-4">
                            <p className="text-sm text-muted-foreground">
                                Vous avez déjà un compte ?   <br />
                                <Link to="/login" className="text-primary font-bold hover:underline">
                                    Connectez-vous
                                </Link>
                            </p>
                        </div>
                        
                    </form>
                </CardContent>
            </Card>
    )
}

export default Register