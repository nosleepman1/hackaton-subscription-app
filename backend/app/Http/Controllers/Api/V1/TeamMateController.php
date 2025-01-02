<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\TeamMate;
use App\Models\Member;
use App\Models\Team;
use App\Http\Requests\TeamMate\StoreTeamMateRequest;
use App\Http\Requests\TeamMate\UpdateTeamMateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\TeamMateServices;

class TeamMateController extends Controller
{

    public function __construct(protected TeamMateServices $teamMateServices)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $response = $this->teamMateServices->getTeamMates();
        
        if($response['success']) {
            return response()->json($response, 200);
        }
        return response()->json($response, 500); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamMateRequest $request)
    {
        $response = $this->teamMateServices->createTeamMate($request->validated());
        
        if($response['success']) {
            return response()->json($response, 200);
        }
        return response()->json($response, 500); 
    }

    /**
     * Display the specified resource.
     */
    public function show(TeamMate $teamMate)
    {
        $response = $this->teamMateServices->getTeamMateById($teamMate->id);
        
        if($response['success']) {
            return response()->json($response, 200);
        }
        return response()->json($response, 500); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeamMateRequest $request, TeamMate $teamMate)
    {
        $response = $this->teamMateServices->updateTeamMate($request->validated(), $teamMate);
        
        if($response['success']) {
            return response()->json($response, 200);
        }
        return response()->json($response, 500);    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeamMate $teamMate)    
    {       
        $response = $this->teamMateServices->deleteTeamMate($teamMate->id);
        
        if($response['success']) {
            return response()->json($response, 200);
        }
        return response()->json($response, 500); 
    }
}
