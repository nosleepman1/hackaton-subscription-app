<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Member\StoreMemberRequest;
use App\Http\Requests\Member\UpdateMemberRequest;
use App\Models\Member;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\MemberServices;

class MemberController extends Controller
{
    

    public function __construct(private readonly MemberServices $memberServices){}

    public function index()
    {
        $response = $this->memberServices->getAllMembers();

        if($response['success']){  
            return response()->json($response);
        }
        return response()->json($response, 422);                
    }

    public function showByCaptain(Team $team)
    {
        $response = $this->memberServices->getTeamMembers($team->id); 

        if($response['success']){  
            return response()->json($response);
        }
        return response()->json($response, 422);            
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMemberRequest $request)
    {
        $response = $this->memberServices->addMember($request->validated());   

        if($response['success']){  
            return response()->json($response);
        }
        return response()->json($response, 422);        
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        $response = $this->memberServices->showMember($member); 

        if($response['success']){
            return response()->json($response);
        }
        return response()->json($response, 422);    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMemberRequest $request, Member $member)
    {
        $response = $this->memberServices->updateMember($member, $request->validated());  

        if($response['success']){
            return response()->json($response);
        }
        return response()->json($response, 422);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $response = $this->memberServices->deleteMember($member);  

        if($response['success']){  
            return response()->json($response);
        }
        return response()->json($response, 422);
    }
}
