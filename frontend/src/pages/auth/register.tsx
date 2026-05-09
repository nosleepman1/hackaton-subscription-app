import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom"
import { useState } from "react"

import useRegister from "@/hooks/auth/useRegister"
import { useGrade } from "@/hooks/grade/useGrade"
import { useFiliere } from "@/hooks/filiere/useFiliere"

import type { RegisterRequest, SelectOption, ApiSelectProps } from "@/types/auth"
import type { Grade } from "@/types/grade"
import type { Filiere } from "@/types/filiere"
import { Spinner } from "@/components/ui/spinner"


const ApiSelect = ({
  label,
  id,
  value,
  onValueChange,
  placeholder,
  isLoading,
  isError,
  items,
  refetch,
}: ApiSelectProps) => {
  return (
    <div className="grid gap-2 w-full">
      <Label htmlFor={id}>{label}</Label>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center gap-2 h-10 px-3 rounded-md border text-sm text-muted-foreground">
          <Spinner className="w-4 h-4" />
          Chargement...
        </div>
      )}

      {/* Error */}
      {!isLoading && isError && (
        <div className="flex items-center justify-between h-10 px-3 rounded-md border border-destructive bg-destructive/5 text-sm text-destructive">
          <span>Erreur de chargement</span>

          {refetch && (
            <button
              type="button"
              onClick={() => refetch()}
              className="underline text-xs"
            >
              Réessayer
            </button>
          )}
        </div>
      )}

      {/* Select */}
      {!isLoading && !isError && (
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger id={id} className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {items.length > 0 ? (
              items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground">
                Aucun élément disponible
              </div>
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}


const Register = () => {
  // Form states
  const [matricule, setMatricule] = useState("")
  const [lastname, setLastname] = useState("")
  const [firstname, setFirstname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [grade, setGrade] = useState("")
  const [filiere, setFiliere] = useState("")
  const [phone, setPhone] = useState("")
  // Register hook
  const { loading, register, error, success } = useRegister()

  // Grades
  const {
    data: gradesData,
    isLoading: isGradeLoading,
    isError: isGradeError,
    refetch: refetchGrades,
  } = useGrade()

  // Filieres
  const {
    data: filieresData,
    isLoading: isFiliereLoading,
    isError: isFiliereError,
    refetch: refetchFilieres,
  } = useFiliere()

  // Mapping sécurisé
  const gradeOptions: SelectOption[] = gradesData?.map((g: Grade) => ({
      value: String(g.value),
      label: g.label,
    })) ?? []

  const filiereOptions: SelectOption[] = filieresData?.map((f: Filiere) => ({
      value: String(f.value),
      label: f.label,
    })) ?? []

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const user: RegisterRequest = {
      matricule,
      lastname,
      firstname,
      email,
      password,
      grade,
      filiere,
      phone,
    }

    register(user)
  }

  return (
    <Card className="w-full max-w-md mx-auto py-8 px-2">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          S'inscrire
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          Inscrivez-vous à votre compte
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          {/* Matricule */}
          <div className="grid gap-2">
            <Label htmlFor="matricule">Matricule</Label>

            <Input
              id="matricule"
              type="text"
              placeholder="Matricule"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              required
            />
            {error?.errors?.matricule?.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">{err}</p>
            ))}
          </div>

          {/* Nom + Prénom */}
          <div className="flex gap-3">
            <div className="grid gap-2 w-full">
              <Label htmlFor="lastname">Nom</Label>

              <Input
                id="lastname"
                type="text"
                placeholder="Nom"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
              {error?.errors?.lastname?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm">{err}</p>
              ))}
            </div>

            <div className="grid gap-2 w-full">
              <Label htmlFor="firstname">Prénom</Label>

              <Input
                id="firstname"
                type="text"
                placeholder="Prénom"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              {error?.errors?.firstname?.map((err, i) => (
                <p key={i} className="text-red-500 text-sm">{err}</p>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="exemple@isi.sn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error?.errors?.email?.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">{err}</p>
            ))}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error?.errors?.password?.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">{err}</p>
            ))}
          </div>

          {/* Phone */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Téléphone</Label>

            <Input
              id="phone"
              type="tel"
              placeholder="+221 77 000 00 00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {error?.errors?.phone?.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">{err}</p>
            ))}
          </div>

          {/* Selects */}
          <div className="flex gap-3">
            <ApiSelect
              id="grade"
              label="Niveau"
              value={grade}
              onValueChange={setGrade}
              placeholder="Sélectionner un niveau"
              isLoading={isGradeLoading}
              isError={isGradeError}
              items={gradeOptions}
              refetch={refetchGrades}
            />
            {error?.errors?.grade?.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">{err}</p>
            ))}

            <ApiSelect
              id="filiere"
              label="Filière"
              value={filiere}
              onValueChange={setFiliere}
              placeholder="Sélectionner une filière"
              isLoading={isFiliereLoading}
              isError={isFiliereError}
              items={filiereOptions}
              refetch={refetchFilieres}
            />
            {error?.errors?.filiere?.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">{err}</p>
            ))}
          </div>


          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="w-4 h-4" />
                Inscription en cours...
              </span>
            ) : (
              "S'inscrire"
            )}
          </Button>

          {/* Login */}
          <p className="text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Connectez-vous
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default Register