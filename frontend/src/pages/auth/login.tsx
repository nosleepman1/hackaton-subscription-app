
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Login = () => {
    return (

        <Card className="w-full py-10 px-2 max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-bold">Connexion</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center mt-2 text-sm text-muted-foreground">Connectez-vous à votre compte </p>
                <form className="mt-4">
                        <div className="grid gap-4">
                            <div className="grid gap-2 my-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="[EMAIL_ADDRESS]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Se connecter
                        </Button>
                        <div className="text-center mt-4">
                            <p className="text-sm text-muted-foreground">
                                Vous n'avez pas de compte ? <br />
                                <Link to="/register" className="text-primary font-bold hover:underline">
                                    Inscrivez-vous
                                </Link>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
    )
}

export default Login