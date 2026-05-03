<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Team\StoreTeamRequest;
use App\Http\Requests\Team\UpdateTeamRequest;
use App\Models\Member;
use App\Models\Team;
use App\Services\TeamService;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    
    public function __construct(private TeamService $teamService){}

    public function index()
    {
        $response = $this->teamService->getTeams();
        if($response['success']) {
            return response()->json($response, 200);
        }
        return response()->json($response, 500);
    }


    public function store(StoreTeamRequest $request)
    {
        $response = $this->teamService->createTeam($request->validated());
        
        if($response['success']) {
            return response()->json($response, 201);
        }
        
        return response()->json($response, 500);
    }

  
    public function show(Team $team)
    {
        $response = $this->teamService->showTeam($team);
        return response()->json($response); 
    }

    
    public function update(UpdateTeamRequest $request, Team $team)
    {
        $response = $this->teamService->updateTeam($request->validated(), $team);
        return response()->json($response);
    }

    
    public function destroy(Team $team)
    {
        $response = $this->teamService->deleteTeam($team);
        return response()->json($response);
    }
}
