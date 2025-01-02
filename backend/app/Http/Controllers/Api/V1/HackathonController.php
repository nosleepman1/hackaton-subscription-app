<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Hackathon\StoreHackathonResquest;
use App\Http\Resources\HackathonResource;
use App\Models\Hackathon;
use Illuminate\Http\Request;

class HackathonController extends Controller
{
    public function index(Request $request) {
        $query = Hackathon::query();

        if ($request->has('start_date')) {
            $query->where('start_date', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->where('end_date', $request->end_date);
        }

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('location', 'LIKE', '%' . $request->search . '%');
            });
        }

        $hackathons = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Hackathons récupérés avec succès',
            'data' => HackathonResource::collection($hackathons)
        ]);
    }



    public function store(StoreHackathonResquest $request) {
       
        $hackathon = Hackathon::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Hackathon créé avec succès',
            'data' => new HackathonResource($hackathon)
        ]);
    }

    public function show(Hackathon $hackathon){
        return response()->json([
            'success' => true,
            'message' => 'Hackathon récupéré avec succès',
            'data' => new HackathonResource($hackathon)
        ]);
    }


    public function update(StoreHackathonResquest $request, Hackathon $hackathon) {
        $hackathon->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Hackathon mis à jour avec succès',
            'data' => new HackathonResource($hackathon)
        ]);
    }   



    public function destroy(Hackathon $hackathon) {
        if (!$hackathon) {
            return response()->json([
                'success' => false,
                'message' => 'Hackathon non trouvé',
            ], 404);
        }

        $hackathon->delete();

        return response()->json([
            'success' => true,
            'message' => 'Hackathon supprimé avec succès',
        ]);
    }

}
