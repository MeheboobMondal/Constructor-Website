<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function showAllData(){
        $itm = Testimonial::where('status', 1)->orderBy('created_at', 'DESC')->get();
        if($itm != null){
            return response()->json([
                'status' => true,
                'message' => 'all data fetched successfully!',
                'data' => $itm
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'No data found!'
            ]);
        }
    }

}
