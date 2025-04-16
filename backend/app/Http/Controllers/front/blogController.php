<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class blogController extends Controller
{
    // generate latest data
    public function latest(Request $request){
        $itm = Blog::where('status', 1)->orderBy('created_at', 'DESC')->limit($request->limit)->get();

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Articles Not Found'
            ]);
        }else{
            return response()->json([
                'status' => true,
                'data' => $itm,
                'message' => 'data showing successfully'
            ]);
        }
    }

    // generate all data

    public function allData(){
        $itm = Blog::where('status', 1)->get();

        if($itm == null){
            return response()->json([
                'status' => false,
                'message' => 'Articles Not Found'
            ]);
        }else{
            return response()->json([
                'status' => true,
                'data' => $itm,
                'message' => 'data showing successfully'
            ]);
        }
        
    }
}
