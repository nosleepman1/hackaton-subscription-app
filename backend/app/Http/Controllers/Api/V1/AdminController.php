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
        $response = $this->adminServices->createTeamUsingInteresteds($request->validated());

        if($response['success']) {
            return response()->json($response, 201);
        }
        
        return response()->json($response, 500);    
    }


}
