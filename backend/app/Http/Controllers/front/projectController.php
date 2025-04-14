<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class projectController extends Controller
{
    public function getAllData(){
        $data = Project::orderBy('created_at', 'DESC')->where('status', 1)->get();

        if($data != null){
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => "Services Not Found!"
            ]);
        }
    }

    public function limitData(Request $request){
        $data = Project::orderBy('created_at', 'DESC')->where('status', 1)->limit($request->limit)->get();

        if($data != null){
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Project Not Found'
            ]);
        }
    }
}
