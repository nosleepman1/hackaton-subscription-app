
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"

const Register = () => {
    return (

        <Card className="w-full py-10 px-2 max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-bold">S'inscrire</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center mt-2 text-sm text-muted-foreground">Inscrivez-vous à votre compte </p>
                <form className="mt-4">
                        <div className="grid gap-4">

                            <div className="grid gap-2">
                                <Label htmlFor="matricule">Matricule</Label>
                                <Input id="matricule" type="text" placeholder="Matricule" />
                            </div>

                            <div className="flex gap-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input id="name" type="text" placeholder="Nom" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="prename">Prenom</Label>
                                    <Input id="prename" type="text" placeholder="Prenom" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="[EMAIL_ADDRESS]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" />
                            </div>

                            <div className="flex gap-3 ">
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="level">Niveau</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Niveau" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="L1">Licence 1</SelectItem>
                                            <SelectItem value="L2">Licence 2</SelectItem>
                                            <SelectItem value="L3">Licence 3</SelectItem>
                                            <SelectItem value="M1">Master 1</SelectItem>
                                            <SelectItem value="M2">Master 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2 w-full">
                                    <Label htmlFor="filiere">Filiere</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filiere" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="IAGE">Informatique Appliquée à la Gestion des Entreprises</SelectItem>
                                            <SelectItem value="GL">Génie Logiciel</SelectItem>
                                            <SelectItem value="RI">Réseaux Informatique</SelectItem>
                                            <SelectItem value="CS">Cybersécurité</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            S'inscrire
                        </Button>
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