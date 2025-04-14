<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class serviceController extends Controller
{
    public function index(){
        $itm = Service::orderBy('created_at', 'DESC')->get();
        
        if($itm != null){
            return response()->json([
                'status' => true,
                'data' => $itm
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'No Services Found'
            ]);
        }
    }

    public function limitData(Request $request){
        $itm = Service::where('status', 1)
                ->take($request->get('limit'))  
                ->orderBy('created_at', 'DESC')      
                ->get();

        if($itm != null){
            return response()->json([
                'status' => true,
                'data' => $itm
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'No Services Found'
            ]);
        }
    }
}
