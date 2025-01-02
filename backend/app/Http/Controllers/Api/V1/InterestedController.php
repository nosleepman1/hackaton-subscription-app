<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Interested;
use App\Http\Requests\Interested\StoreInterestedRequest;
use App\Http\Requests\Interested\UpdateInterestedRequest;
use App\Http\Resources\InterrestResource;
use App\Models\Admin;
use App\Services\InterrestServices;
use Illuminate\Support\Facades\Auth;

class InterestedController extends Controller
{
    public function __construct(private readonly InterrestServices $interrestServices){}
    
    public function index()
    {
        $response = $this->interrestServices->index();
        
        if($response['success']){
            return response()->json($response);
        }
        return response()->json($response, 422);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInterestedRequest $request)
    {
        $response = $this->interrestServices->store($request->validated());

        if($response['success']){
            return response()->json($response);
        }
        return response()->json($response, 422);
    }

    /**
     * Display the specified resource.
     */
    public function show(Interested $interested)
    {
        $response = $this->interrestServices->show($interested);

        if($response['success']){
            return response()->json($response);
        }
        return response()->json($response, 422);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInterestedRequest $request, Interested $interested)
    {
       $response = $this->interrestServices->update($interested, $request->validated());

       if($response['success']){
           return response()->json($response);
       }
       return response()->json($response, 422); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Interested $interested)
    {
        $response = $this->interrestServices->delete($interested);

        if($response['success']){
            return response()->json($response);
        }
        return response()->json($response, 422); 
    }
}
