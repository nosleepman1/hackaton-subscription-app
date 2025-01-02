<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Member;
use App\Models\Interested;
use Illuminate\Support\Facades\DB;
use App\Services\AdminServices;

class AdminController extends Controller
{

    public function __construct(private AdminServices $adminServices){}

    public function storeTeamFromInteresteds(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:teams,name',
            'project_id' => 'required|integer|exists:projects,id',
            'interested_ids' => 'required|array|min:1',
            'interested_ids.*' => 'required|integer|exists:interesteds,id',
        ]);

        $response = $this->adminServices->createTeamUsingInteresteds($validated);

        if($response['success']) {
            return response()->json($response, 201);
        }
        
        return response()->json($response, 500);    
    }


}
